const { response } = require('express');

const User = require('../models/user')
const Contact = require('../models/contact')
const Tag = require('../models/tag')

const test = async (req, res) => {
    res.render('test.html');
}

const logIn = async (req, res) => {
    res.render('login.html');
}

//Makes an account from the inputs of test.html form (unfinished)
//To do: make sure username is unique
const createAccount = async (req, res) => {
    const newUser = new User({
        username: req.body.uname,
        password: req.body.password,
        firstname: "John",
        lastname: "Doe"
    })

    //Saves the user to the database
    await newUser.save();

    //Tests creating a new contact, can be moved
    const newContact = new Contact({
        isFavourite: false,
        contactInformation:
        {
            name: { firstName: "Jayce", lastName: "Birrell", isVisible: true },
            company: { name: "UniMelb", isVisible: true },
            location: { city: "Adelaide", country: "Australia", isVisible: true },
            phone: { number: "+61 849032849", isVisible: true },
            email: { address: "jbirrell@student.unimelb.edu.au", isVisible: true },
            socials: { links: ["facebook.com/jayceb", "linkedin.com/jayceb"], isVisible: true },
            lastCatchup: { date: 1629517670, isVisible: true },
            commonInterests: { tags: [], isVisible: true },
            tags: { tags: [], isVisible: true },
            notes: { notes: ["Likes carbonara", "Has a nice mic"], isVisible: true }
        }
    })

    await newContact.save();

    //Tests creating a new tag, the rbg numbers can be updated with client input with string formatting 
    const newTag = new Tag({
        text: "Sleeping",
        colour: "rgb(0,0,0)"
    })

    await newTag.save();

    //Moves to a different page, needs to be replated with a window reload later
    res.render('loggedIn')
    res.status(200);
}

const loggedIn = async (req, res) => {
    res.render('loggedIn.html');
}

//Skeleton code for a verify login function, needs encrypting 
const checkLogIn = async (req, res) => {
    var uname = req.body.uname
    user = await User.findOne({ username: uname })
    if (user) {
        if (user.password == req.body.password) {
            console.log("Logged in!")
            for (const contactId of user.contacts)
            {
                newContact = await Contact.findById(contactId);
                //Send contacts to frontend
            }
            res.render("loggedIn")
        }
    }
    //Needs to be replaced with an invalid login notification 
    location.reload()
}

module.exports = {
    test,
    createAccount,
    loggedIn,
    checkLogIn,
    logIn
}