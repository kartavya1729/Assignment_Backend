const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

app.get('/posts', (req, res) => 
{
    res.render('posts', { posts });
});


app.post('/posts', (req, res) => 
{
    const { title, body } = req.body;
    const id = posts.length + 1; // Generate a simple ID
    posts.push({ id, title, body });
    res.redirect('/posts');
});


app.get('/posts/:id', (req, res) => 
{
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (post) 
    {
        res.render('post', { post });
    } 

    else 
    {
        res.status(404).send('Post not found');
    }
});

app.listen(1000, () => {
    console.log('Server is running on http://localhost:1000');
});
