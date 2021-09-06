const { response } = require('express');

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
    console.log(req.body);
    console.log(req.body.data);
    console.log(token);
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
    // res.json(user)
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
    user = await User.findById(req.session.userId);

    console.log(req.body);
    console.log(req.firstname);

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
    contactId = "612083542bd0ba2cd48b3040"

    Contact.findByIdAndDelete(contactId, function (err) {
        if (err) return handleError(err);
        res.sendStatus(200);
    });


}

const updateContact = async (req, res) => {

    contact = await Contact.findById(req.body.id);
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
const getContact = async (req, res) => {

    // receive desired contact from front-end (by ID)
    contact = await Contact.findById(req.params.id);
    // send contact details to front-end
    res.json(contact);

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
}

module.exports = {
    test,
    authenticateUser,
    createAccount,
    loggedIn,
    deleteContact,
    updateContact,
    addContact,
    getContact,
    addTagToContact,
}