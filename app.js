const express = require('express');

const bodyParser = require('body-parser');

const session = require('express-session');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

const users = [];

app.get('/', (req, res) => 
    {
    if (req.session.userName) 
    {
        res.redirect('/welcome');
    } 

    else 
    {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.render('login', { errorMessage: '' });
});


app.get('/signup', (req, res) => {
    res.render('signup', { errorMessage: '' });
});


app.get('/welcome', (req, res) => 
{
    if (!req.session.userName) 
    {
        return res.redirect('/login');
    }

    const userName = req.session.userName;

    const currentHour = new Date().getHours();
    
    let greeting;

    if (currentHour < 12) 
    {
        greeting = 'Good morning';
    } 

    else if (currentHour < 18) 
    {
        greeting = 'Good afternoon';
    } 

    else 
    {
        greeting = 'Good evening';
    }

    res.render('welcome', { userName: userName, greeting: greeting });
});


app.post('/signup', (req, res) => 
{
    const { userName, password } = req.body;

    const userExists = users.find(user => user.userName === userName);

    if (userExists) 
    {
        return res.render('signup', { errorMessage: 'User already exists' });
    }

    users.push({ userName, password });

    req.session.userName = userName;

    res.redirect('/welcome');
});


app.post('/login', (req, res) => 
{
    const { userName, password } = req.body;

    const user = users.find(user => user.userName === userName && user.password === password);

    if (!user) 
    {
        return res.render('login', { errorMessage: 'Invalid username or password' });
    }

    req.session.userName = userName;

    res.redirect('/welcome');
});


app.get('/logout', (req, res) => 
{
    req.session.destroy();

    res.redirect('/login');
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
