import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { isUserLoggedIn } from '../Auth';
import axios from 'axios';

import { Icon } from '@iconify/react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Input, MenuItem, Checkbox, Select, ListItemText} from '@material-ui/core';

import Popup from '../Pages/Popup';
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
    const [open, setOpen] = useState(false);
    const [editPopUp,editIsVisible] = useState(false);
    const [addPopUp,addIsVisible] = useState(false);
    const [selectedContact,setSelectedContact] = useState({});
    const [contacts,setContact] = useState([]);
    const [countryName, setcountryName] = React.useState([]);
    const history = useHistory();

    const [formData, setFormData] = useState({});
    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    }

    useEffect (()=>{
        // if (isUserLoggedIn){
        //     getContacts()
        // }
    },[])

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = (value) => {
        setOpen(false);
        //setSelectedValue(value);
      };

    const getContacts=async () =>{
        const url = "api/get_contacts" + userId;
        console.log(userId)
        axios.get(url)
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

    const routeChange = (path) => {
        history.push(path);
    }

  return (
    <>
    <nav>
        <div style={{float: 'right'}}>
        <ProfileIcon />
        </div>
    </nav>
    {/* {editPopUp && <Popup userInfo={selectedContact}/>
    }
    {addPopUp && <Popup userInfo={selectedContact}/>
    } */}

    {/* {isUserLoggedIn && */}
    <div className="containerDash">
                
        <div className="actionsBar">
            <div>
              <form className="searchForm">
                <span><Icon icon="fe:search" height={20} width={20}/></span>
                <span><input className="dashSearch" type="text" name="search" placeholder="Search by name"></input></span>
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

            <button className="green smallButton" onClick={()=>addIsVisible(!addPopUp)}>
                <span> <Icon icon="gridicons:user-add" width={25} height={25}/> </span>
                <span> New contact</span>
            </button>
        </div>
        <table>
            <tr className="headerRow" >
                <th><h6></h6></th>
                <th><h6>Name</h6></th>
                <th><h6>Company</h6></th>
                <th><h6>Common interests</h6></th>
                <th className="tags"><h6>Tags</h6></th>
                <th className="socials"><h6>Socials</h6></th>
                <th><h6>Last catchup date</h6></th>
                <th><h6>Location</h6></th>
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

            </tr>
            ))}
            </table>  
    </div>
    {/* }
    {(!isUserLoggedIn)&&
    routeChange("/login")
    } */}
     </>
  );
}

export default Dashboard;
