const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: { type: String},
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);