const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];


app.get('/todo', (req, res) => {
   res.render('todo', { taskList: tasks });
});


app.post('/addTask', (req, res) => {
   const newTask = req.body.newTask;
   if (newTask) {
      tasks.push(newTask);
   }
   res.redirect('/todo');
});


app.post('/deleteTask', (req, res) => {
   const taskToDelete = req.body.taskToDelete;

   tasks = tasks.filter(task => task !== taskToDelete);
   res.redirect('/todo');
});


app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
