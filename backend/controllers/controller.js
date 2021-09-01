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
    const newContact = new Contact({
        isFavourite: false,
        contactInformation:
        {
            name: { firstName: req.params.firstname, lastName: req.params.lastname},
            company: { name: req.params.company, isVisible: true },
            location: { city: req.params.city, country: req.params.country, isVisible: true },
            phone: { number: req.params.phone, isVisible: true },
            email: { address: req.params.email, isVisible: true },
            socials: { 
                facebook: req.params.facebook,
                instagram: req.params.instagram,
                linkedin: req.params.linkedin, 
                isVisible: true },
            lastCatchup: { date: req.params.date, isVisible: true },
            commonInterests: { tags: [], isVisible: true },
            tags: { tags: [], isVisible: true },
            notes: { notes: req.params.notes, isVisible: true }
        }
    })

    await newContact.save();
}

const deleteContact = async (req, res) => {
    contactId = req.params.id;

    Contact.remove({ _id: req.body.id }, function(err) {
        if (!err) {
                message.type = 'Removed!';
        }
        else {
                message.type = 'error';
        }
    });
}

const addTag = async (req,res) => {
    const newTag = new Tag({
        text: req.params.text,
        colour: req.params.colour
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