import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import "./Header.css";
import { MdLanguage, MdOutlineShoppingCart} from "react-icons/md";

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Categories</Link></li>
      </ul>
    </nav>
    <SearchBar />
    <nav>
      <ul>
        <li><Link to="/">Teach on Udemy</Link></li>
        <li><Link to="/courses">Instructor</Link></li>
        <li><Link to="/about">My learning</Link></li>
      </ul>
    </nav>
    <div>
      <MdOutlineShoppingCart size={31} className="shopping"/>
      <Link to="/login" className="logo login">Log in</Link>
      <Link to="/signup" className="logo signup">Sign up</Link>
      <MdLanguage className="language" size={31}/>
    </div>
  </header>
);

export default Header;