const express = require('express');
const cors = require('cors');
const Task = require('./models/task');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/add', async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.send('Title added successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
module.exports = app;
