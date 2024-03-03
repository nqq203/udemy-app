
import { Link } from 'react-router-dom';
import { MdLanguage } from "react-icons/md";
import { FooterWrapper, FooterBottom, FooterTop, FooterTopLeft, FooterTopRight } from './FooterStyle';

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