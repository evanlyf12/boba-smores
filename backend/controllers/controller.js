const { response } = require('express');
//a
const User = require('../models/user')
const Contact = require('../models/contact')
const Tag = require('../models/tag')
const { OAuth2Client } = require('google-auth-library')


const client = new OAuth2Client(process.env.CLIENT_ID);

const test = async (req, res) => {
    res.render('test.html');
}

// Verify the Google provided ID token is valid
const authenticateUser = async (req, res) => {
    const { token } = req.body.data;
    //substring(1, (req.body.data.length - 1));
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { firstName, lastName, email, picture } = ticket.getPayload();

    // update or create a user in the CRM database
    const user = await User.findOneAndUpdate(
        { email: email },
        { firstName: firstName, lastName: lastName, picture: picture }
    )

    if (!user) {
        const user = new User({
            email: email,
            firstname: firstName,
            lastname: lastName,
            picture: picture
        })
        await user.save();
    }
    req.session.userId = user.id;

    // user = JSON.parse(user);

    res.status(201)
    res.json(user)
}

const createAccount = async (req, res) => {
    const newUser = new User({
        email: req.body.uname,
        password: req.body.password,
        firstname: "John",
        lastname: "Doe"
    })

    await newUser.save();

    res.render('loggedIn')
    res.status(200);
}

const loggedIn = async (req, res) => {
    res.render('loggedIn.html');
}

const addContact = async (req, res) => {
    console.log("Got here");
    const user = await User.findById(req.params.id);

    const newContact = new Contact({
        isFavourite: false,
        contactInformation:
        {
            name: { firstName: req.body.firstname, lastName: req.body.lastname },
            company: { name: req.body.company, isVisible: true },
            location: { city: req.body.city, country: req.body.country, isVisible: true },
            phone: { number: req.body.phone, isVisible: true },
            email: { address: req.body.email, isVisible: true },
            socials: {
                facebook: req.body.facebook,
                instagram: req.body.instagram,
                linkedin: req.body.linkedin,
                isVisible: true
            },
            lastCatchup: { date: req.body.date, isVisible: true },
            commonInterests: { tags: [], isVisible: true },
            tags: { tags: [], isVisible: true },
            notes: { notes: req.body.notes, isVisible: true }
        }
    });

    await newContact.save();

    console.log(newContact._id);

    user.contacts.push(newContact._id);

    user.markModified("contacts");

    await user.save();

    res.sendStatus(200);

}

const deleteContact = async (req, res) => {
    const contactId = req.params.contactId;
    const userId = req.params.userId;

    let user = await User.findById(userId);

    const index = user.contacts.indexOf(contactId);

    if (index > -1) user.contacts.splice(index, 1);

    user.markModified("contacts");

    await user.save();

    Contact.findByIdAndDelete(contactId, function (err) {
        if (err) return handleError(err);
        res.sendStatus(200);
    });


}

const updateContact = async (req, res) => {

    const contact = await Contact.findById(req.params.id);
    console.log("IN CONTACT");
    console.log(contact);
    // update all fields with passed data from front-end (including unchanged ones)
    contact.contactInformation.name.firstName = req.body.firstname;
    contact.contactInformation.name.lastName = req.body.lastname;
    contact.contactInformation.company.name = req.body.company;
    contact.contactInformation.location.city = req.body.city;
    contact.contactInformation.location.country = req.body.country;
    contact.contactInformation.phone.number = req.body.phone;
    contact.contactInformation.email.address = req.body.email;
    contact.contactInformation.socials.facebook = req.body.facebook;
    contact.contactInformation.socials.instagram = req.body.instagram;
    contact.contactInformation.socials.linkedin = req.body.linkedin;
    contact.contactInformation.lastCatchup.date = req.body.date;

    // Qu: How will arrays be sent to backend?
    contact.contactInformation.commonInterests.tags = req.body.com_int_tags
    // Note: need to markModified for arrays. e.g.
    contact.contactInformation.commonInterests.markModified("tags");

    contact.contactInformation.tags.tags = req.body.tags
    contact.contactInformation.tags.markModified("tags");

    contact.contactInformation.notes.notes = req.body.notes
    contact.contactInformation.notes.markModified("notes");

    // save changes
    await contact.save();

}

// to retrieve contact from backend and send to front-end 
const getContacts = async (req, res) => {
    console.log("IN GET CONTACTS");
    let contacts = [];
    const user = await User.findById(req.params.id);
    console.log(user);
    for (var i = 0; i < user.contacts.length; i++) {
        var contact = await Contact.findById(user.contacts[i]).lean();
        contacts[i] = contact;
    }
    // receive desired contact from front-end (by ID)
    // send contact details to front-end
    res.send(contacts);

}
// to retrieve existing tags that a user has created
const getTags = async (req, res) => {
    let tags = [];
    const user = await User.findById(req.params.id);
    // retrieve tags from database by their ids stored in user
    for (var i = 0; i < user.tags.length; i++) {
        var tag = await Tag.findById(user.tags[i]).lean();
        tags[i] = tag;
    }
    // send to front-end
    res.send(tags);
}
// to retrieve existing common interests that a user has created
const getComInterests = async (req, res) => {
    let comInterests = [];
    const user = await User.findById(req.params.id);
    // retrieve common interests from database by their ids stored in user
    for (var i = 0; i < user.comInterests.length; i++) {
        var comInterest = await Tag.findById(user.comInterests[i]).lean();
        comInterests[i] = comInterest;
    }
    // send to front-end
    res.send(comInterests);
}


// create a new tag/common interest AND add it to a contact 
const createTag = async (req, res) => {

    // creating new tag/common interest to be added
    const newTag = new Tag({
        text: req.body.text,
        colour: req.body.colour,
        isCommonInterest: req.body.isComInterest
    })
    // and added to database (if not exist already?)
    await newTag.save();

    const user = await User.findById(req.params.userId);
    const contact = await Contact.findById(req.params.contactId);

    // if is common interest, add to user's and contact's common interests arrays
    if (req.body.isComInterest) {
        user.comInterests.push(newTag._id)
        contact.contactInformation.commonInterests.tags.push(newTag._id)

        user.markModified("comInterests")
        contact.contactInformation.commonInterests.markModified("tags")
        // if is tag,  add to user's and contact's tags arrays
    } else {
        user.tags.push(newTag._id)
        contact.contactInformation.tags.tags.push(newTag._id)

        user.markModified("tags")
        contact.contactInformation.tags.markModified("tags")
    }

    // save changes
    await user.save();
    await contact.save();
}
// add existing tag/common interest to a contact
const addTagToContact = async (req, res) => {

    const tag = await Tag.findById(req.params.tagId);
    const contact = await Contact.findById(req.params.contactId);

    // if is common interest, add to contact's common interests arrays
    if (tag.isComInterest) {
        contact.contactInformation.commonInterests.tags.push(newTag._id)
        contact.contactInformation.commonInterests.markModified("tags")
        // if is tag,  add to contact's tags arrays
    } else {
        contact.contactInformation.tags.tags.push(newTag._id)
        contact.contactInformation.tags.markModified("tags")
    }

    // save changes
    await contact.save();
}


module.exports = {
    test,
    authenticateUser,
    createAccount,
    loggedIn,
    deleteContact,
    updateContact,
    addContact,
    createTag,
    addTagToContact,
    getContacts,
    getTags,
    getComInterests,
}