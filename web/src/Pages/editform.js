import React from 'react';
import PropTypes from 'prop-types';
const EditForm = ({selectedContact, handleSubmitEdit,closePopup,handleChange}) => {
    return (
        <>
        <button onClick={closePopup}>close popup</button><br/>
               <form onSubmit={handleSubmitEdit} key={selectedContact._id}>
                <label htmlFor ="firstame">Firstname</label>
                <input type="text" name="firstname"  id="firstname" placeholder="Ben" defaultValue={selectedContact.contactInformation.name.firstName} onChange={(e)=>handleChange(e,selectedContact.contactInformation.name.firstName)}/><br/>
                <label htmlFor ="lastname">Lastname</label>
                <input type="text" name="lastname"  id="lastname" placeholder="Doe" defaultValue={selectedContact.contactInformation.name.lastName} onChange={handleChange}/><br/>
                <label htmlFor ="company">company</label>
                <input type="text" name="company" id="company"  placeholder="Ben" defaultValue={selectedContact.contactInformation.company.name} onChange={handleChange}/><br/>
                <label htmlFor ="city">city</label>
                <input type="text" name="city"  id="city"placeholder="Ben" defaultValue={selectedContact.contactInformation.location.city} onChange={handleChange}/><br/>
                <label htmlFor ="country">country</label>
                <input type="text" name="country"  id="country" placeholder="Ben" defaultValue={selectedContact.contactInformation.location.country} onChange={handleChange}/><br/>
                <label htmlFor ="phone">phone</label>
                <input type="text" name="phone" id="phone" placeholder="Ben" defaultValue={selectedContact.contactInformation.phone.number} onChange={handleChange}/><br/>
                <label htmlFor ="email">email</label>
                <input type="text" name="email" id="email" placeholder="Ben" defaultValue={selectedContact.contactInformation.email.address} onChange={handleChange}/><br/>\
                <p>Socials</p>
                <label htmlFor ="facebook">facebook link</label>
                <input type="text" name="facebook" id="facebook" placeholder="Ben" defaultValue={selectedContact.contactInformation.socials.facebook} onChange={handleChange}/><br/>
                <label htmlFor ="instagram">instagram link</label>
                <input type="text" name="instagram" id="instagram" placeholder="Ben" defaultValue={selectedContact.contactInformation.socials.instagram} onChange={handleChange}/><br/>
                <label htmlFor ="linkedin">linkedin link</label>
                <input type="text" name="linkedin" id="linkedin" placeholder="Ben" defaultValue={selectedContact.contactInformation.socials.linkedin} onChange={handleChange}/><br/>
                <label htmlFor ="date">last catchup</label>
                <input type="datetime-local" name="date" id="date" placeholder="Ben" defaultValue={selectedContact.contactInformation.lastCatchup.date} onChange={handleChange}/><br/>
                {/* <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/>
                <label for =""></label>
                <input type="text" name="" placeholder="Ben"/><br/> */}
                <label htmlFor ="notes">notes</label>
                <input type="text" name="notes" id="notes" placeholder="Ben" defaultValue={selectedContact.contactInformation.notes.notes} onChange={handleChange}/><br/>
                <button type="submit" onSubmit={handleSubmitEdit}>submit</button>
            </form>
            </>
    )
  }
  
  EditForm.defaultProps = {
    selectedContact: {}
  }
  
  EditForm.propTypes = {
    selectedContact: PropTypes.object,
    handleSubmitEdit: PropTypes.func.isRequired
  }
  export default EditForm;