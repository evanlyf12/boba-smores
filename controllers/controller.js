const { response } = require('express');

const User = require('../models/user')

const test = async (req,res) => {
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

const loggedIn = async (req,res) => {
    res.render('loggedIn.html');
}

module.exports = {
    test,
    createAccount,
    loggedIn
}