import React, {useState, useEffect} from 'react';
import { Icon } from '@iconify/react';

function FilterDropdown(props) {

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = async (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    const contacts = props.value;

    // make an array of countries for the filter to display
    const getCountries = () => {
        let countries =[];
        // get the unique country names from user's contacts
        contacts.forEach(contact => {
            countries.push(contact.contactInformation.location.country);
        });
        // return unique countries only, and sorted
        return [... new Set(countries.sort())]
    }

    return (
        <div className="filter box">
            <form>
                <button className="dropdown-button" onClick={toggleDropdown}>
                    Filter by country
                    <Icon icon="bx:bx-caret-down" width="15" height="15" />
                </button>

                {isOpen && (<div className={`dropdown ${isOpen ? 'open' : 'closed'}`}>
                    <ul>
                        {getCountries().map(country => (
                        <li>
                            <input type="checkbox" id="au" name="australia" value="Australia"/>
                            <label for="au">{country}</label>
                        </li>
                        ))}

                    </ul>

                </div>)}
            </form>
        </div>
    );
}

export default FilterDropdown;