import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { isUserLoggedIn } from '../Auth';
const FilterDropdown = ({ contacts, filterQuery, setFilterQuery }) => {

    // make an array of countries for the filter to display
    const getCountries = () => {
        let countries = {};
        // get the unique country names from user's contacts
        contacts.forEach(contact => {
            if (contact.contactInformation.location.country!==undefined) {
                countries[contact.contactInformation.location.country] = false;
            }
        });
        // return unique countries only, and sorted (should be automatic)
        setCountries(countries);
    }

    
    const [countries, setCountries] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    useEffect (()=>{
        if (isUserLoggedIn&&contacts!=undefined){
            getCountries()
        }
    },[])

    const toggleDropdown = async (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);

        if (!isOpen) {
            clearFilter();
        }
    }


    function clearFilter() {
        // reset state to initial values (all false)
        setChecked(getCountries());
    }
    
    const [checked, setChecked] = useState(countries);
    
    // event handler for checkboxes
    const handleCheck = (event) => {
        // update the country object value
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        });
        

        // update the entire countries object
        Object.assign(countries, checked)
        // update the query for filter
        var quer = '' 
        var first = true
        
        Object.keys(countries).map((country) => {

            if (countries[country]&&first){
                quer =  country 
                first = false
            } 
            else if (countries[country]){
                quer = quer + "&" + country 
            }    
        })
        setFilterQuery(quer)

    };



    return (
        <div className="filter box">
            <form id="countries-filter">
                <button className="dropdown-button" onClick={toggleDropdown}>
                    Filter by country
                    <Icon icon="bx:bx-caret-down" width="15" height="15" />
                </button>

                {isOpen && (<div className={`dropdown ${isOpen ? 'open' : 'closed'}`}>
                    <ul>
                        {Object.keys(countries).map((country, selected) => (
                        <li key={`${country}`}> 
                            <input type="checkbox" id={country} name={country} value={country} onChange={handleCheck}/>
                            <label htmlFor={country}>{country}</label>
                        </li>
                        ))}
                    </ul>
                </div>)}
            </form>
        </div>
    );
}

export default FilterDropdown;