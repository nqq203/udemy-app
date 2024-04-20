import React, { useState } from 'react';
import { useRef,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { SearchForm } from './SearchBarStyle';


export const SearchBar = () =>{
  const searchInputRef = useRef(null)
  // const formRef = useRef(null)
  const navigate = useNavigate();
  const [searchWord,setSearchWord] = useState(null)


  const handleSubmit = (e) => {
    e.preventDefault(); 
    setSearchWord(searchInputRef.current.value.trim());
    if(searchWord != null && searchWord != ""){
      // console.log(searchWord)
      const formData = new FormData() 
      formData.append('keyword', searchWord);

      // Construct URL with formData
      const urlSearchParams = new URLSearchParams(formData).toString();

      navigate(`/view-list-courses?${urlSearchParams}&p=1`);
      if(window.location.href != "http://localhost:3030/"){
        window.location.reload();
      }

    }    
  }
  
  return(
    <SearchForm onSubmit={handleSubmit}>
      <button type="submit" ><IoMdSearch size={25} /></button>
      <input type="text" name='keyword' placeholder="Search for anything" ref={searchInputRef}/>
    </SearchForm>
  )
};