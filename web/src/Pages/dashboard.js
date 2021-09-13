import React,{useState,useEffect} from 'react';
import { items } from '../data';
import { useHistory } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { isUserLoggedIn } from '../Auth';
import axios from 'axios';
function Dashboard() {
    const [editPopUp,editIsVisible] = useState(false);
    const [addPopUp,addIsVisible] = useState(false);
    const [userId,setUserId] = useState("");
    const [selectedContact,setSelectedContact] = useState({});
    const [contacts,setContact] = useState([]);



    const [formData, setFormData] = useState({});
    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    }


    useEffect (()=>{
        if (localStorage.getItem('cToken')){
            const check = JSON.parse(localStorage.getItem('cToken'));
            setUserId(check._id);
        }
        getContacts()
    },[])

    const getContacts = async (event) => {
        event.preventDefault();
        // submit to the DB
        try {
            // Prevent the default reloading of page
            event.preventDefault();

            const res = await axios.get(`https://obscure-island-62916.herokuapp.com/api/get_contact/${userId}`, formData);
            
            if (res !== undefined){
                // And send the user to the home page
                setContact(res.data)
                addIsVisible(!addPopUp)
            }
        }
        catch (error) {
        }
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        // submit to the DB
        try {
            // Prevent the default reloading of page
            event.preventDefault();

            const res = await axios.post(`https://obscure-island-62916.herokuapp.com/api/add_contact/${userId}`, formData);
            
            if (res !== undefined){
                // And send the user to the home page
                addIsVisible(!addPopUp)
                getContacts();
            }
        }
        catch (error) {
        }
    }

    if (isUserLoggedIn){
        console.log("mofoo")
    }
    function editContact(contact){
        setSelectedContact(contact);
        editIsVisible(!editPopUp);
    }
    console.log(isUserLoggedIn);
    if (isUserLoggedIn) {
        var token = localStorage.getItem("cToken");
        console.log(JSON.parse(token));
        // var contacts = token.contacts;
        // var userId = token._id;
    
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
        <img src="avatar.png" width="50px"alt="avatar"/>
    </a>
    <div><p className="avatarHeader"> Lewis</p></div>
</div>

</nav>
    {editPopUp && 
        <div className="popup"> 
        <button onClick={closePopup}>close popup</button><br/>
               <form onSubmit={handleSubmit}>
                <label for ="firstame">Firstname</label>
                <input type="text" name="firstname"  id="firstname" placeholder="Ben" value={selectedContact.name.firstName} onChange={handleChange}/><br/>
                <label for ="lastname">Lastname</label>
                <input type="text" name="lastname"  id="lastname" placeholder="Doe" value={selectedContact.name.lastName} onChange={handleChange}/><br/>
                <label for ="company">company</label>
                <input type="text" name="company" id="company"  placeholder="Ben" value={selectedContact.company.name} onChange={handleChange}/><br/>
                <label for ="city">city</label>
                <input type="text" name="city"  id="city"placeholder="Ben" value={selectedContact.location.city} onChange={handleChange}/><br/>
                <label for ="country">country</label>
                <input type="text" name="country"  id="country" placeholder="Ben" value={selectedContact.location.country} onChange={handleChange}/><br/>
                <label for ="phone">phone</label>
                <input type="text" name="phone" id="phone" placeholder="Ben" value={selectedContact.phone.number} onChange={handleChange}/><br/>
                <label for ="email">email</label>
                <input type="text" name="email" id="email" placeholder="Ben" value={selectedContact.email.address} onChange={handleChange}/><br/>\
                <p>Socials</p>
                <label for ="facebook">facebook link</label>
                <input type="text" name="facebook" id="facebook" placeholder="Ben" value={selectedContact.socials.facebook} onChange={handleChange}/><br/>
                <label for ="instagram">instagram link</label>
                <input type="text" name="instagram" id="instagram" placeholder="Ben" value={selectedContact.socials.instagram} onChange={handleChange}/><br/>
                <label for ="linkedin">linkedin link</label>
                <input type="text" name="linkedin" id="linkedin" placeholder="Ben" value={selectedContact.socials.linkedin} onChange={handleChange}/><br/>
                <label for ="date">last catchup</label>
                <input type="datetime-local" name="date" id="date" placeholder="Ben" value={selectedContact.lastCatchup.date} onChange={handleChange}/><br/>
                {/* <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/>
                <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/> */}
                <label for ="notes">notes</label>
                <input type="text" name="notes" id="notes" placeholder="Ben" value={selectedContact.notes.notes} onChange={handleChange}/><br/>
                <button type="submit" onSubmit={handleSubmit}>submit</button>
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
        
   
        <div className="menuBar">
            <div className="search">
                <form> 
                    <button type="submit">
                        <img src="search.png" alt="search"/>
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
            <button className="newContact"  onClick={()=>addIsVisible(!addPopUp)}>
                <img src="group.png" alt="group"/>
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
            {items.map(contact => (
            <tr>
                <td>{contact.favourite && <span>⭐</span>}</td>
                <td>{contact.name}</td>
                <td>{contact.company}</td>
                <td>{contact.location},{contact.country}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>{contact.socials.facebook && <a href={`${contact.socials.facebookLink}`}><FacebookIcon/></a>}
                {contact.socials.instagram && <a href={`${contact.socials.instagramLink}`}><InstagramIcon/></a>}
                {contact.socials.linkedin && <a href={`${contact.socials.linkedinLink}`}><LinkedInIcon/></a>}</td>
                <td>{contact.commonInterests.map(interest=>(
                    <span>{interest}</span>
                ))}</td>
                <td>{contact.tags.map(tag=>(
                    <span>{tag}</span>
                ))}</td>
                <td className="actions">
                    <div onClick={()=>editContact(contact)}>
                        <img src="edit.png" alt="edit"/> 
                    </div>
                <img src="bin.png" alt="bin"/></td>
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
