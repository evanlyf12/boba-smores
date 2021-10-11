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
    try {

        console.log("Got here");
        const user = await User.findById(req.params.id).orFail();

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
                commonInterests: { tags: req.body.commonInterests, isVisible: true },
                tags: { tags: req.body.tags, isVisible: true },
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
    catch (error) {
        res.sendStatus(404);
    }

}

const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.contactId;
        const userId = req.params.userId;

        let user = await User.findById(userId).orFail();;

        const index = user.contacts.indexOf(contactId);

        if (index > -1) user.contacts.splice(index, 1);

        user.markModified("contacts");

        await user.save();

        Contact.findByIdAndDelete(contactId, function (err) {
            if (err) return handleError(err);
            res.sendStatus(200);
        });
    }
    catch (error) {
        res.sendStatus(404);
    }


}

const updateContact = async (req, res) => {

    try {
        const contact = await Contact.findById(req.params.id).orFail();
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
    catch (error) {
        res.sendStatus(404);
    }
}

// to retrieve contact from backend and send to front-end 
const getContacts = async (req, res) => {
    try {
        console.log("IN GET CONTACTS");
        let contacts = [];
        const user = await User.findById(req.params.id).orFail();
        console.log(user);
        for (var i = 0; i < user.contacts.length; i++) {
            var contact = await Contact.findById(user.contacts[i]).lean();
            contacts[i] = contact;
        }
        // receive desired contact from front-end (by ID)
        // send contact details to front-end
        res.status(200)
        res.send(contacts);
    }
    catch (error) {
        res.sendStatus(404);
    }

}

// to retrieve existing tags that a user has created
const getTags = async (req, res) => {
    try {

        let tags = [];
        const user = await User.findById(req.params.id).orFail();
        // retrieve tags from database by their ids stored in user
        for (var i = 0; i < user.tags.length; i++) {
            var tag = await Tag.findById(user.tags[i]).lean();
            tags[i] = tag;
        }
        // send to front-end
        res.send(tags);
    }
    catch (error) {
        res.sendStatus(404);
    }
}

// to retrieve existing common interests that a user has created
const getComInterests = async (req, res) => {
    try {
        let commonInterests = [];
        const user = await User.findById(req.params.id).orFail();
        // retrieve common interests from database by their ids stored in user
        for (var i = 0; i < user.commonInterests.length; i++) {
            var commonInterest = await Tag.findById(user.commonInterests[i]).lean();
            commonInterests[i] = commonInterest;
        }
        // send to front-end
        res.send(commonInterests);
    }
    catch (error) {
        res.sendStatus(404);
    }
}


// create a new tag/common interest AND add it to a contact 
const createTag = async (req, res) => {

    try {
        const user = await User.findById(req.params.userId).orFail();
        const contact = await Contact.findById(req.params.contactId).orFail();

        if (!user.contacts.includes(req.params.contactId)) 
        {
            res.sendStatus(400);
            return;
        }
        else{
            // creating new tag/common interest to be added
            const newTag = new Tag({
                text: req.body.text,
                colour: req.body.colour,
                isCommonInterest: req.body.isComInterest
            })
            // and added to database (if not exist already?)
            await newTag.save();
            // if is common interest, add to user's and contact's common interests arrays
            console.log(req.body)
            if (req.body.isComInterest == 'true' || req.body.isComInterest) {
                console.log('Is common int')
                user.commonInterests.push(newTag._id)
                contact.contactInformation.commonInterests.tags.push(newTag._id)

                user.markModified("commonInterests")
                contact.contactInformation.commonInterests.markModified("tags")
                // if is tag,  add to user's and contact's tags arrays
            } else {
                console.log('Is NOT common int')
                user.tags.push(newTag._id)
                contact.contactInformation.tags.tags.push(newTag._id)

                user.markModified("tags")
                contact.contactInformation.tags.markModified("tags")
            }

            // save changes
            await user.save();
            await contact.save();
            res.sendStatus(201);
        }
    }
    catch (error) {
        res.sendStatus(404);
    }
}

// delete tag from ALL contacts 
const deleteTag = async (req, res) => {
    try {
        console.log("DELETING TAG")
        // should get tag or just its id? does getting tag first make sure the tag exists first?
        const tag = await Tag.findById(req.params.tagId).orFail();
        const user = await User.findById(req.params.userId).orFail();

        if ((!user.tags.includes(req.params.tagId)) && (!user.commonInterests.includes(req.params.tagId))) 
        {
            res.sendStatus(403);
            return;
        }
        else
        {
            if (tag.isCommonInterest) {
                // delete tag id from all contacts' common interests arrays
                for (var i = 0; i < user.contacts.length; i++) {
                    var contact = await Contact.findById(user.contacts[i]).orFail();
                    // console.log(contact.contactInformation.commonInterests.tags.length);
                    var removed = removeItem(contact.contactInformation.commonInterests.tags, tag._id)
                    if (removed) {
                        contact.contactInformation.commonInterests.markModified("tags")
                        await contact.save()
                    }
                }

                // delete tag id in user's common interests array
                removeItem(user.commonInterests, tag._id)
                user.markModified("commonInterests")
            } else {
                // delete tag id from all contacts' tags arrays
                for (var i = 0; i < user.contacts.length; i++) {
                    var contact = await Contact.findById(user.contacts[i]).orFail();
                    var removed = removeItem(contact.contactInformation.tags.tags, tag._id)
                    if (removed) {
                        contact.contactInformation.tags.markModified("tags")
                        await contact.save()
                    }
                }

                // delete tag id in user's tags array
                removeItem(user.tags, tag._id)
                user.markModified("tags")
            }

            await user.save()

            // delete tag from tag collection by its id
            Tag.findByIdAndDelete(tag._id, function (err) {
                if (err) return handleError(err);
                res.sendStatus(200);
            });
        }
    }
    catch (error) {
        res.sendStatus(404);
    }
}

function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
        return true;
    }
    // can we markModify from inside this function? probably not
    return false;
}

// add existing tag/common interest to a contact
const addTagToContact = async (req, res) => {
    try {

        const tag = await Tag.findById(req.params.tagId).orFail();
        const contact = await Contact.findById(req.params.contactId).orFail();

        // if is common interest, add to contact's common interests arrays
        if (tag.isCommonInterest) {
            contact.contactInformation.commonInterests.tags.push(tag._id)
            contact.contactInformation.commonInterests.markModified("tags")
            // if is tag,  add to contact's tags arrays
        } else {
            contact.contactInformation.tags.tags.push(tag._id)
            contact.contactInformation.tags.markModified("tags")
        }

        // save changes
        await contact.save();

        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(404);
    }
}

// remove a tag/common interest from ONE contact
const removeTagFromContact = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.tagId).orFail();
        const contact = await Contact.findById(req.params.contactId).orFail();

        // if is common interest, remove from contact's common interests arrays
        if (tag.isCommonInterest) {

            // find index of tag and remove item at that index
            var removed = removeItem(contact.contactInformation.commonInterests.tags, tag._id)
            if (removed) {
                contact.contactInformation.commonInterests.markModified("tags")
                await contact.save()
                res.sendStatus(200)
            }

            // if is tag, remove from contact's tags arrays
        } else {

            // find index of tag and remove item at that index
            var removed = removeItem(contact.contactInformation.tags.tags, tag._id)
            if (removed) {
                contact.contactInformation.tags.markModified("tags")
                await contact.save()
                res.sendStatus(200)
            }
        }
    }
    catch (error) {
        res.sendStatus(404);
    }
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
    deleteTag,
    addTagToContact,
    removeTagFromContact,
    getContacts,
    getTags,
    getComInterests,
}