import React from 'react';
import { IoMdSearch } from "react-icons/io";


export const SearchBar = () => (
  <form className="search-container middle-nav">
    <button type="submit" className="search-button"><IoMdSearch size={25}/></button>
    <input type="text" placeholder="Search for anything" className="search-input"/>
  </form>
);
