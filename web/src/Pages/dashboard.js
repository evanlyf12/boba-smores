import React,{useState,useEffect} from 'react';
import { items } from '../data';
import { useHistory } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { isUserLoggedIn } from '../Auth';
import axios from 'axios';
import EditForm from './editform';
function Dashboard() {
    const [editPopUp,editIsVisible] = useState(false);
    const [addPopUp,addIsVisible] = useState(false);
    const [selectedContact,setSelectedContact] = useState({});
    const [contacts,setContact] = useState([]);
  const [userId,setUserId] = useState();

    const [formData, setFormData] = useState({});
    const handleChange = (event,def) => {
        // if (event.target.value===""){
        //     console.log("empty")
        //     event.target.value=def;
        //     setFormData({...formData, [event.target.id]: event.target.value});
        // } else {
            setFormData({...formData, [event.target.id]: event.target.value});
        // }
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
    useEffect (()=>{
       if (isUserLoggedIn()){
            getContacts()
        }
        },[])


    // function  handleEmpty(contact){
    //     alert(formData)

    //     if (!formData.firstName || formData.firstName===""){
    //         formData.firstName = contact.contactInformation.name.firstName
    //     }
    //     if (!formData.lastName || formData.lastName===""){
    //         formData.company.name = contact.contactInformation.name.lastName
    //     }
    //     if (!formData.name || formData.name===""){
    //         formData.name=contact.contactInformation.company.name
    //     }
    //     if (!formData.city || formData.city===""){
    //         formData.city=contact.contactInformation.location.city
    //     }
    //     if (!formData.phone || formData.phone===""){
    //         formData.phone=contact.contactInformation.location.city
    //     }
    //     if (!formData.location.phone.number || formData.location.phone.number===""){
    //         formData.location.phone.number=contact.contactInformation.location.phone.number
    //     }
    //     if (!formData.city || formData.city===""){
    //         formData.city=contact.contactInformation.location.city
    //     }
    //     if (!formData.city || formData.city===""){
    //         formData.city=contact.contactInformation.location.city
    //     }
    //     if (!formData.city || formData.city===""){
    //         formData.city=contact.contactInformation.location.city
    //     }
    //     if (!formData.facebook || formData.facebook===""){
    //         formData.facebook=contact.contactInformation.socials.facebook
    //     }
    //     if (!formData.instagram || formData.instagram===""){
    //         formData.instagram=contact.contactInformation.socials.instagram
    //     }
    //     if (!formData.linkedin || formData.linkedin===""){
    //         formData.linkedin=contact.contactInformation.socials.linkedin
    //     }
    //     if (!formData.date || formData.date===""){
    //         formData.date=contact.contactInformation.lastCatchup
    //     }
    //     if (!formData.notes || formData.notes===""){
    //         formData.notes=contact.contactInformation.notes
    //     }
    //     console.log(formData)
      


    const handleSubmit = async (event) => {

        axios.post(`http://localhost:3001/api/add_contact/${userId}`, formData)
        .then (res=>{

            // And send the user to the home page
            addIsVisible(!addPopUp)
            getContacts();
        })
    }
        
    const handleSubmitEdit = async (event) => {
        // handleEmpty(selectedContact);
        console.log(selectedContact._id);
        // console.log(JSON.parse(formData))

        axios.post(`http://localhost:3001/api/update_contact/${selectedContact._id}`, formData)
        .then (res=>{

            // And send the user to the home page
            addIsVisible(!addPopUp)
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


    // function deleteContact(contact){
    //     setSelectedContact(contact);
    //     handleDelete(contact._id);
    // }

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
            <EditForm handleSubmitEdit={handleSubmitEdit} selectedContact={selectedContact} closePopup={closePopup} handleChange={handleChange}/>
        </div>
    }
    {addPopUp &&
        <div className="popup">
             <form onSubmit={handleSubmit}>
             <button onClick={closePopup}>close popup</button><br/>
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
                <label htmlFor ="date">last catchup</label>
                <input type="datetime-local" name="date" id="date" placeholder="Ben" onChange={handleChange}/><br/>
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

   {isUserLoggedIn() &&  <div className="containerDash">
        
   
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
                <select id="filter"name="filter">
                    <option defaultValue="" disabled>Filter by country </option>
                    <option defaultValue="australia">Australia</option>
                    <option defaultValue="newzealand">New Zealand</option>
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
        <tbody>
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
            <tr key={contact._id}>
                <td>{contact.isFavourite && <span>⭐</span>}</td>
                <td>{contact.contactInformation.name.firstName}{contact.contactInformation.name.lastName}</td>
                <td>{contact.contactInformation.company.name}</td>
                <td>{contact.contactInformation.location.country},{contact.contactInformation.location.city}</td>
                <td>{contact.contactInformation.phone.number}</td>
                <td>{contact.contactInformation.email.address}</td>
                <td>{contact.contactInformation.socials.facebook && 
                    <a style={{color:"white"}} href={`${contact.contactInformation.socials.facebook}`}>
                        <FacebookIcon />
                        </a>
                    }
                    {contact.contactInformation.socials.instagram && 
                    <a style={{color:"white"}} href={`${contact.contactInformation.socials.instagram}`}>
                        <InstagramIcon />
                        </a>}
                    {contact.contactInformation.socials.linkedin && 
                        <a style={{color:"white"}} href={`${contact.contactInformation.socials.linkedin}`}>
                            <LinkedInIcon />
                        </a>}
                </td>
                <td></td>
                <td>{contact.contactInformation.lastCatchup.date}</td>
                <td>{contact.contactInformation.notes.notes}</td>
                <td></td>

                <td className="actions">
                    <div onClick={()=>editContact(contact)}>
                        <img src="edit.png" alt="edit"/> 
                    </div>
                    <div onClick={()=>handleDelete(contact._id)}>
                      <img src="bin.png" alt="bin"/>
                    </div>
                </td> 
            </tr>
            ))}
             </tbody>
            </table>  

    </div>
    }
    {(!isUserLoggedIn())&&
    routeChange("/login")
    }
     </>
  );
}


export default Dashboard;
