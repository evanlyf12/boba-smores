const mongoose = require('mongoose');
var Schema = mongoose.Schema

const contactSchema = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    isFavourite: Boolean,
    history: {created: String, lastModified: String },
    contactInformation:
    {
        name: { firstName: String, lastName: String },
        company: { name: String, isVisible: Boolean },
        location: { city: String, country: String, isVisible: Boolean },
        phone: { number: String, isVisible: Boolean },
        email: { address: String, isVisible: Boolean },
        socials: {
            facebook: String,
            instagram: String,
            linkedin: String,
            isVisible: Boolean
        },
        lastCatchup: { date: String, isVisible: Boolean },
        commonInterests: { tags: [Schema.Types.ObjectId], isVisible: Boolean },
        tags: { tags: [Schema.Types.ObjectId], isVisible: Boolean },
        notes: { notes: [String], isVisible: Boolean }
    }
})

const Contact = mongoose.model('contacts', contactSchema)
module.exports = Contact;