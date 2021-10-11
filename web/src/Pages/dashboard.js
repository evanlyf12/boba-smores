import React, { useState, useEffect } from 'react';
import { items } from '../data';
import { useHistory } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { isUserLoggedIn } from '../Auth';
import axios from 'axios';
function Dashboard({ userId }) {
    const [editPopUp, editIsVisible] = useState(false);
    const [addPopUp, addIsVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState({});
    const [contacts, setContact] = useState([]);

    const [formData, setFormData] = useState({});
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }


    useEffect(() => {
        if (isUserLoggedIn) {
            getContacts()
        }
    }, [])

    const getContacts = async () => {
        console.log(userId)
        axios.get(`http://localhost:3001/api/get_contacts/${userId}`)
            .then(res => {
                // And send the user to the home page
                console.log(res)
                setContact(res.data)
            }
            )
    }  
    const getCommon = async () => {
        console.log(userId)
        axios.get(`http://localhost:3001/api/get_com_interests/${userId}`)
            .then(res => {
                // And send the user to the home page
                console.log(res)
                setContact(res.data)
            }
            )
    }  
    const getTags = async () => {
        console.log(userId)
        axios.get(`http://localhost:3001/api/get_tags/${userId}`)
            .then(res => {
                // And send the user to the home page
                console.log(res)
                setContact(res.data)
            }
            )
    }

    const handleTagDelete = async (event) => {
        console.log("IN HANDLE SUBMIT");
        axios.post(`http://localhost:3001/api/delete_tag/${userId}/${tagId}`)
            .then(res => {

                // And send the user to the home page
                addIsVisible(!addPopUp)
                getTags();
            })
    }

    const handleCreateTag = async (event) => {
        console.log("IN HANDLE SUBMIT");
        axios.post(`http://localhost:3001/api/create_tag/${userId}/${contactId}`, tagData)
            .then(res => {

                // And send the user to the home page
                addIsVisible(!addPopUp)
                getTags();
            })
            //tag data ->  body: text, colour, isComInterest
    }
 
    const handleAddTag = async (event) => {
        console.log("IN HANDLE SUBMIT");
        axios.post(`http://localhost:3001/api/add_tag/${contactId}/${tagId}`)
            .then(res => {

                // And send the user to the home page
                addIsVisible(!addPopUp)
                getContacts();
            })
    }
    const handleRemoveTag = async (event) => {
        console.log("IN HANDLE SUBMIT");
        axios.post(`http://localhost:3001/api/remove_tag/${contactId}/${tagId}`)
            .then(res => {

                // And send the user to the home page
                addIsVisible(!addPopUp)
                getContacts();
            })
    }


    const handleSubmit = async (event) => {
        console.log("IN HANDLE SUBMIT");
        axios.post(`http://localhost:3001/api/add_contact/${userId}`, formData)
            .then(res => {

                // And send the user to the home page
                addIsVisible(!addPopUp)
                getContacts();
            })


    }
    const handleSubmitEdit = async (event) => {
        console.log(selectedContact._id);
        axios.post(`http://localhost:3001/api/update_contact/${selectedContact._id}`, formData)
            .then(res => {

                // And send the user to the home page
                addIsVisible(!addPopUp)
                getContacts();
            })

    }

    const handleDelete = async (event) => {
        console.log(selectedContact);
        axios.post(`http://localhost:3001/api/delete_contact/${selectedContact._id}/${userId}`, formData)

    }

    // create new tag/common interest and add it to contact and user
    const handleCreateTag = async (event) => {
        // createTag is a post request which listens for '/create_tag/:userId/:contactId' 
        // and takes a body arguments following the structure
        // const newTag = new Tag({
        //     text: req.body.text,
        //     colour: req.body.colour,
        //     isCommonInterest: req.body.isComInterest
        // })
    }

    // add existing tag to a contact
    const handleAddTag = async (event) => {
        // addTag is a post request which listens for '/add_tag/:contactId/:tagId' 
        // and takes a body arguments following the structure
    }

    function editContact(contact) {
        setSelectedContact(contact);
        editIsVisible(!editPopUp);
    }


    function deleteContact(contact) {
        setSelectedContact(contact);
        handleDelete();
    }

    const history = useHistory();
    const routeChange = (path) => {
        history.push(path);
    }

    function closePopup() {
        editIsVisible(false);
        addIsVisible(false);
    }

    return (
        <>
            <nav>
                <div className="profile">
                    <a href="/login">
                        <img src="avatar.png" width="50px" alt="avatar" />
                    </a>
                    <div><p className="avatarHeader"> Lewis</p></div>
                </div>

            </nav>
            {editPopUp &&
                <div className="popup">
                    <form onSubmit={handleSubmitEdit}>
                        <button onClick={closePopup}>close popup</button><br />
                        <label for="firstame">Firstname</label>
                        <input type="text" name="firstname" id="firstname" placeholder="Ben" defaultValue={selectedContact.contactInformation.name.firstName} onChange={handleChange} /><br />
                        <label for="lastname">Lastname</label>
                        <input type="text" name="lastname" id="lastname" placeholder="Doe" defaultValue={selectedContact.contactInformation.name.lastName} onChange={handleChange} /><br />
                        <label for="company">company</label>
                        <input type="text" name="company" id="company" placeholder="Ben" defaultValue={selectedContact.contactInformation.company.name} onChange={handleChange} /><br />
                        <label for="city">city</label>
                        <input type="text" name="city" id="city" placeholder="Ben" defaultValue={selectedContact.contactInformation.location.city} onChange={handleChange} /><br />
                        <label for="country">country</label>
                        <input type="text" name="country" id="country" placeholder="Ben" defaultValue={selectedContact.contactInformation.location.country} onChange={handleChange} /><br />
                        <label for="phone">phone</label>
                        <input type="text" name="phone" id="phone" placeholder="Ben" defaultValue={selectedContact.contactInformation.phone.number} onChange={handleChange} /><br />
                        <label for="email">email</label>
                        <input type="text" name="email" id="email" placeholder="Ben" defaultValue={selectedContact.contactInformation.email.address} onChange={handleChange} /><br />\
                        <p>Socials</p>
                        <label for="facebook">facebook link</label>
                        <input type="text" name="facebook" id="facebook" placeholder="Ben" defaultValue={selectedContact.contactInformation.socials.facebook} onChange={handleChange} /><br />
                        <label for="instagram">instagram link</label>
                        <input type="text" name="instagram" id="instagram" placeholder="Ben" defaultValue={selectedContact.contactInformation.socials.instagram} onChange={handleChange} /><br />
                        <label for="linkedin">linkedin link</label>
                        <input type="text" name="linkedin" id="linkedin" placeholder="Ben" defaultValue={selectedContact.contactInformation.socials.linkedin} onChange={handleChange} /><br />
                        <label for="date">last catchup</label>
                        <input type="datetime-local" name="date" id="date" placeholder="Ben" defaultValue={selectedContact.contactInformation.lastCatchup.date} onChange={handleChange} /><br />
                        {/* <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/>
                <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/> */}
                        <label for="notes">notes</label>
                        <input type="text" name="notes" id="notes" placeholder="Ben" defaultValue={selectedContact.contactInformation.notes.notes} onChange={handleChange} /><br />
                        <button type="submit" onSubmit={handleSubmitEdit}>submit</button>
                    </form>
                </div>
            }
            {addPopUp &&
                <div className="popup">
                    <form onSubmit={handleSubmit}>
                        <button onClick={closePopup}>close popup</button><br />
                        <label for="firstame">Firstname</label>
                        <input type="text" name="firstname" id="firstname" placeholder="Ben" onChange={handleChange} /><br />
                        <label for="lastname">Lastname</label>
                        <input type="text" name="lastname" id="lastname" placeholder="Doe" onChange={handleChange} /><br />
                        <label for="company">company</label>
                        <input type="text" name="company" id="company" placeholder="Ben" onChange={handleChange} /><br />
                        <label for="city">city</label>
                        <input type="text" name="city" id="city" placeholder="Ben" onChange={handleChange} /><br />
                        <label for="country">country</label>
                        <input type="text" name="country" id="country" placeholder="Ben" onChange={handleChange} /><br />
                        <label for="phone">phone</label>
                        <input type="text" name="phone" id="phone" placeholder="Ben" onChange={handleChange} /><br />
                        <label for="email">email</label>
                        <input type="text" name="email" id="email" placeholder="Ben" onChange={handleChange} /><br />\
                        <p>Socials</p>
                        <label for="facebook">facebook link</label>
                        <input type="text" name="facebook" id="facebook" placeholder="Ben" onChange={handleChange} /><br />
                        <label for="instagram">instagram link</label>
                        <input type="text" name="instagram" id="instagram" placeholder="Ben" onChange={handleChange} /><br />
                        <label for="linkedin">linkedin link</label>
                        <input type="text" name="linkedin" id="linkedin" placeholder="Ben" onChange={handleChange} /><br />
                        <label for="date">last catchup</label>
                        <input type="datetime-local" name="date" id="date" placeholder="Ben" onChange={handleChange} /><br />
                        {/* <label for =""></label>
                        <input type="text" name="" placeholder="Ben"/><br/>
                        <label for =""></label>
                        <input type="text" name="" placeholder="Ben"/><br/> */}
                        <label for="notes">notes</label>
                        <input type="text" name="notes" id="notes" placeholder="Ben" onChange={handleChange} /><br />
                        <button type="submit" onSubmit={handleSubmit}>submit</button>
                    </form>
                </div>
            }

            {isUserLoggedIn && <div className="containerDash">


                <div className="menuBar">
                    <div className="search">
                        <form>
                            <button type="submit">
                                <img src="search.png" alt="search" />
                            </button>
                            <input className="dashSearch" placeholder="Search By Name"></input>
                        </form>
                    </div>

                    <div className="filter">
                        <form className="filterForm">
                            <select id="filter" name="filter">
                                <option value="" disabled selected>Filter by country </option>
                                <option value="australia">Australia</option>
                                <option value="newzealand">New Zealand</option>
                            </select>
                        </form>
                    </div>
                    <div>
                        <button className="newContact" onClick={() => addIsVisible(!addPopUp)}>
                            <img src="group.png" alt="group" />
                            <span> New contact</span>
                        </button>
                    </div>
                </div>
                <table>
                    <tr>
                        <th><p className="tableTitles">*</p></th>
                        <th><p className="tableTitles">Name</p></th>
                        <th><p className="tableTitles">Company</p></th>
                        <th><p className="tableTitles">Location</p></th>
                        <th><p className="tableTitles">Phone</p></th>
                        <th><p className="tableTitles">Email</p></th>
                        <th><p className="tableTitles">Socials</p></th>
                        <th><p className="tableTitles">Common Interests</p></th>
                        <th><p className="tableTitles">Tags</p></th>
                        <th><p className="tableTitles">Actions</p></th>
                    </tr>


                    {/*change items to contact variable */}
                    {contacts.map(contact => (
                        <tr>
                            <td>{contact.isFavourite && <span>⭐</span>}</td>
                            <td>{contact.contactInformation.name.firstName}{contact.contactInformation.name.lastName}</td>
                            <td>{contact.contactInformation.company.name}</td>
                            <td>{contact.contactInformation.location.country},{contact.contactInformation.location.city}</td>
                            <td>{contact.contactInformation.phone.number}</td>
                            <td>{contact.contactInformation.email.address}</td>
                            <td>{contact.contactInformation.socials.facebook &&
                                <a style={{ color: "white" }} href={`${contact.contactInformation.socials.facebook}`}>
                                    <FacebookIcon />
                                </a>
                            }
                                {contact.contactInformation.socials.instagram &&
                                    <a style={{ color: "white" }} href={`${contact.contactInformation.socials.instagram}`}>
                                        <InstagramIcon />
                                    </a>}
                                {contact.contactInformation.socials.linkedin &&
                                    <a style={{ color: "white" }} href={`${contact.contactInformation.socials.linkedin}`}>
                                        <LinkedInIcon />
                                    </a>}
                            </td>
                            <td>{contact.contactInformation.lastCatchup.date}</td>
                            <td>{contact.contactInformation.notes.notes}</td>
                            <td></td>
                            {/* {console} */}
                            {/* <td>{contact.favourite && <span>⭐</span>}</td>
                // <td>{cselectedContact.contactInformation.name.firstName}{selectedContact.contactInformation.name.lastName}</td>
                <td>{contact.company}</td>
                <td>{contact.contactInformation.location.country},{selectedContact.contactInformation.location.city}</td>
                <td>{Contact.contactInformation.phone.number}</td>
                <td>{Contact.contactInformation.email.address}</td>
                <td>Contact.contactInformation.socials.facebook && <a href={`${contact.socials.facebook}`}><FacebookIcon/></a>}
                {contact.socials.instagram && <a href={`${contact.socials.instagram}`}><InstagramIcon/></a>}
                {contact.socials.linkedin && <a href={`${contact.socials.linkedin}`}><LinkedInIcon/></a>}</td>
                <td>{contact.commonInterests.map(interest=>(
                    <span>{interest}</span>
                ))}</td>
                <td>{contact.tags.map(tag=>(
                    <span>{tag}</span>
                ))}</td>*/}
                            <td className="actions">
                                <div onClick={() => editContact(contact)}>
                                    <img src="edit.png" alt="edit" />
                                </div>
                                <div onClick={() => deleteContact(contact)}>
                                    <img src="bin.png" alt="bin" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>

            </div>
            }
            {(!isUserLoggedIn) &&
                routeChange("/login")
            }
        </>
    );
}

export default Dashboard;
