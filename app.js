const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const users = {};

app.get('/create-profile', (req, res) => 
{
  res.render('createProfile');
});


app.post('/create-profile', (req, res) => 
{
  const { username, age, hobby } = req.body;

  if (username && age && hobby) 
    {
    users[username] = { age, hobby };
    res.redirect(`/profile/${username}`);
  } 
  
  else 
  {
    res.status(400).send('Please provide complete information.');
  }
});

app.get('/profile/:username', (req, res) => 
{
  const username = req.params.username;

  const user = users[username];

  if (user) 
    {
    res.render('profile', { username: username, age: user.age, hobby: user.hobby });
  } 

  else 
  {
    res.status(404).send('User not found');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
