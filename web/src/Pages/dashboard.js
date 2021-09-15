import React,{useState,useEffect} from 'react';
import { items } from '../data';
import { useHistory } from 'react-router-dom';
import { isUserLoggedIn } from '../Auth';
import axios from 'axios';

import { Icon } from '@iconify/react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Input, MenuItem, Checkbox, Select, ListItemText} from '@material-ui/core';

import ProfileIcon from '../Components/ProfileIcon';

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
    

function Dashboard({userId}) {
    const classes = useStyles();
    const [editPopUp,editIsVisible] = useState(false);
    const [addPopUp,addIsVisible] = useState(false);
    const [selectedContact,setSelectedContact] = useState({});
    const [contacts,setContact] = useState([]);
    const [countryName, setcountryName] = React.useState([]);

    const [formData, setFormData] = useState({});
    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    }


    useEffect (()=>{
        if (isUserLoggedIn){
            getContacts()
        }
    },[])

    const getContacts=async () =>{
        console.log(userId)
        axios.get(`http://localhost:3001/api/get_contacts/${userId}`)
        .then(res => {    
                // And send the user to the home page
                console.log(res)
                setContact(res.data)
        }
        )
    }




    const handleSubmit = async (event) => {
        console.log("IN HANDLE SUBMIT");
        axios.post(`http://localhost:3001/api/add_contact/${userId}`, formData)
        .then (res=>{

            // And send the user to the home page
            addIsVisible(!addPopUp)
            getContacts();
        })

        
    }
    const handleSubmitEdit = async (event) => {
        console.log(selectedContact._id);
        axios.post(`http://localhost:3001/api/update_contact/${selectedContact._id}`, formData)
        .then (res=>{

            // And send the user to the home page
            addIsVisible(!addPopUp)
            getContacts();
        })

    }

    const handleDelete = async (event) => {
        console.log(selectedContact);
        axios.post(`http://localhost:3001/api/delete_contact/${selectedContact._id}/${userId}`, formData)
        
    }


    function editContact(contact){
        setSelectedContact(contact);
        editIsVisible(!editPopUp);
    }


    function deleteContact(contact){
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
    <div>
      <ProfileIcon />
        {/* <a href="/login">
            <img src="avatar.png" width="50px"alt="avatar"/>
        </a> */}
    </div>

</nav>
    {editPopUp && 
        <div className="popup"> 
               <form onSubmit={handleSubmitEdit}>
                <button onClick={closePopup}>close popup</button><br/>
                <label for ="firstame">Firstname</label>
                <input type="text" name="firstname"  id="firstname" placeholder="Ben" defaultValue={selectedContact.contactInformation.name.firstName} onChange={handleChange}/><br/>
                <label for ="lastname">Lastname</label>
                <input type="text" name="lastname"  id="lastname" placeholder="Doe" defaultValue={selectedContact.contactInformation.name.lastName} onChange={handleChange}/><br/>
                <label for ="company">company</label>
                <input type="text" name="company" id="company"  placeholder="Ben" defaultValue={selectedContact.contactInformation.company.name} onChange={handleChange}/><br/>
                <label for ="city">city</label>
                <input type="text" name="city"  id="city"placeholder="Ben" defaultValue={selectedContact.contactInformation.location.city} onChange={handleChange}/><br/>
                <label for ="country">country</label>
                <input type="text" name="country"  id="country" placeholder="Ben" defaultValue={selectedContact.contactInformation.location.country} onChange={handleChange}/><br/>
                <label for ="phone">phone</label>
                <input type="text" name="phone" id="phone" placeholder="Ben" defaultValue={selectedContact.contactInformation.phone.number} onChange={handleChange}/><br/>
                <label for ="email">email</label>
                <input type="text" name="email" id="email" placeholder="Ben" defaultValue={selectedContact.contactInformation.email.address} onChange={handleChange}/><br/>\
                <p>Socials</p>
                <label for ="facebook">facebook link</label>
                <input type="text" name="facebook" id="facebook" placeholder="Ben" defaultValue={selectedContact.contactInformation.socials.facebook} onChange={handleChange}/><br/>
                <label for ="instagram">instagram link</label>
                <input type="text" name="instagram" id="instagram" placeholder="Ben" defaultValue={selectedContact.contactInformation.socials.instagram} onChange={handleChange}/><br/>
                <label for ="linkedin">linkedin link</label>
                <input type="text" name="linkedin" id="linkedin" placeholder="Ben" defaultValue={selectedContact.contactInformation.socials.linkedin} onChange={handleChange}/><br/>
                <label for ="date">last catchup</label>
                <input type="datetime-local" name="date" id="date" placeholder="Ben" defaultValue={selectedContact.contactInformation.lastCatchup.date} onChange={handleChange}/><br/>
                {/* <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/>
                <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/> */}
                <label for ="notes">notes</label>
                <input type="text" name="notes" id="notes" placeholder="Ben" defaultValue={selectedContact.contactInformation.notes.notes} onChange={handleChange}/><br/>
                <button type="submit" onSubmit={handleSubmitEdit}>submit</button>
            </form>
        </div>
    }
    {addPopUp &&
        <div className="popup">
             <form onSubmit={handleSubmit}>
             <button onClick={closePopup}>close popup</button><br/>
                <label for ="firstame">Firstname</label>
                <input type="text" name="firstname"  id="firstname" placeholder="Ben" onChange={handleChange}/><br/>
                <label for ="lastname">Lastname</label>
                <input type="text" name="lastname"  id="lastname" placeholder="Doe" onChange={handleChange}/><br/>
                <label for ="company">company</label>
                <input type="text" name="company" id="company"  placeholder="Ben" onChange={handleChange}/><br/>
                <label for ="city">city</label>
                <input type="text" name="city"  id="city"placeholder="Ben" onChange={handleChange}/><br/>
                <label for ="country">country</label>
                <input type="text" name="country"  id="country" placeholder="Ben" onChange={handleChange}/><br/>
                <label for ="phone">phone</label>
                <input type="text" name="phone" id="phone" placeholder="Ben" onChange={handleChange}/><br/>
                <label for ="email">email</label>
                <input type="text" name="email" id="email" placeholder="Ben" onChange={handleChange}/><br/>\
                <p>Socials</p>
                <label for ="facebook">facebook link</label>
                <input type="text" name="facebook" id="facebook" placeholder="Ben" onChange={handleChange}/><br/>
                <label for ="instagram">instagram link</label>
                <input type="text" name="instagram" id="instagram" placeholder="Ben" onChange={handleChange}/><br/>
                <label for ="linkedin">linkedin link</label>
                <input type="text" name="linkedin" id="linkedin" placeholder="Ben" onChange={handleChange}/><br/>
                <label for ="date">last catchup</label>
                <input type="datetime-local" name="date" id="date" placeholder="Ben" onChange={handleChange}/><br/>
                {/* <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/>
                <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/> */}
                <label for ="notes">notes</label>
                <input type="text" name="notes" id="notes" placeholder="Ben" onChange={handleChange}/><br/>
                <button type="submit" onSubmit={handleSubmit}>submit</button>
            </form>
        </div>
    }

   {isUserLoggedIn &&  <div className="containerDash">
                
        <div className="actionsBar">
            <div className="searchContainer">
              <form>
                <Icon icon="fe:search" height={20} width={20}/>
                <input className="dashSearch" type="text" name="search" placeholder="Search by name"></input>
              </form>
            </div>

            <div className="filterContainer">
              <FormControl className={classes.formControl}>
                <Select
                  multiple
                  value={countryName}
                  onChange={handleChange}
                  input={<Input />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {countries.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={countryName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* <form className="filterForm"> 
                <select id="filter" name="filter">
                    <option value="" disabled selected>Filter by country </option>
                    <option value="australia">Australia</option>
                    <option value="newzealand">New Zealand</option>
                </select>
              </form> */}
            </div>

            <button className="newContactButton" onClick={()=>addIsVisible(!addPopUp)}>
                <Icon icon="gridicons:user-add" width={25} height={25}/>
                <span> New contact</span>
            </button>
        </div>
        <table>
            <tr className="headerRow" >
                <th><h6></h6></th>
                <th><h6>Name</h6></th>
                <th><h6>Company</h6></th>
                <th><h6>Location</h6></th>
                <th><h6>Phone</h6></th>
                <th className="email"><h6>Email</h6></th>
                <th className="socials"><h6>Socials</h6></th>
                <th><h6>Last catchup date</h6></th>
                <th><h6>Common interests</h6></th>
                <th className="tags"><h6>Tags</h6></th>
                <th><h6>Notes</h6></th>
                <th><h6>Actions</h6></th>
            </tr>

            {/*change items to contact variable */}
            {contacts.map(contact => (
            <tr>
                <td><p>{contact.isFavourite
                  ? <Icon icon="ant-design:star-filled" color="#fff100" width="30" height="30"/>
                  : <Icon icon="ant-design:star-outlined" color="#e5e5e5" width="30" height="30" />
                }</p></td>
                <td>{contact.contactInformation.name.firstName}{contact.contactInformation.name.lastName}</td>
                <td>{contact.contactInformation.company.name}</td>
                <td>{contact.contactInformation.location.country},{contact.contactInformation.location.city}</td>
                <td>{contact.contactInformation.phone.number}</td>
                <td>{contact.contactInformation.email.address}</td>
                <td>{contact.contactInformation.socials.facebook && 
                    <a style={{color:"white"}} href={`${contact.contactInformation.socials.facebook}`}>
                        <Icon icon="logos:facebook" width="25" height="25" />
                        </a>
                    }
                    {contact.contactInformation.socials.linkedin && 
                    <a style={{color:"white"}} href={`${contact.contactInformation.socials.linkedin}`}>
                        <img src="linkedin-icon.svg" width="25" height="25" alt="linkedin"/>
                    </a>}
                    {contact.contactInformation.socials.instagram && 
                    <a style={{color:"white"}} href={`${contact.contactInformation.socials.instagram}`}>
                        <img src="instagram-icon.png" width="25" height="25" alt="instagram"/>
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
                ))}</p></td>
                <td className="tags"><p>{contact.tags.map(tag=>(
                    <span>{tag}</span>
                ))}</p></td>
                <td><p>Write notes here</p></td>
                <td className="actions">
                  <p>
                    <Icon icon="bx:bx-edit" color="#e5e5e5" width="30" height="30" />
                    <Icon icon="ic:baseline-delete-outline" color="#e5e5e5" width="30" height="30" />
                  </p>
                </td>
                ))}</td>*/}
                <td className="actions">
                    <div onClick={()=>editContact(contact)}>
                        <img src="edit.png" alt="edit"/> 
                    </div>
                    <div onClick={()=>deleteContact(contact)}>
                      <img src="bin.png" alt="bin"/>
                    </div>
                </td> 
            </tr>
            ))}
            </table>  

    </div>
    }
    {(!isUserLoggedIn)&&
    routeChange("/login")
    }
     </>
  );
}

export default Dashboard;
