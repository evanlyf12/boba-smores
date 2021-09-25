import React, {useState, useEffect} from 'react';
import { Icon } from '@iconify/react';

const FilterDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = async (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);
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
                        <li>
                            <input type="checkbox" id="au" name="australia" value="Australia"/>
                            <label for="au">Australia</label>
                        </li>
                        <li>
                            <input type="checkbox" id="cn" name="china" value="China"/>
                            <label for="cn">China</label>
                        </li>
                        <li>
                            <input type="checkbox" id="nz" name="new-zealand" value="New Zealand"/>
                            <label for="nz">New Zealand</label>
                        </li>
                    </ul>

                </div>)}
                {/* <select id="filter"name="filter">
                    <option defaultValue="" disabled>Filter by country </option>
                    <option defaultValue="australia">Australia</option>
                    <option defaultValue="newzealand">New Zealand</option>
                </select> */}
            </form>
        </div>
    );
}

export default FilterDropdown;