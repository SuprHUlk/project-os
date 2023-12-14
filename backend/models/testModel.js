const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    title: { type: String, required: true }
});

module.exports = mongoose.model('test', testSchema);