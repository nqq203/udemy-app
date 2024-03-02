import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
// import "./Header.css";
import { MdLanguage, MdOutlineShoppingCart} from "react-icons/md";
import styled from 'styled-components';

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
        <li><Link to="/courses">Instructor</Link></li>
        <li><Link to="/about">My learning</Link></li>
      </ul>
    </nav>
    <div className='header-forth'>
      <MdOutlineShoppingCart size={31} className="shopping"/>
      <Link to="/login" className="btn login">Log in</Link>
      <Link to="/signup" className="btn signup">Sign up</Link>
      <MdLanguage className="language" size={31}/>
    </div>
  </HeaderWrapper>
);

export default Header;

const HeaderWrapper = styled.header`
  display: flex;
  width: auto;
  align-items: center;
  padding: 20px 10px;
  background-color: var(--color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 4px 12px rgba(0, 0, 0, .08);

  .header-search-bar {
    width: 70%;
  }

  nav ul {
    list-style: none;
    display: flex;
    gap: 10px;
    padding-left: 0;
  }

  nav ul li {
    width: 85px;
  }
  
  .three-words-item {
    width: 120px;
  }

  .header-first {
    margin-right: 10px;
  }

  
  nav ul li a {
    color: var(--color-gray-500);
    text-decoration: none;
    font-family: var(--font-stack-text);
    font-weight: 500;
    font-size: 15px;
  }

  nav ul li a:hover {
    color: var(--color-blue-300);
  }

  div {
    display: flex;
    flex-direction: row;
    text-decoration: none; 
    gap: 10px;

    a {
      text-decoration: none;
    }

    .btn,
    .language,
    .shopping {
      color: var(--color-gray-500);
      padding: 10px;
      border: 1px solid var(--color-gray-600);
      line-height: 1.4;
      font-size: 15px;
      font-weight: 700;
      text-align: center;
      align-items: center;
      width: 70px;
    }

    .btn:hover,
    .language:hover {
      background-color: var(--color-gray-150);
    }

    .language {
      padding: 5px;
      width: 40px;
    }

    .shopping {
      padding: 5px;
      width: 40px;
      border: none;
    }

    .shopping:hover {
      color: var(--color-blue-300);
    }

    .signup {
      background-color: black;
      color: var(--color-white);
    }

    .signup:hover {
      background-color: var(--color-gray-400);
    }
  }
`