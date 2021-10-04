import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { isUserLoggedIn } from '../Auth';
import axios from 'axios';

import { Icon } from '@iconify/react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Input, MenuItem, Checkbox, Select, ListItemText} from '@material-ui/core';

import ProfileIcon from '../components/ProfileIcon';
import ContactPage from './ContactPage';
import '../styles/tableStyles.scss';
import FilterDropdown from '../components/FilterDropdown';

import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

 


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
        console.log(JSON.stringify(formData))
        console.log(JSON.stringify(contact.contactInformation))

        console.log(formData.firstname != contact.contactInformation.name.firstName)
        console.log(formData.firstname);
        console.log(contact.contactInformation.name.firstName);


        if (formData.firstname){
            console.log("IN FIRST NAME");
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

    const history = useHistory();
    const routeChange = (path) => {
        history.push(path);
    }

    function closeContact() {
        editIsVisible(false);
        addIsVisible(false);
    }

    // contacts = getContacts().JSON;

    return (
        <>
        <nav>
            <div className="profileBlock">
                <ProfileIcon />
            </div>
        </nav>
        <div className="page">
            {editPopUp && 
                <ContactPage handleSubmitEdit={handleSubmitEdit} selectedContact={selectedContact} closeContact={closeContact} handleChange={handleChange}/>
            }
            {openPage &&
                <div className="popup">
                    <form onSubmit={handleSubmit}>
                     <button onClick={closeContact}>Back</button><br/>
                        <label htmlFor ="firstame">Firstname</label>
                        <input type="text" name="firstname"  id="firstname" placeholder="Ben" onChange={handleChange}/><br/>
                        <label htmlFor ="lastname">Lastname</label>
                        <input type="text" name="lastname"  id="lastname" placeholder="Doe" onChange={handleChange}/><br/>
                        <label htmlFor ="company">company</label>
                        <input type="text" name="company" id="company"  placeholder="Ben" onChange={handleChange}/><br/>
                        <label htmlFor ="city">city</label>
                        <input type="text" name="city"  id="city"placeholder="Ben" onChange={handleChange}/><br/>
                        <label htmlFor ="country">country</label>
                        <input type="text" name="country"  id="country" placeholder="Ben" onChange={handleChange}/><br/>
                        <label htmlFor ="phone">phone</label>
                        <input type="text" name="phone" id="phone" placeholder="Ben" onChange={handleChange}/><br/>
                        <label htmlFor ="email">email</label>
                        <input type="text" name="email" id="email" placeholder="Ben" onChange={handleChange}/><br/>\
                        <p>Socials</p>
                        <label htmlFor ="facebook">facebook link</label>
                        <input type="text" name="facebook" id="facebook" placeholder="Ben" onChange={handleChange}/><br/>
                        <label htmlFor ="instagram">instagram link</label>
                        <input type="text" name="instagram" id="instagram" placeholder="Ben" onChange={handleChange}/><br/>
                        <label htmlFor ="linkedin">linkedin link</label>
                        <input type="text" name="linkedin" id="linkedin" placeholder="Ben" onChange={handleChange}/><br/>
                           {/* broken for now */}            
                        {/* <label htmlFor ="date">last catchup</label>
                        <input type="datetime-local" name="date" id="date" placeholder="Ben" onChange={handleChange}/><br/> */}
                        {/* <label for =""></label>
                        <input type="text" name="" placeholder="Ben"/><br/>
                        <label for =""></label>
                        <input type="text" name="" placeholder="Ben"/><br/> */}
                        <label htmlFor ="notes">notes</label>
                        <input type="text" name="notes" id="notes" placeholder="Ben" onChange={handleChange}/><br/>
                        <button type="submit" onSubmit={handleSubmit}>submit</button>
                    </form>
                </div>
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
                    <FilterDropdown/>

                    <div style={{float: 'right'}}>
                        <button className="smallButton" onClick={()=>addIsVisible(!openPage)}>
                            <span> <Icon icon="gridicons:user-add" width={25} height={25}/> </span>
                            <span> New contact</span>
                        </button>
                    </div>
                </div>

                
                <div  className="headerRow" >
                <AgGridReact rowData={contacts}>
                    <AgGridColumn headerName="Name" field="name" sortable={true}></AgGridColumn>
                    <AgGridColumn headerName="Company" field = "company" sortable={true}></AgGridColumn>
                    <AgGridColumn headerName="Common Interests" field = "commonInterests"></AgGridColumn>
                    <AgGridColumn headerName="Tags" field =  "tags"></AgGridColumn>
                    <AgGridColumn headerName="Socials" field = "socials" ></AgGridColumn>
                    <AgGridColumn headerName="Last Catchup Date" field = "lastCatchup" sortable={true}></AgGridColumn>
                    <AgGridColumn headerName="Location" field="location" sortable={true}></AgGridColumn>
                    <AgGridColumn headerName="Actions"></AgGridColumn>
                    
                </AgGridReact>
                   
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
