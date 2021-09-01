const { response } = require('express');

const User = require('../models/user')
const Contact = require('../models/contact')
const Tag = require('../models/tag')

const test = async (req, res) => {
    res.render('test.html');
}

const createAccount = async (req, res) => {
    const newUser = new User({
        username: req.body.uname,
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
    user = await User.findById("612083ffedae034504534f22");

    console.log(req.body);
    console.log(req.firstname);

    const newContact = new Contact({
        isFavourite: false,
        contactInformation:
        {
            name: { firstName: req.body.firstname, lastName: req.body.lastname},
            company: { name: req.body.company, isVisible: true },
            location: { city: req.body.city, country: req.body.country, isVisible: true },
            phone: { number: req.body.phone, isVisible: true },
            email: { address: req.body.email, isVisible: true },
            socials: { 
                facebook: req.body.facebook,
                instagram: req.body.instagram,
                linkedin: req.body.linkedin, 
                isVisible: true },
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

const addTag = async (req,res) => {
    const newTag = new Tag({
        text: req.body.text,
        colour: req.body.colour
    })

    await newTag.save();
}

module.exports = {
    test,
    createAccount,
    loggedIn,
    deleteContact,
    addContact,
    addTag,
}