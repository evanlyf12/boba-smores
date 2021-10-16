import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import ContactPhoto from '../components/ContactPhoto';
import AlertDialog from '../components/AlertDialog';
import '../styles/contactStyles.scss';
import axios from 'axios';
import {SwatchesPicker,SketchPicker,CirclePicker} from 'react-color'

const backgroundStyle = {
    position: 'fixed',
    backgroundColor: '#0D0D0D',
    height: '100vh',
    width: '100vw',
    top: 0,
    left: 0,
    zIndex: 1 // make this on top of everything
}
const popStyle = {
    position: 'fixed',
    backgroundColor: '#0D0D0D',
    height: '100vh',
    width: '100vw',
    textAlign:'center',

    top: 0,
    left: 0,
    zIndex: 3 // make this on top of everything
}
const ContactPage = ({selectedContact, handleEdit, handleClose, handleChange, handleDelete, userId}) => {
    
    const [tagMode,tagIsVisible] = useState(false);
    const [tagData, setTag] = useState({});
    const [tag,setTags] = useState();

    const [tagId,setTagId] = useState();

    const handleTag = (event) => {
        setTag({...tagData, [event.target.id]: event.target.value});
    }

    useEffect(()=>{
        getTags()
    },[])


    const getTags = async () => {
        await axios.get(`http://localhost:3001/api/get_tags/${(JSON.parse(localStorage.getItem('cToken')))}`)
            .then(res => {
                // And send the user to the home page
                console.log(res.data)
                setTags(res.data)
            }
            )
    }
    const handleCreateTag = async (event) => {
        alert("IN HANDLE SUBMIT");
        axios.post(`http://localhost:3001/api/create_tag/${(JSON.parse(localStorage.getItem('cToken')))}/${selectedContact._id}`, tagData)
            .then(res => {

                // And send the user to the home page
                console.log(res)
                getTags();
                handlePopClose()

            })
            //tag data ->  body: text, colour, isComInterest
    }

    function handleDeleteTag (tagId){
        setTagId(tagId)
        handleRemoveTag()
        
    }
    const handleTagDelete = async (event) => {
        console.log("IN HANDLE SUBMIT");
        axios.post(`http://localhost:3001/api/delete_tag/${userId}/${tagId}`)
            .then(res => {

                // And send the user to the home page
                getTags();
            })
    }



    const handleAddTag = async (event) => {
        console.log("IN HANDLE SUBMIT");
        axios.post(`http://localhost:3001/api/add_tag/${selectedContact._id}/${tagId}`)
            .then(res => {

                // And send the user to the home page
                // getContacts();
            })
    }
    const handleRemoveTag = async (event) => {
        console.log("IN HANDLE SUBMIT");
        axios.post(`http://localhost:3001/api/remove_tag/${selectedContact._id}/${tagId}`)
            .then(res => {

                // And send the user to the home page
                // getContacts();
            })
    }



    if (Object.keys(selectedContact).length===0) {
        // set empty form fields
    }

   
    function handleTagSend(){
        handleCreateTag()
        handlePopClose()
    }

    function handlePopClose(){
        tagIsVisible(false)
    }
    const handleChangeComplete = (color) => {
        setTag({...tagData,  colour: color.hex });

      };
    return (
        <>
        <div style={backgroundStyle}>

                {tagMode&&
                <div style={popStyle}>
                    <div className="contact-nav" style={{paddingBottom:'20vh'}}>
                        <button onClick={handlePopClose}>Back</button>
                        <p></p>
                    </div>
                    <h1>Add new tag</h1>
                    <div style={{zIndex:'4',textAlign:'center',width:'auto'}}>
                        <CirclePicker onChangeComplete={ handleChangeComplete } />
                    </div>
                    <form  onSubmit={()=>handleTagSend}>
                        <input type="text" name="text" id="text" style={{border:'solid',width:'40%'}} onChange={handleTag} defaultValue=""/>
                        
                        <br/><button type="submit">add</button>
                    </form>
                </div>}


            <form className="contact-form" onSubmit={handleEdit} key={selectedContact._id}>
                <nav>
                    <div className="contact-nav">
                        <button onClick={handleClose}>Back</button>
                        <button type="submit" onSubmit={handleEdit}>Save changes</button>
                    </div>
                </nav>

                {Object.keys(selectedContact).length===0 ? 

                // This is for ADDING CONTACTS
                (<div className="page-content"> 
                    <div className="contact-header">
                        <div style={{marginRight: '40px'}}>
                            <ContactPhoto/>
                        </div>
                        <div>
                            <label htmlFor ="firstname">First Name</label>
                            <input className="contact-input" type="text" name="firstname" id="firstname" placeholder="First Name" defaultValue="" required onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor ="lastname">Last Name</label>
                            <input className="contact-input" type="text" name="lastname" id="lastname" placeholder="Last Name" defaultValue="" required onChange={handleChange}/>
                        </div>
                    </div>
                
                    <div className="contact-info-container">
                        <table className="personal-info">
                            <tbody>
                            <tr>
                                <th colspan="2"><h3>Personal information</h3></th>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="company">Company</label></td>
                                <td><input className="contact-input" colspan="0" type="text" name="company" id="company" placeholder="Company" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="city">City</label></td>
                                <td><input className="contact-input" type="text" name="city"  id="city"placeholder="City" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="country">Country</label></td>
                                <td><input className="contact-input" type="text" name="country"  id="country" placeholder="Country" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="phone">Phone</label></td>
                                <td><input className="contact-input" type="text" name="phone" id="phone" placeholder="Phone number" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="email">Email</label></td>
                                <td><input className="contact-input" type="email" name="email" id="email" placeholder="Email address" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="facebook">Facebook URL</label></td>
                                <td><input className="contact-input" type="url" name="facebook" id="facebook" placeholder="www.facebook.com/" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="linkedin">LinkedIn URL</label></td>
                                <td><input className="contact-input" type="url" name="linkedin" id="linkedin" placeholder="www.linkedin.com/" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="instagram">Instagram URL</label></td>
                                <td><input className="contact-input" type="url" name="instagram" id="instagram" placeholder="www.instagram.com/" defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="social-info">
                        <tbody>
                            <tr>
                                <th colspan="2"><h3>Social activities</h3></th>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="date">Last catchup date</label></td>
                                <td><input className="contact-input" type="date" name="date" id="date" placeholder="dd/mm/yyyy" defaultValue="" required onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                {/* <td className="contact-label"><label htmlFor ="">Common interests</label></td>
                                {selectedContact.contactInformation.commonInterests.tags.map(interest => (
                                <input className="contact-input" type="radio" name={interest} placeholder="Add common interests here..."/>
                                ))}
                                <button type="button" onClick={()=>tagIsVisible(true)} style={{borderWidth:'0.2px',borderRadius:'30px',border:'solid',padding:'0px 10px'}}>+</button> */}
                            </tr>
                            <tr>
                                {/* <td className="contact-label"><label htmlFor ="">Tags</label></td>
                                {selectedContact.contactInformation.commonInterests.tags.map(interest => (
                                <input className="contact-input" type="radio" name={interest} placeholder="Add common interests here..."/>
                                ))}
                                <button type="button" onClick={()=>commonIsVisible(true)} style={{borderWidth:'0.2px',borderRadius:'30px',border:'solid',padding:'0px 10px'}}>+</button> */}
                            </tr>
                            <tr>
                                <td className="contact-label"><label for="notes">Notes</label></td>
                                <td><input className="multiline-input contact-input" type="text" name="notes" placeholder="Enter notes here..." defaultValue="" onChange={handleChange}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>)
                :

                // This is for EDITING CONTACTS
                <div className="page-content"> 
                    <div className="contact-header">
                        <div style={{marginRight: '40px'}}>
                            <ContactPhoto/>
                        </div>
                        <div>
                            <label htmlFor ="firstname">First Name</label>
                            <input className="contact-input" type="text" name="firstname" id="firstname" placeholder="First Name" defaultValue={selectedContact.contactInformation.name.firstName} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor ="lastname">Last Name</label>
                            <input className="contact-input" type="text" name="lastname" id="lastname" placeholder="Last Name" defaultValue={selectedContact.contactInformation.name.lastName} onChange={handleChange}/>
                        </div>
                    </div>
                
                    <div className="contact-info-container">
                        <table className="personal-info">
                        <tbody>
                            <tr>
                                <th colSpan="2"><h3>Personal information</h3></th>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="company">Company</label></td>
                                <td><input className="contact-input" colSpan="0" type="text" name="company" id="company" placeholder="Company" defaultValue={selectedContact.contactInformation.company.name} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="city">City</label></td>
                                <td><input className="contact-input" type="text" name="city"  id="city"placeholder="City" defaultValue={selectedContact.contactInformation.location.city} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="country">Country</label></td>
                                <td><input className="contact-input" type="text" name="country"  id="country" placeholder="Country" defaultValue={selectedContact.contactInformation.location.country} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="phone">Phone</label></td>
                                <td><input className="contact-input" type="text" name="phone" id="phone" placeholder="Phone number" defaultValue={selectedContact.contactInformation.phone.number} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="email">Email</label></td>
                                <td><input className="contact-input" type="email" name="email" id="email" placeholder="Email address" defaultValue={selectedContact.contactInformation.email.address} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="facebook">Facebook URL</label></td>
                                <td><input className="contact-input" type="url" name="facebook" id="facebook" placeholder="www.facebook.com/" defaultValue={selectedContact.contactInformation.socials.facebook} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="linkedin">LinkedIn URL</label></td>
                                <td><input className="contact-input" type="url" name="linkedin" id="linkedin" placeholder="www.linkedin.com/" defaultValue={selectedContact.contactInformation.socials.linkedin} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="instagram">Instagram URL</label></td>
                                <td><input className="contact-input" type="url" name="instagram" id="instagram" placeholder="www.instagram.com/" defaultValue={selectedContact.contactInformation.socials.instagram} onChange={handleChange}/></td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="social-info">
                        <tbody>
                            <tr>
                                <th colSpan="2"><h3>Social activities</h3></th>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="date">Last catchup date</label></td>
                                <td><input className="contact-input" type="date" name="date" id="date" placeholder="dd/mm/yyyy" required defaultValue={selectedContact.contactInformation.lastCatchup.date} onChange={handleChange}/></td>
                            </tr>

                            <tr>
                                <td className="contact-label"><label htmlFor ="">Tags</label></td>
                                {console.log(selectedContact.contactInformation.tags)}
                                {selectedContact.contactInformation.tags.tags.map(interest => (
                                <p>{interest}<button type="button" onClick={()=>handleDeleteTag(interest)} style={{borderWidth:'0.2px',borderRadius:'30px',border:'solid',padding:'0px 10px'}}>-</button></p>
                                ))}
                                <button type="button" onClick={()=>tagIsVisible(true)} style={{borderWidth:'0.2px',borderRadius:'30px',border:'solid',padding:'0px 10px'}}>+</button>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor="notes">Notes</label></td>
                                <td><textarea className="multiline-input contact-input" style={{color:'white'}} type="text" rows="5" name="notes" placeholder="Enter notes here..." defaultValue={selectedContact.contactInformation.notes.notes} onChange={handleChange}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                }
                <div style={{textAlign: 'center'}}>
                    <AlertDialog contactId={selectedContact._id} handleDelete={handleDelete} userId={userId}/>
                </div>
            </form>
        </div>
    </>
)}
  
// ContactPage.defaultProps = {
//     selectedContact: {}
// }

ContactPage.propTypes = {
    selectedContact: PropTypes.object,
    handleEdit: PropTypes.func.isRequired
}

export default ContactPage;