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

app.get('/allTitles', async (req, res) => {
  try {
    const allTitles = await Task.find({});
    res.send(allTitles);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/updateTitle', async (req, res) => {
  try {
    const { _id, title } = req.body;
    const updateTitle = await Task.findByIdAndUpdate({ _id }, { title });
    updateTitle.save();
    res.send('Updated successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/deleteTitle', async (req, res) => {
  try {
    const { _id } = req.body;
    const deleteTitle = await Task.findByIdAndDelete({ _id });
    deleteTitle.save();
    res.send('Deleted successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = app;
