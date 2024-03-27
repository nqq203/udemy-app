import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import { MdLanguage, MdOutlineShoppingCart} from "react-icons/md";
import { HeaderWrapper } from './HeaderStyle';

const Header = () => (
  <HeaderWrapper>
    <nav className="header-first">
      <ul>
        <li className='logo'><Link to="/">Home</Link></li>
        <li><Link to="/courses">Categories</Link></li>
      </ul>
    </nav>
    <div className="header-search-bar"><SearchBar /></div>
    <nav className='header-third'>
      <ul>
        <li className='three-words-item'><Link to="/">Teach on Udemy</Link></li>
        <li><Link to="/instructor/courses">Instructor</Link></li>
        <li><Link to="/about">My learning</Link></li>
      </ul>
    </nav>
    <div className='header-forth'>
      <MdOutlineShoppingCart size={31} className="shopping"/>
      <Link to="/log-in" className="btn login">Log in</Link>
      <Link to="/sign-up" className="btn signup">Sign up</Link>
      <MdLanguage className="language" size={31}/>
    </div>
  </HeaderWrapper>
);

export default Header;