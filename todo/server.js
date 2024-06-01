// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todo = require('./models/todoModel');
const Education = require('./models/educationModel');
const Office = require('./models/officeModel');
const Household = require('./models/householdModel');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

const categoryModels = {
  education: Education,
  office: Office,
  household: Household,
};

app.post('/todos', async (req, res) => {
  const { title, description, category } = req.body;
  const todo = new Todo({
    title,
    description,
    category,
  });

  try {
    const newTodo = await todo.save();
    const CategoryModel = categoryModels[category];
    const categoryData = new CategoryModel({
      title,
      description,
    });

    await categoryData.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/todos/:id', getTodo, (req, res) => {
  res.json(res.todo);
});

app.patch('/todos/:id', getTodo, async (req, res) => {
  if (req.body.title != null) {
    res.todo.title = req.body.title;
  }
  if (req.body.description != null) {
    res.todo.description = req.body.description;
  }
  if (req.body.category != null) {
    res.todo.category = req.body.category;
  }

  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/todos/:id', getTodo, async (req, res) => {
  try {
    await res.todo.remove();
    res.json({ message: 'Deleted Todo' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTodo (req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: 'Cannot find todo' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.todo = todo;
  next();
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
