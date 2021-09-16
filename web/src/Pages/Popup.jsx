import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Popup(props) {
    const {contact} = props.value;
    const [editPopUp,editIsVisible] = useState(false);
    const [addPopUp,addIsVisible] = useState(false);
    const [selectedContact,setSelectedContact] = useState({});
    const [contacts,setContact] = useState([]);
    const [countryName, setcountryName] = React.useState([]);
    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    }

    const handleSubmitEdit = async (event) => {
        console.log(contact._id);
        axios.post(`http://localhost:3001/api/update_contact/${contact._id}`, formData)
        .then (res=>{

            // And send the user to the home page
            addIsVisible(!addPopUp)
            //getContacts();
        })

    }
    

    function editContact(contact){
        setContact(contact);
        editIsVisible(!editPopUp);
    }


    function deleteContact(contact){
        setContact(contact);
        handleDelete();
    }

    const handleDelete = async (event) => {
        console.log(contact);
        //axios.post(`http://localhost:3001/api/delete_contact/${contact._id}/${userId}`, formData)
        
    }

    function closePopup() {
        editIsVisible(false);
        addIsVisible(false);
    }

        <div className="popup"> 
               <form onSubmit={handleSubmitEdit}>
                <button onClick={closePopup}>close popup</button><br/>
                <label for ="firstame">Firstname</label>
                <input type="text" name="firstname"  id="firstname" placeholder="Ben" defaultValue={contact.contactInformation.name.firstName} onChange={handleChange}/><br/>
                <label for ="lastname">Lastname</label>
                <input type="text" name="lastname"  id="lastname" placeholder="Doe" defaultValue={contact.contactInformation.name.lastName} onChange={handleChange}/><br/>
                <label for ="company">company</label>
                <input type="text" name="company" id="company"  placeholder="Ben" defaultValue={contact.contactInformation.company.name} onChange={handleChange}/><br/>
                <label for ="city">city</label>
                <input type="text" name="city"  id="city"placeholder="Ben" defaultValue={contact.contactInformation.location.city} onChange={handleChange}/><br/>
                <label for ="country">country</label>
                <input type="text" name="country"  id="country" placeholder="Ben" defaultValue={contact.contactInformation.location.country} onChange={handleChange}/><br/>
                <label for ="phone">phone</label>
                <input type="text" name="phone" id="phone" placeholder="Ben" defaultValue={contact.contactInformation.phone.number} onChange={handleChange}/><br/>
                <label for ="email">email</label>
                <input type="text" name="email" id="email" placeholder="Ben" defaultValue={contact.contactInformation.email.address} onChange={handleChange}/><br/>\
                <p>Socials</p>
                <label for ="facebook">facebook link</label>
                <input type="text" name="facebook" id="facebook" placeholder="Ben" defaultValue={contact.contactInformation.socials.facebook} onChange={handleChange}/><br/>
                <label for ="instagram">instagram link</label>
                <input type="text" name="instagram" id="instagram" placeholder="Ben" defaultValue={contact.contactInformation.socials.instagram} onChange={handleChange}/><br/>
                <label for ="linkedin">linkedin link</label>
                <input type="text" name="linkedin" id="linkedin" placeholder="Ben" defaultValue={contact.contactInformation.socials.linkedin} onChange={handleChange}/><br/>
                <label for ="date">last catchup</label>
                <input type="datetime-local" name="date" id="date" placeholder="Ben" defaultValue={contact.contactInformation.lastCatchup.date} onChange={handleChange}/><br/>
                {/* <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/>
                <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/> */}
                <label for ="notes">notes</label>
                <input type="text" name="notes" id="notes" placeholder="Ben" defaultValue={contact.contactInformation.notes.notes} onChange={handleChange}/><br/>
                <button type="submit" onSubmit={handleSubmitEdit}>submit</button>

                <div className="actions">
                    <button onClick={()=>editContact(contact)}>
                        <img src="edit.png" alt="edit"/> 
                    </button>
                    <button onClick={()=>deleteContact(contact)}>
                      <img src="bin.png" alt="bin"/>
                    </button>
                </div> 
            </form>
        </div>
}

export default Popup;
