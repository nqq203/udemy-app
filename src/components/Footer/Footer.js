import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdLanguage } from "react-icons/md";

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterTop>
        <FooterTopLeft>
          <ul>
            <li className='footer-first-item'><Link>Teach on Udemy</Link></li>
            <li><Link>Introduction</Link></li>
            <li><Link>Contact</Link></li>
          </ul>
          <ul>
            <li className='footer-first-item'><Link>Career</Link></li>
            <li><Link>Blog</Link></li>
            <li><Link>Support</Link></li>
          </ul>
          <ul>
            <li className='footer-first-item'><Link>Rules</Link></li>
            <li><Link>Privacy Policy</Link></li>
            <li><Link>Cookies Setting</Link></li>
          </ul>
        </FooterTopLeft>
        <FooterTopRight>
          <button>
            <MdLanguage size={20}/> 
            <p>English</p>
          </button>
        </FooterTopRight>
      </FooterTop>
      <FooterBottom>
        <div className='footer-logo'>
          LOGO
        </div>
        <div className='footer-copyright'>
          Copyright
        </div>
      </FooterBottom>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  width: auto;
  padding: 24px 1vw 0;
  height: 270px;
  background-color: var(--color-gray-550);
`

const FooterTop = styled.div`
  position: relative;
`

const FooterTopLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  ul {
    display: flex;
    flex-direction: column;
  }

  ul li {
    list-style: none;
    margin-top: 10px;
  }

  ul li a {
    color: var(--color-white);
    text-decoration: none;
  }

  ul li a:hover {
    color: var(--color-white);
    text-decoration: underline;
  }

  .footer-first-item {
    margin-top: 0;
  }
`

const FooterTopRight = styled.div`
  position: absolute;
  padding-right: 40px;
  right: 10px;
  top: 0;
  button {
    padding: 0 20px;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    background-color: var(--color-gray-550);
    color: var(--color-white);
    border: 1px solid var(--color-white);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
`

const FooterBottom = styled.div`
  color: var(--color-white);
  position: relative;
  font-size: 13px;

  .footer-logo {
    position: absolute;
    left: 40px;
    top: 110px;
  }

  .footer-copyright {
    position: absolute;
    right: 10px;
    top: 110px;
    padding-right: 40px;
  }
`