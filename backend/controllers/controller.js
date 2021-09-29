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
        {email: email},
        {firstName: firstName, lastName: lastName, picture: picture }
    )

    if(!user)
    {
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

    res.sendStatus(201);

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

    console.log("IN CONTACT");
    console.log(req.body)
    const contact = await Contact.findById(req.params.id);
    console.log(contact);
    // update all fields with passed data from front-end (including unchanged ones)
    contact.contactInformation.name.firstName = req.body.contactInformation.name.firstName;
    contact.contactInformation.name.lastName = req.body.contactInformation.name.lastName;
    contact.contactInformation.company.name = req.body.contactInformation.company.name;
    contact.contactInformation.location.city = req.body.contactInformation.location.city;
    contact.contactInformation.location.country = req.body.contactInformation.location.country;
    contact.contactInformation.phone.number = req.body.contactInformation.phone.number;
    contact.contactInformation.email.address = req.body.contactInformation.email.address;
    contact.contactInformation.socials.facebook = req.body.contactInformation.socials.facebook;
    contact.contactInformation.socials.instagram = req.body.contactInformation.socials.instagram;
    contact.contactInformation.socials.linkedin = req.body.contactInformation.socials.linkedin;
    contact.contactInformation.lastCatchup.date = req.body.contactInformation.lastCatchup.date;

    // Qu: How will arrays be sent to backend?
    contact.contactInformation.commonInterests.tags = req.body.contactInformation.commonInterests.tags
    // Note: need to markModified for arrays. e.g.
    contact.contactInformation.commonInterests.markModified("tags");

    contact.contactInformation.tags.tags = req.body.contactInformation.tags.tags
    contact.contactInformation.tags.markModified("tags");

    contact.contactInformation.notes.notes = req.body.contactInformation.notes.notes
    contact.contactInformation.notes.markModified("notes");

    // save changes
    await contact.save();

    res.sendStatus(200);

}

// to retrieve contact from backend and send to front-end 
const getContacts = async (req, res) => {
    // console.log("IN GET CONTACTS");
    let contacts = [];
    // console.log(req.params)
    const user = await User.findById(req.params.id);
    // console.log(user);
    for (var i = 0; i < user.contacts.length; i++)
    {
        var contact = await Contact.findById(user.contacts[i]).lean();
        contacts[i] = contact;
    }
    // receive desired contact from front-end (by ID)
    // send contact details to front-end
    res.send(contacts);

    res.sendStatus(200);

}

// add (existing) tag to a contact 
const addTagToContact = async (req, res) => {

    const newTag = new Tag({
        text: req.body.text,
        colour: req.body.colour
    })
    // tag need to be added to contact

    // and added to database (if not exist already?)
    await newTag.save();

    res.sendStatus(200);
}


module.exports = {
    test,
    authenticateUser,
    createAccount,
    loggedIn,
    deleteContact,
    updateContact,
    addContact,
    addTagToContact,
    getContacts,
}