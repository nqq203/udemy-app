import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { MdLanguage, MdOutlineShoppingCart } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { HeaderWrapper } from "./HeaderStyle";
import { useAuth } from "../../context/AuthContext";
import { callApiLogOut } from "../../api/user";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      // Log out the user
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("email");
      // localStorage.removeItem("fullname");
      // localStorage.removeItem("role");
      // localStorage.removeItem("_id");
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, setIsAuthenticated]);

  async function onLogout() {
    const data = await callApiLogOut(localStorage.getItem("sessionId"));
    setIsAuthenticated(false);
    localStorage.clear();
    window.location.href = "http://localhost:3030";
    console.log(data);
  }

  return (
    <HeaderWrapper>
      <nav className="header-first">
        <ul style={{ display: "flex", alignItems: "center" }}>
          <li className="logo">
            <Link to="/">
              <img src="../../../assets/udemy.png" alt="udemy-logo" />
            </Link>
          </li>
          <li>
            <Link to="/courses">Categories</Link>
          </li>
        </ul>
      </nav>
      <div className="header-search-bar">
        <SearchBar />
      </div>
      <nav className="header-third">
        <ul>
          {/* <li className='three-words-item'><Link to="/">Teach on Udemy</Link></li> */}
          <li>
            <Link to="/instructor/courses">Instructor</Link>
          </li>
          <li>
            <Link to="/my-courses/learning">My learning</Link>
          </li>
        </ul>
      </nav>
      {!isAuthenticated ? (
        <div className="header-forth">
          <MdOutlineShoppingCart size={31} className="shopping" />
          <Link to="/sign-in" className="btn login">
            Log in
          </Link>
          <Link to="/sign-up" className="btn signup">
            Sign up
          </Link>
          <MdLanguage className="language" size={31} />
        </div>
      ) : (
        <div className="header-forth">
          <Link to="/shopping-cart">
            <MdOutlineShoppingCart size={31} className="shopping" />
          </Link>
          <CiHeart size={31} className="shopping" />
          <Link
            className="profile"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <Link to="/profile/info">
              <img
                src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                style={{ width: "40px" }}
                alt="user-profile"
              />
            </Link>
            {isHovering && (
              <div className="account-dropdown">
                <div className="dropdown-content-info">
                  <img
                    className="dropdown-content-info-item"
                    src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                    alt="uesr-profile"
                    style={{ width: "60px" }}
                  />
                  <div className="dropdown-content-info-item">
                    <div className="dropdown-content-info-item-name">
                      {localStorage.getItem("fullname")}
                    </div>
                    <div className="dropdown-content-info-item-email">
                      {localStorage.getItem("email")}
                    </div>
                  </div>
                </div>
                <div className="dropdown-content">
                  <div className="dropdown-content-item">My Learning</div>
                  <div className="dropdown-content-item">My Cart</div>
                  <div className="dropdown-content-item">Wish List</div>
                  <div className="dropdown-content-item">
                    Instructor Dashboard
                  </div>
                </div>
                <div className="dropdown-content">
                  <Link to="/profile/info">
                    <div className="dropdown-content-item">Edit Profile</div>
                  </Link>
                  <div className="dropdown-content-item">Payment Methods</div>
                </div>
                <div className="dropdown-content">
                  <Link to="/">
                    <div className="dropdown-content-item" onClick={onLogout}>
                      Log out
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </Link>
        </div>
      )}
    </HeaderWrapper>
  );
};

export default Header;
