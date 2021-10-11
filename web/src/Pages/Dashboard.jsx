import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";
import { isUserLoggedIn } from '../Auth';
import axios from 'axios';

import { Icon } from '@iconify/react';
import { makeStyles } from '@material-ui/core/styles';

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

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    }

    const getContacts=async () =>{
        const check = JSON.parse(localStorage.getItem('cToken'));
        axios.get(`https://bobasmorescrm.herokuapp.com/api/get_contacts/${check}`)
        .then(res => {
                // And send the user to the home page
                setUserId(check);
                setContact(res.data)
            }
        )
    }

    useEffect (()=>{
        if (isUserLoggedIn){
            getContacts()
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

        axios.contact(`https://bobasmorescrm.herokuapp.com/api/add_contact/${userId}`, formData)
        .then (res=>{

            // And send the user to the home page
            addIsVisible(!addMode)
            getContacts();
        })
    }
    
    const handleEdit = async (event) => {
        handleEmpty(selectedContact);
        axios.contact(`https://bobasmorescrm.herokuapp.com/api/update_contact/${selectedContact._id}`, selectedContact)
        .then (res=>{
            // And send the user to the home page
            addIsVisible(!addMode)
            getContacts();
        })

    }

    const handleDelete = async (id, userIdB) => {
        axios.contact(`https://bobasmorescrm.herokuapp.com/api/delete_contact/${id}/${userIdB}`)
        .then (res=>{

            // And send the user to the home page
            getContacts();
        })
    }

    function editContact(contact){
        setSelectedContact(contact);
        // setFormData(contact);
        editIsVisible(!editMode);
    }

    const routeChange = (path) => {
        history.push(path);
    }

    function handleClose() {
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
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    <FilterDropdown data={contacts}/>

                    <div style={{float: 'right'}}>
                        <button className="smallButton" onClick={()=>addIsVisible(!addMode)}>
                            <span> <Icon icon="gridicons:user-add" width={25} height={25}/> </span>
                            <span> New contact</span>
                        </button>
                    </div>
                </div>

                <div className="table container">

                    <table>
                    <tbody>
                        <tr className="headerRow">
                            <th className="favoritesColumn"><h6></h6></th>
                            <th className="nameColumn"><h6>Name</h6></th>
                            <th className="companyColumn"><h6>Company</h6></th>
                            <th className="interestsColumn"><h6>Common interests</h6></th>
                            <th className="tagsColumn"><h6>Tags</h6></th>
                            <th className="socialsColumn"><h6>Socials</h6></th>
                            <th className="catchupDateColumn"><h6>Last catchup date</h6></th>
                            <th className="locationColumn"><h6>Location</h6></th>
                        </tr>
            
                        {filteredContacts.map(contact => (
                        <tr className="dataRow" key={contact._id} onClick={()=>editContact(contact)}>
                            <td className="favoritesColumn"><p>{contact.isFavourite
                            ? <Icon icon="ant-design:star-filled" color="#fff100" width="25" height="25"/>
                            : <Icon icon="ant-design:star-outlined" color="#e5e5e5" width="25" height="25" />
                            }</p></td>

                            <td className="nameColumn">{contact.contactInformation.name.firstName} {contact.contactInformation.name.lastName}</td>
                            <td className="companyColumn">{contact.contactInformation.company.name}</td>
                            <td className="interestsColumn"> </td>
                            <td className="tagsColumn"> </td>
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
                            <td className="catchupDateColumn">{contact.contactInformation.lastCatchup.date}</td>
                            <td className="locationColumn">{contact.contactInformation.location.country} {contact.contactInformation.location.city}</td>
                        </tr>
                        ))}
                        </tbody>
                    </table>  
                </div>
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
