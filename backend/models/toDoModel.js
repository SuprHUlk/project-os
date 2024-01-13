const mongoose = require('mongoose');

const toDoSchema = mongoose.Schema({
    userId: { type: String, require: true },
    task: { type: String, require: true },
});

module.exports = mongoose.model("toDo", toDoSchema);