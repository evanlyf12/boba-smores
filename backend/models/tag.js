const mongoose = require('mongoose');
var Schema = mongoose.Schema

const tagSchema = new mongoose.Schema({
    text: String,
    colour: String
})

const Tag = mongoose.model('tags', tagSchema)

module.exports = Tag;