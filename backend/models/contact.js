const mongoose = require('mongoose');
var Schema = mongoose.Schema

const contactSchema = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    isFavourite: Boolean,
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
        lastCatchup: { date: Number, isVisible: Boolean },
        commonInterests: { tags: [Schema.Types.ObjectId], isVisible: Boolean },
        tags: { tags: [Schema.Types.ObjectId], isVisible: Boolean },
        notes: { notes: String, isVisible: Boolean },
        image: {
            name: String,
            desc: String,
            img:
            {
                data: Buffer,
                contentType: String
            }
        }
    }
})

const Contact = mongoose.model('contacts', contactSchema)
module.exports = Contact;