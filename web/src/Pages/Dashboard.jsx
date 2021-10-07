import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { isUserLoggedIn } from '../Auth';
import axios from 'axios';

import { Icon } from '@iconify/react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Input, MenuItem, Checkbox, Select, ListItemText} from '@material-ui/core';

import UserIcon from '../components/UserIcon';
import ContactPage from './ContactPage';
import '../styles/tableStyles.scss';
import FilterDropdown from '../components/FilterDropdown';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  
  const countries = [
    'Australia',
    'China',
    'Malaysia',
    'New Zealand',
    'Singapore',
    'United States',
  ];
    

function Dashboard() {

    const history = useHistory();
    const [editPopUp,editIsVisible] = useState(false);
    const [openPage,addIsVisible] = useState(false);
    const [selectedContact,setSelectedContact] = useState({});
    const [contacts,setContact] = useState([]);
    const [userId,setUserId] = useState();

    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    }

    const getContacts=async () =>{
        const check = JSON.parse(localStorage.getItem('cToken'));
        axios.get(`http://localhost:3001/api/get_contacts/${check}`)
        .then(res => {    
                // And send the user to the home page
                setUserId(check);
                setContact(res.data)
            }
        )
    }

    const handleSubmitEdit = async (event) => {
        handleEmpty(selectedContact);
        axios.post(`http://localhost:3001/api/update_contact/${selectedContact._id}`, selectedContact)
        .then (res=>{

            // And send the user to the home page
            addIsVisible(!openPage)
            getContacts();
        })

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
        console.log(contact);
        console.log(formData);
        // alert(JSON.stringify(formData))

    }

    const handleSubmit = async (event) => {

        axios.post(`http://localhost:3001/api/add_contact/${userId}`, formData)
        .then (res=>{

            // And send the user to the home page
            addIsVisible(!openPage)
            getContacts();
        })
    }
        

    const handleDelete = async (id) => {
        console.log(selectedContact._id);

        axios.post(`http://localhost:3001/api/delete_contact/${id}/${userId}`)
        .then (res=>{

            // And send the user to the home page
            getContacts();
        })
    }

    function editContact(contact){
        setSelectedContact(contact);
        // setFormData(contact);
        editIsVisible(!editPopUp);
    }

    const routeChange = (path) => {
        history.push(path);
    }

    function closeContact() {
        editIsVisible(false);
        addIsVisible(false);
    }


    return (
        <>
        <nav>
            <div className="user-profile">
                <UserIcon />
            </div>
        </nav>
        <div className="page">
            {editPopUp && 
                <ContactPage handleSubmitEdit={handleSubmitEdit} selectedContact={selectedContact} closeContact={closeContact} handleChange={handleChange} handleDelete={handleDelete}/>
            }
            {openPage &&
                <ContactPage handleSubmitEdit={handleSubmitEdit} selectedContact={selectedContact} closeContact={closeContact} handleChange={handleChange} handleDelete={handleDelete}/>
            }
        
           {isUserLoggedIn() && 
           <div className="page-content">
                <div className="actions-bar">
                    <div className="search box">
                        <form>
                            <Icon icon="fe:search" height={20} width={20}/>
                            <input type="text" name="search" placeholder="Search by name"></input>
                        </form>
                    </div>

                    <FilterDropdown data={contacts} filterBy={countries}/>

                    <div style={{float: 'right'}}>
                        <button className="smallButton" onClick={()=>addIsVisible(!openPage)}>
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
                            <th><h6>Name</h6></th>
                            <th><h6>Company</h6></th>
                            <th><h6>Common interests</h6></th>
                            <th><h6>Tags</h6></th>
                            <th className="socialsColumn"><h6>Socials</h6></th>
                            <th><h6>Last catchup date</h6></th>
                            <th><h6>Location</h6></th>
                        </tr>
            
                        {/*change items to contact variable */}
                        {contacts.map(contact => (
                        <tr className="dataRow" key={contact._id} onClick={()=>editContact(contact)}>
                            <td className="favoritesColumn"><p>{contact.isFavourite
                            ? <Icon icon="ant-design:star-filled" color="#fff100" width="25" height="25"/>
                            : <Icon icon="ant-design:star-outlined" color="#e5e5e5" width="25" height="25" />
                            }</p></td>

                            <td>{contact.contactInformation.name.firstName} {contact.contactInformation.name.lastName}</td>
                            <td>{contact.contactInformation.company.name}</td>
                            <td>interests</td>
                            <td>tags</td>
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
                            <td>{contact.contactInformation.lastCatchup.date}</td>
                            <td>{contact.contactInformation.location.country},{contact.contactInformation.location.city}</td>
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
