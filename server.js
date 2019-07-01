const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

// Adding middleware
app.use(cors());
app.use(bodyParser.json());

//Connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true})    //Is the URI the same all the time?
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("MongoDB connection established successfully");                 //Makes sure the DB is connected
})

app.listen(PORT, ()=> {
    console.log(`Running on Port: ${PORT}`);                                    //Makes sure the port is running
});

app.use('/todos', todoRoutes);

// CRUD
todoRoutes.route('/').get( (req, res)=>{                                        //Retrieves all the todos, extends /todos
    Todo.find( (err, todos)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(todos)
        }
    });
});

todoRoutes.route('/:id').get( (req, res)=>{
    let id = req.params.id;
    Todo.findById(id, (err, todo)=> {
        res.json(todo);
    });
});

todoRoutes.route('/add').post( (req, res)=>{
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'Todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post( (req, res)=>{
    Todo.findById(req.params.id, (err, todo)=> {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_desc = req.body.todo_desc;
            todo.todo_resp = req.body.todo_resp;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_complete = req.body.todo_complete;

            todo.save().then(todo =>{
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send('Update not possible');
        });
    });
});