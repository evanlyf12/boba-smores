import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";
import { isUserLoggedIn } from '../Auth';
import axios from 'axios';

import { Icon } from '@iconify/react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from "framer-motion"
import UserIcon from '../components/UserIcon';
import ContactPage from './ContactPage';
import FilterDropdown from '../components/FilterDropdown';
import SearchBar from '../components/SearchBar';

import '../styles/tableStyles.scss';
    

function Dashboard() {

    const history = useHistory();
    const [editMode,editIsVisible] = useState(false);
    const [addMode,addIsVisible] = useState(false);
    const [selectedContact,setSelectedContact] = useState({});
    const [contacts,setContact] = useState([]);
    const [userId,setUserId] = useState();

    const [formData, setFormData] = useState({});
    const [tag,setTags] = useState();

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    }
    console.log()
    const getContacts=async () =>{
        const check = JSON.parse(localStorage.getItem('cToken'))
        axios.get(`http://localhost:3001/api/get_contacts/${(JSON.parse(localStorage.getItem('cToken')))}`)
        .then(res => {
                // And send the user to the home page
                setUserId(check)
                setContact(res.data)
            }
        )
    }
    const getTags = async () => {
        await axios.get(`http://localhost:3001/api/get_tags/${(JSON.parse(localStorage.getItem('cToken')))}`)
            .then(res => {
                // And send the user to the home page
                console.log(res.data)
                setTags(res.data)
            }
            )
    }
    useEffect (()=>{
        if (isUserLoggedIn){
            getContacts()
            getTags()
            setUserId(JSON.parse(localStorage.getItem('cToken')))
        }
    },[])

    function handleEmpty(contact){

        if (formData.firstname){
            contact.contactInformation.name.firstName = formData.firstname;
        }
        if (formData.lastname){
            contact.contactInformation.name.lastName = formData.lastname;
        }
        if (formData.company){
            contact.contactInformation.company.name = formData.company;
        }
        if (formData.city){
            contact.contactInformation.location.city = formData.city;
        }
        if (formData.country){
            contact.contactInformation.location.country = formData.country;
        }
        if (formData.phone){
            contact.contactInformation.phone.number = formData.phone;
        }
        if (formData.email){
            contact.contactInformation.email.address = formData.email;
        }
        if (formData.facebook){
            contact.contactInformation.socials.facebook = formData.facebook;
        }
        if (formData.instagram){
            contact.contactInformation.socials.instagram = formData.instagram;
        }
        if (formData.linkedin){
            contact.contactInformation.socials.linkedin = formData.linkedin;
        }
        if (formData.date){
            contact.contactInformation.lastCatchup.date = formData.date;
        }
        if (formData.notes){
            contact.contactInformation.notes.motes = formData.notes;
        }
    }

    const handleAdd = async (event) => {

        axios.post(`http://localhost:3001/api/add_contact/${userId}`, formData)
        .then (res=>{

            // And send the user to the home page
            addIsVisible(!addMode)
            getContacts();
        })
    }
    
    const handleEdit = async (event) => {
        handleEmpty(selectedContact);
        axios.post(`http://localhost:3001/api/update_contact/${selectedContact._id}`, selectedContact)
        .then (res=>{
            // And send the user to the home page
            addIsVisible(!addMode)
            getContacts();
        })

    }

    const handleDelete = async (id, userIdB) => {
        axios.post(`http://localhost:3001/api/delete_contact/${id}/${userIdB}`)
        .then (res=>{

            // And send the user to the home page
            getContacts();
        })
    }

    function editContact(contact){
        setSelectedContact(contact);
        // setFormData({});
        editIsVisible(!editMode);
    }
    function addContact(){
        setFormData({});
        setSelectedContact({})
        addIsVisible(!addMode);
    }

    const routeChange = (path) => {
        history.push(path);
    }

    function handleClose() {
        setFormData({});
        getContacts()
        editIsVisible(false);
        addIsVisible(false);
    }

    // non case sensitive contacts search
    const filterContacts = (contacts, query) => {
        if (!query) {
            return contacts;
        }

        return searchByName(contacts, query);
    };

    function searchByName(contacts, query) {
        return contacts.filter((contact) => {
            return contact.contactInformation.name.firstName.toLowerCase().includes(query.toLowerCase());
        })
    }

    function filterByCountry() {
        //
    }

    function reformatDate(inputDate) {

        const date = new Date(inputDate)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (day == "NaN" | month == "NaN" | year == "NaN") {
            return ""
        }
        
        // add a leading 0 if the number is less than 10. like 9 to 09
        day < 10 && (day = `0${day}`)
        month < 10 && (month = `0${month}`)
    
        const newFormatDate = `${day}-${month}-${year}`
    
        return newFormatDate
    }

    const { search } = window.location;
    const { filter } = window.location;
    const sQuery = new URLSearchParams(search).get('search');
    const fQuery = new URLSearchParams(filter).get('filter');
    const [searchQuery, setSearchQuery] = useState(sQuery || '');
    const [filterQuery, setFilterQuery] = useState(fQuery || '');
    const filteredContacts = filterContacts(contacts, searchQuery);

    

    return (
        <>
        <nav>
            <div className="user-profile">
                <UserIcon />
            </div>
        </nav>
        <div className="page">
            {addMode && 
                <ContactPage handleEdit={handleAdd} selectedContact={selectedContact} handleClose={handleClose} handleChange={handleChange} handleDelete={handleDelete} userId={userId}/>
            }
            {editMode &&
                <ContactPage handleEdit={handleEdit} selectedContact={selectedContact} handleClose={handleClose} handleChange={handleChange} handleDelete={handleDelete} userId={userId}/>
            }
        
           {isUserLoggedIn() && 
           <div className="page-content">
                <div className="actions-bar">
                    <motion.div 
                        initial={{ opacity: 0,y:25 }}
                        animate={{ opacity: 1,y: 0}}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                            >
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    </motion.div>
                    <motion.div
                    initial={{ opacity: 0,y:25 }}
                    animate={{ opacity: 1,y: 0}}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    transition={{ duration: 0.5, delay: 0.7 }}>
                    <FilterDropdown data={contacts}/>
                    </motion.div>
                    <motion.div style={{float: 'right'}}
                            initial={{ opacity: 0,y:25 }}
                            animate={{ opacity: 1,y: 0}}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            transition={{ duration: 0.5, delay: 1 }}>
                        <button className="smallButton" onClick={()=>addContact()}>
                            <span> <Icon icon="gridicons:user-add" width={25} height={25}/> </span>
                            <span> New contact</span>
                        </button>
                    </motion.div>
                </div>

                <motion.div className="table container"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1,y:20 }}
                     exit={{ opacity: 0, transition: { duration: 0.1 } }}
                     transition={{ duration: 0.5, delay: 0 }}
                     >

                    <table>
                    <motion.tbody                            
                        initial={{ opacity: 0 }}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            >
                        <tr className="headerRow"
                        >
                            <th className="favoritesColumn"><h6></h6></th>
                            <th><h6>Name</h6></th>
                            <th><h6>Company</h6></th>
                            <th><h6>Location</h6></th>
                            <th className="socialsColumn"><h6>Socials</h6></th>

                            <th><h6>Tags</h6></th>
                            <th><h6>Last catchup date</h6></th>
                        </tr>
                {console.log(filteredContacts)}
                        {filteredContacts.map(contact => (
                            
                        <tr className="dataRow" key={contact._id} onClick={()=>editContact(contact)}>
                            <td className="favoritesColumn"><p>{contact.isFavourite
                            ? <Icon icon="ant-design:star-filled" color="#fff100" width="25" height="25"/>
                            : <Icon icon="ant-design:star-outlined" color="#e5e5e5" width="25" height="25" />
                            }</p></td>

                            <td>{contact.contactInformation.name.firstName} {contact.contactInformation.name.lastName}</td>
                            <td>{contact.contactInformation.company.name}</td>
                            <td>{contact.contactInformation.location.country},{contact.contactInformation.location.city}</td>
                            <td className="socialsColumn">
                                {contact.contactInformation.socials.facebook && 
                                <a style={{color:"white"}} target="_blank" href={`${contact.contactInformation.socials.facebook}`}>
                                    <Icon icon="logos:facebook" width="25" height="25" />
                                    </a>
                                }
                                {contact.contactInformation.socials.linkedin && 
                                <a style={{color:"white"}} target="_blank" href={`${contact.contactInformation.socials.linkedin}`}>
                                    <img src="linkedin-icon.svg" width="25" height="25" alt="linkedin"/>
                                </a>}
                                {contact.contactInformation.socials.instagram && 
                                <a style={{color:"white"}} target="_blank" href={`${contact.contactInformation.socials.instagram}`}>
                                    <img src="instagram-icon.png" width="25" height="25" alt="instagram"/>
                                </a>}

                            </td>
                            <td>{contact.contactInformation.tags.tags.map(tag => (<div className="tagRound" style={{background:`${tag.colour}`}}><p >{tag.text}</p></div>
                            ))}
                            </td>

                            <td>{reformatDate(contact.contactInformation.lastCatchup.date)}</td>
                        </tr>
                        ))}
                        </motion.tbody>
                    </table>  
                </motion.div>
            </div>
            }
            {(!isUserLoggedIn())&&
            routeChange("/login")
            }
            </div>
        </>
        
    );
}
        
        
export default Dashboard;
