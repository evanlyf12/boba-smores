import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { isUserLoggedIn } from '../Auth';
import axios from 'axios';
import {GetSortOrderCom,
    GetSortOrderComRev,
    GetSortOrderCountry,
    GetSortOrderCountryRev,
    GetSortOrderName,
    GetSortOrderNameRev,
    GetSortFav,
    GetSortFavRev,} from '../components/sort.js'
import { Icon } from '@iconify/react';
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
    const [isFavourite,setisFavourite] = useState({});

    const [formData, setFormData] = useState({});

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


    function clickFavourite(bool,contact){

        try {
            setisFavourite({...isFavourite, isFavourite: bool});
            setSelectedContact(contact)
          }
          catch (e) {
              console.log(e)
          }
          finally {
              console.log("faf")
            setFavourite()
          }
    }

    const setFavourite = async () => {
        console.log(selectedContact)
        console.log(isFavourite)
        if (selectedContact._id){
        await axios.post(`http://localhost:3001/api/set_favourite/${selectedContact._id}`,isFavourite)
            .then(res => {
                // And send the user to the home page
                console.log("ello")
                getContacts()
                }
            )
        }
    }
    

    useEffect (()=>{
        if (isUserLoggedIn){
            getContacts()
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
        formData.dateTime=new Date().toLocaleString('en-US');
        axios.post(`http://localhost:3001/api/add_contact/${userId}`, formData)
        .then (res=>{

            // And send the user to the home page
            addIsVisible(!addMode)
            getContacts();
        })
    }
    
    const handleEdit = async (event) => {
        selectedContact.history.lastModified=new Date().toLocaleString('en-US');
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

    function reformatDate(inputDate) {

        const date = new Date(inputDate)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (day === "NaN" | month === "NaN" | year === "NaN") {
            return ""
        }
        
        // add a leading 0 if the number is less than 10. like 9 to 09
        day < 10 && (day = `0${day}`)
        month < 10 && (month = `0${month}`)
    
        const newFormatDate = `${day}-${month}-${year}`
    
        return newFormatDate
    }

    // non case sensitive contacts search
    const filterContacts = (contacts, queryN, queryC) => {
        if (!queryN&&!queryC) {
            return contacts;
        }
        if (queryN&&!queryC) {
            return searchByName(contacts, queryN);
        }
        var countryFiltered = filterByCountry(contacts,queryC)

        // return search and filtered contacts
        return searchByName(countryFiltered, queryN)
    };

    function searchByName(contacts, query) {
        return contacts.filter((contact) => {
            return contact.contactInformation.name.firstName.toLowerCase().includes(query.toLowerCase());
        })
    }


    function filterByCountry(contacts, query) {
        return contacts.filter((contact) => {
            return query.includes(contact.contactInformation.location.country);
        })
    }

        
    const { search } = window.location;
    const { filter } = window.location;
    const sQuery = new URLSearchParams(search).get('search');
    const fQuery = new URLSearchParams(filter).get('filter');
    const [searchQuery, setSearchQuery] = useState(sQuery || '');
    const [filterQuery, setFilterQuery] = useState(fQuery || '');
    const [nameSort, setNameSort] = useState(false);
    const [favSort, setFavSort] = useState(true);
    const [conSort, setConSort] = useState(false);
    const [compSort, setCompSort] = useState(false);
    const [initial, setInitial] = useState(true);

    var filteredContacts = initial ? filterContacts(contacts,searchQuery, filterQuery).sort(GetSortFav("isFavourite")) : filterContacts(contacts,searchQuery, filterQuery) ;

    //const [filteredContacts, setFilteredContacts] = useState(fc);

    function sortByName(){
        setInitial(false)
        if (nameSort){
             filteredContacts = filterContacts(contacts,searchQuery, filterQuery).sort(GetSortOrderName())
        } else {
            filteredContacts = filterContacts(contacts,searchQuery, filterQuery).sort(GetSortOrderNameRev());
        }
        setNameSort(!nameSort)
    }

    function sortByFav(){
        setInitial(false)
        if (favSort){
             filteredContacts = filterContacts(contacts,searchQuery, filterQuery).sort(GetSortFav("isFavourite"))
        } else {
            filteredContacts = filterContacts(contacts,searchQuery, filterQuery).sort(GetSortFavRev("isFavourite"));
        }
        setFavSort(!favSort)
    }

    function sortByCon(){
        setInitial(false)
        if (conSort){
             filteredContacts = filterContacts(contacts,searchQuery, filterQuery).sort(GetSortOrderCountry("isFavourite"))
        } else {
            filteredContacts = filterContacts(contacts,searchQuery, filterQuery).sort(GetSortOrderCountryRev("isFavourite"));
        }
        setConSort(!conSort)
    }

    function sortByCom(){
        setInitial(false)
        if (compSort){
             filteredContacts = filterContacts(contacts,searchQuery, filterQuery).sort(GetSortOrderCom("isFavourite"))
        } else {
            filteredContacts = filterContacts(contacts,searchQuery, filterQuery).sort(GetSortOrderComRev("isFavourite"));
        }
        setCompSort(!compSort)
    }

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
                    <FilterDropdown contacts={contacts} setFilterQuery={setFilterQuery} />
                    </motion.div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

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
                            transition={{ duration: 0.4, delay: 0 }}
                            >
                        <tr className="headerRow"
                        >
                            <th className="favoritesColumn sortable"><h6 onClick={()=>sortByFav()}> Fav <Icon icon="ant-design:swap-outlined" /></h6></th>
                            <th  className="sortable"><h6 onClick={()=>sortByName()}>Name <Icon icon="ant-design:swap-outlined" /></h6></th>
                            <th className="sortable"><h6 onClick={()=>sortByCom()}>Company <Icon icon="ant-design:swap-outlined" /></h6></th>
                            <th className="sortable"><h6 onClick={()=>sortByCon()}>Location <Icon icon="ant-design:swap-outlined" /></h6></th>
                            <th className="socialsColumn"><h6>Socials</h6></th>

                            <th><h6>Tags</h6></th>
                            <th><h6>Last catchup date</h6></th>
                        </tr>
                {console.log(filteredContacts)}
                        {filteredContacts.map(contact => (
                            
                        <tr className="dataRow" key={contact._id}>
                            <td className="favoritesColumn" onClick={()=>clickFavourite(!contact.isFavourite,contact)}><p>{contact.isFavourite
                            ? <Icon icon="ant-design:star-filled" color="#fff100" width="25" height="25"/>
                            : <Icon icon="ant-design:star-outlined" color="#e5e5e5" width="25" height="25" />
                            }</p></td>

                            <td  onClick={()=>editContact(contact)}>{contact.contactInformation.name.firstName} {contact.contactInformation.name.lastName}</td>
                            <td  onClick={()=>editContact(contact)}>{contact.contactInformation.company.name}</td>
                            <td  onClick={()=>editContact(contact)}>{contact.contactInformation.location.country},&nbsp;{contact.contactInformation.location.city}</td>
                            <td className="socialsColumn">
                                {contact.contactInformation.socials.facebook && 
                                <a style={{color:"white"}} target="_blank" rel="noreferrer" href={`${contact.contactInformation.socials.facebook}`}>
                                    <Icon icon="logos:facebook" width="25" height="25" />
                                    </a>
                                }
                                {contact.contactInformation.socials.linkedin && 
                                <a style={{color:"white"}} target="_blank" rel="noreferrer" href={`${contact.contactInformation.socials.linkedin}`}>
                                    &nbsp;<img src="linkedin-icon.svg" width="25" height="25" alt="linkedin"/>
                                </a>}
                                {contact.contactInformation.socials.instagram && 
                                <a style={{color:"white"}} target="_blank" rel="noreferrer" href={`${contact.contactInformation.socials.instagram}`}>
                                    &nbsp;<img src="instagram-icon.png" width="25" height="25" alt="instagram"/>
                                </a>}

                            </td>
                            {/* <td>{contact.contactInformation.tags.tags.map(tag => (<div className="tagRound" style={{background:`${tag.colour}`}}><p>{tag.text}</p></div>))} */}
                            <td  onClick={()=>editContact(contact)}>{contact.contactInformation.tags.tags.map(tag => (
                            <div className="tagRound" style={{background:`${tag.colour}`}}>{ brightness(`${tag.colour}`)
                            ? <p style = {{color: "black"}}>{tag.text}</p>
                            : <p style = {{color: "white"}}>{tag.text}</p>
                            }</div>))}</td>
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
        
function brightness(colour)
{
    var avgValue = Math.sqrt((parseInt(Number ('0x' + colour.substring(1, 3)), 10) * parseInt(Number ('0x' + colour.substring(1, 3)), 10) * 0.241) +
    (parseInt(Number ('0x' + colour.substring(3, 5)), 10) * parseInt(Number ('0x' + colour.substring(3, 5)), 10) * 0.691) +
    (parseInt(Number ('0x' + colour.substring(5, 7)), 10) * parseInt(Number ('0x' + colour.substring(5, 7)), 10) * 0.068))
    return avgValue > 130
}        
export default Dashboard;
