const mongoose = require('mongoose');
var Schema = mongoose.Schema

const contactSchema = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    isFavourite: Boolean,
    contactInformation:
    {
        name: { firstName: String, lastName: String, isVisible: Boolean },
        company: { name: String, isVisible: Boolean },
        location: { city: String, country: String, isVisible: Boolean },
        phone: { number: String, isVisible: Boolean },
        email: { address: String, isVisible: Boolean },
        socials: { links: [String], isVisible: Boolean },
        lastCatchup: { date: Number, isVisible: Boolean },
        commonInterests: { tags: [Schema.Types.ObjectId], isVisible: Boolean },
        tags: { tags: [Schema.Types.ObjectId], isVisible: Boolean },
        notes: { notes: [String], isVisible: Boolean }
    }
})

const Contact = mongoose.model('contacts', contactSchema)
module.exports = Contact;