import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';

import { Icon } from '@iconify/react';

import { items } from '../data';
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

function Dashboard() {
  const classes = useStyles();

  function filterFunction() {
    // write the function here
  }

  // const filterList = FILTER_NAMES.map(name => (
  //   <FilterButton
  //     key={name}
  //     name={name}
  //     isPressed={name === filter}
  //     setFilter={setFilter}
  //   />
  // ));
  const [favorited, setFavorited] = React.useState([]);
  const [countryName, setcountryName] = React.useState([]);

  const handleChange = (event) => {
    setcountryName(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setcountryName(value);
  };

  return (
<>
  <nav>
    <div>
      <ProfileIcon />
        {/* <a href="/login">
            <img src="avatar.png" width="50px"alt="avatar"/>
        </a> */}
    </div>
  </nav>

    <div className="containerDash">
        
        <div className="actionsBar">
            <div className="searchContainer">
              <form>
                <Icon icon="fe:search" height={20} width={20}/>
                <input className="dashSearch" type="text" name="search" placeholder="Search by name"></input>
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

            <button className="newContactButton">
                <Icon icon="gridicons:user-add" width={25} height={25}/>
                <span> New contact</span>
            </button>
        </div>
        
        <table>
            <tr className="headerRow" >
                <th><h6></h6></th>
                <th><h6>Name</h6></th>
                <th><h6>Company</h6></th>
                <th><h6>Location</h6></th>
                <th><h6>Phone</h6></th>
                <th className="email"><h6>Email</h6></th>
                <th className="socials"><h6>Socials</h6></th>
                <th><h6>Last catchup date</h6></th>
                <th><h6>Common interests</h6></th>
                <th className="tags"><h6>Tags</h6></th>
                <th><h6>Notes</h6></th>
                <th><h6>Actions</h6></th>
            </tr>

            {items.map(contact => (
            <tr>
                <td><p>{contact.favourite
                  ? <Icon icon="ant-design:star-filled" color="#fff100" width="30" height="30"/>
                  : <Icon icon="ant-design:star-outlined" color="#e5e5e5" width="30" height="30" />
                }</p></td>
                <td><p>{contact.name}</p></td>
                <td><p>{contact.company}</p></td>
                <td><p>{contact.location},{contact.country}</p></td>
                <td><p>{contact.phone}</p></td>
                <td className="email"><p>{contact.email}</p></td>
                <td className="socials">
                  <p>{contact.socials.facebook && <a href={`${contact.socials.facebookLink}`}>
                  <Icon icon="logos:facebook" width="25" height="25" />
                  </a>}
                {contact.socials.linkedin && <a href={`${contact.socials.linkedinLink}`}>
                  <img src="linkedin-icon.svg" width="25" height="25" alt="linkedin"/>
                </a>}
                {contact.socials.instagram && <a href={`${contact.socials.instagramLink}`}>
                  <img src="instagram-icon.png" width="25" height="25" alt="instagram"/>
                </a>}
                </p></td>
                <td><p>Month dd, YYYY</p></td>
                <td><p>{contact.commonInterests.map(interest=>(
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
            </tr>
            ))}
            </table>  
    </div>
   
     </>
  );
}

export default Dashboard;
