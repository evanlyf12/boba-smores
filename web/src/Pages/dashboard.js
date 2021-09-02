import React from 'react';
import { items } from '../data';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import ProfileIcon from '../Components/ProfileIcon';

function Dashboard() {
  return (
<>
  <nav>
    <div className="profile">
      <ProfileIcon />
        {/* <a href="/login">
            <img src="avatar.png" width="50px"alt="avatar"/>
        </a> */}
      
    </div>
  </nav>

    <div className="containerDash">
        
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
            <div className="newContact">
                <img src="group.png" alt="group"/>
                   <span> New contact</span>
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
                <td className="actions"><img src="edit.png" alt="edit"/> <img src="bin.png" alt="bin"/></td>
            </tr>
            ))}
            </table>  
    </div>
   
     </>
  );
}

export default Dashboard;
