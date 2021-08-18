const mongoose = require('mongoose');
var Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String},
    profilePicture: {type: String},
})

const User = mongoose.model('users', userSchema)

module.exports = User;