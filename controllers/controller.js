const { response } = require('express');

const test = async (req,res) => {
    res.render('test.html');
}

module.exports = {
    test,
}