const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
  title: { type: String, require: true },
});

const Task = mongoose.model('Task', tasksSchema);

module.exports = Task;
