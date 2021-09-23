import React from 'react';
import PropTypes from 'prop-types';
import ContactAvatar from '../components/ContactAvatar';

const ContactPage = ({selectedContact, handleSubmitEdit, closeContact, handleChange}) => {
    const pageStyle = {
        position: 'absolute',
        backgroundColor: '#0D0D0D',
        height: '100vh',
        width: '100vw',
    }
      
    return (
        <>
        <div style={pageStyle}>
            <button onClick={closeContact}>Back</button>
            <ContactAvatar/>
                <form onSubmit={handleSubmitEdit} key={selectedContact._id}>

                <label htmlFor ="firstname">First Name</label>
                <input type="text" name="firstname"  id="firstname" placeholder="First Name" defaultValue={selectedContact.contactInformation.name.firstName} onChange={(e)=>handleChange(e,selectedContact.contactInformation.name.firstName)}/><br/>
                <label htmlFor ="lastname">Last Name</label>
                <input type="text" name="lastname"  id="lastname" placeholder="Last Name" defaultValue={selectedContact.contactInformation.name.lastName} onChange={handleChange}/><br/>
                
                <label htmlFor ="company">Company</label>
                <input type="text" name="company" id="company" placeholder="Company" defaultValue={selectedContact.contactInformation.company.name} onChange={handleChange}/><br/>
                <label htmlFor ="city">City</label>
                <input type="text" name="city"  id="city"placeholder="City" defaultValue={selectedContact.contactInformation.location.city} onChange={handleChange}/><br/>
                <label htmlFor ="country">Country</label>
                <input type="text" name="country"  id="country" placeholder="Country" defaultValue={selectedContact.contactInformation.location.country} onChange={handleChange}/><br/>
                <label htmlFor ="phone">Phone</label>
                <input type="text" name="phone" id="phone" placeholder="Phone number" defaultValue={selectedContact.contactInformation.phone.number} onChange={handleChange}/><br/>
                <label htmlFor ="email">Email</label>
                <input type="text" name="email" id="email" placeholder="Email address" defaultValue={selectedContact.contactInformation.email.address} onChange={handleChange}/><br/>
                <label htmlFor ="facebook">Facebook URL</label>
                <input type="text" name="facebook" id="facebook" placeholder="www.facebook.com/" defaultValue={selectedContact.contactInformation.socials.facebook} onChange={handleChange}/><br/>
                <label htmlFor ="linkedin">LinkedIn URL</label>
                <input type="text" name="linkedin" id="linkedin" placeholder="www.linkedin.com/" defaultValue={selectedContact.contactInformation.socials.linkedin} onChange={handleChange}/><br/>
                <label htmlFor ="instagram">Instagram URL</label>
                <input type="text" name="instagram" id="instagram" placeholder="www.instagram.com/" defaultValue={selectedContact.contactInformation.socials.instagram} onChange={handleChange}/><br/>
                <label htmlFor ="date">Last catchup date</label>
                <input type="datetime-local" name="date" id="date" placeholder="dd/mm/yyyy" defaultValue={selectedContact.contactInformation.lastCatchup.date} onChange={handleChange}/><br/>
                {/* <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/>
                <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/> */}
                <label htmlFor ="notes">Notes</label>
                <input type="text" name="notes" id="notes" placeholder="Enter notes here..." defaultValue={selectedContact.contactInformation.notes.notes} onChange={handleChange}/><br/>
            
                <button type="submit" onSubmit={handleSubmitEdit}>Save changes</button>
                </form>

                {/* <button className="red" type="outlined">Delete contact</button> */}
            </div>
        </>
        )
    }
  
    ContactPage.defaultProps = {
    selectedContact: {}
    }

    ContactPage.propTypes = {
    selectedContact: PropTypes.object,
    handleSubmitEdit: PropTypes.func.isRequired
    }

export default ContactPage;