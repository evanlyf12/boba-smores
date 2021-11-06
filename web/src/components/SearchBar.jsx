import React from 'react';
import { Icon } from '@iconify/react';


const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <div className="search box">
        <form action="/" method="get">
            <Icon icon="fe:search" height={20} width={20}/>
            <input
                value={searchQuery}
                onInput={event => setSearchQuery(event.target.value)}
                type="text"
                name="search" 
                placeholder="Search by name">
            </input>
        </form>
    </div>
);

export default SearchBar;