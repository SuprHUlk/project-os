const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    userId: { type: String, require: true },
    link: { type: String, require: true },
    mimeType: { type: String, require: true },
    name: { type: String, require: true },
});

module.exports = mongoose.model("files", fileSchema);