import React from 'react';
import { IoMdSearch } from "react-icons/io";
import { SearchForm } from './SearchBarStyle';

export const SearchBar = () => (
  <SearchForm>
    <button type="submit"><IoMdSearch size={25} /></button>
    <input type="text" placeholder="Search for anything" />
  </SearchForm>
);