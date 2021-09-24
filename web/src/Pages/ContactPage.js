import React from 'react';
import PropTypes from 'prop-types';
import ContactPhoto from '../components/ContactPhoto';
import '../styles/contactStyles.scss';

const ContactPage = ({selectedContact, handleSubmitEdit, closeContact, handleChange}) => {
    const backgroundStyle = {
        position: 'absolute',
        backgroundColor: '#0D0D0D',
        height: '100vh',
        width: '100vw',
    }
      
    return (
        <>
        <div style={backgroundStyle}>
            <nav>
                <button className="back" onClick={closeContact}>Back</button>
            </nav>

            <div className="page-content"> 
                
                <form className="contact-form" onSubmit={handleSubmitEdit} key={selectedContact._id}>

                    <div className="contact-header">
                        <ContactPhoto/>
                        <div>
                            <label htmlFor ="firstname">First Name</label>
                            <input className="contact-input" type="text" name="firstname"  id="firstname" placeholder="First Name" defaultValue={selectedContact.contactInformation.name.firstName} onChange={(e)=>handleChange(e,selectedContact.contactInformation.name.firstName)}/>
                        </div>
                        <div>
                            <label htmlFor ="lastname">Last Name</label>
                            <input className="contact-input" type="text" name="lastname"  id="lastname" placeholder="Last Name" defaultValue={selectedContact.contactInformation.name.lastName} onChange={handleChange}/>
                        </div>
                    </div>
                
                    <div className="contact-info-container">
                        <table className="personal-info">
                            <tr>
                                <th colspan="2"><h3>Personal information</h3></th>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="company">Company</label></td>
                                <td><input className="contact-input" colspan="0" type="text" name="company" id="company" placeholder="Company" defaultValue={selectedContact.contactInformation.company.name} onChange={handleChange}/></td>
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
                                <td><input className="contact-input" type="text" name="email" id="email" placeholder="Email address" defaultValue={selectedContact.contactInformation.email.address} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="facebook">Facebook URL</label></td>
                                <td><input className="contact-input" type="text" name="facebook" id="facebook" placeholder="www.facebook.com/" defaultValue={selectedContact.contactInformation.socials.facebook} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="linkedin">LinkedIn URL</label></td>
                                <td><input className="contact-input" type="text" name="linkedin" id="linkedin" placeholder="www.linkedin.com/" defaultValue={selectedContact.contactInformation.socials.linkedin} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="instagram">Instagram URL</label></td>
                                <td><input className="contact-input" type="text" name="instagram" id="instagram" placeholder="www.instagram.com/" defaultValue={selectedContact.contactInformation.socials.instagram} onChange={handleChange}/></td>
                            </tr>

                        </table>
                        <table className="social-info">
                            <tr>
                                <th colspan="2"><h3>Social activities</h3></th>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="date">Last catchup date</label></td>
                                <td><input className="contact-input" type="datetime-local" name="date" id="date" placeholder="dd/mm/yyyy" defaultValue={selectedContact.contactInformation.lastCatchup.date} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label for ="">Common interests</label></td>
                                <td><input type="text" name="" placeholder="Add common interests here..."/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label for ="">Tags</label></td>
                                <td><input type="text" name="" placeholder="Add tags here..."/></td>
                            </tr>
                            <tr>
                                <td className="contact-label"><label htmlFor ="notes">Notes</label></td>
                                <td><input className="contact-input" type="text" name="notes" id="notes" placeholder="Enter notes here..." defaultValue={selectedContact.contactInformation.notes.notes} onChange={handleChange}/></td>
                            </tr>

                        </table>
                    
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <button type="submit" onSubmit={handleSubmitEdit}>Save changes</button>
                    </div>

                </form>

                {/* <button className="red" >Delete contact</button> */}
            </div>
        </div>
    </>
)}
  
ContactPage.defaultProps = {
selectedContact: {}
}

ContactPage.propTypes = {
    selectedContact: PropTypes.object,
    handleSubmitEdit: PropTypes.func.isRequired
}

export default ContactPage;