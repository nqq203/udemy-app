import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  width: auto;
  align-items: center;
  padding: 20px 10px;
  background-color: var(--color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 4px 12px rgba(0, 0, 0, .08);

  img {
    width: 70px;
    height: auto;
  }

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

  .account-dropdown {
    display: none;
    position: absolute;
    right: 0;
    background-color: #f9f9f9;
    min-width: 200px; /* or any desired size */
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  
  /* The container div that shows the dropdown on hover */
  .profile:hover .account-dropdown {
    display: block;
  }
  
  /* Style your dropdown content */
  .dropdown-content {
    padding: 12px;
    text-align: left;
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--color-gray-200);
  }

  .dropdown-content-info {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    border-bottom: 1px solid var(--color-gray-200);
    padding: 10px 30px;
  }

  .dropdown-content-info-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 600;
    color: var(--color-gray-500);
  }

  .dropdown-content-item {
    font-family: var(--font-stack-text);
    color: var(--color-gray-500);
    padding: 5px 10px;
    font-weight: 500;
    font-size: 14px;
    
  }

  .dropdown-content-item:hover, .dropdown-content-info-item:hover {
    color: var(--color-purple-300);
  }
`