const mongoose = require('mongoose');
var Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    email: { type: String, required: true },
    // password: { type: String, required: true },
    picture: {type: String},
    firstname: { type: String },
    lastname: { type: String },
    contacts: [Schema.Types.ObjectId]
})

const User = mongoose.model('users', userSchema)

module.exports = User;