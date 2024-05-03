import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { MdLanguage, MdOutlineShoppingCart } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { HeaderWrapper } from "./HeaderStyle";
import { useAuth } from "../../context/AuthContext";
import { callApiLogOut } from "../../api/user";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      // Add your authentication check logic here
      const accessToken = localStorage.getItem("accessToken");
      setIsAuthenticated(!!accessToken); // Set authenticated based on session existence
      setLoading(false); // Set loading to false once the check is complete
    };

    checkAuth();
  }, [setIsAuthenticated]);

  async function onLogout() {
    setIsAuthenticated(false);
    await callApiLogOut();
    window.location.href = "http://localhost:3030/";
  }

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  if (loading) {
    return <div></div>;
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
                src={localStorage.getItem("avatar")}
                style={{ width: "40px" }}
                alt="user-profile"
              />
            </Link>
            {isHovering && (
              <div className="account-dropdown">
                <div className="dropdown-content-info">
                  <img
                    className="dropdown-content-info-item"
                    src={localStorage.getItem("avatar")}
                    alt="uesr-profile"
                    style={{ width: "60px" }}
                  />
                  <Link
                    to="/profile/info"
                    className="dropdown-content-info-item"
                  >
                    <div className="dropdown-content-info-item-name">
                      {localStorage.getItem("fullname")}
                    </div>
                    <div className="dropdown-content-info-item-email">
                      {localStorage.getItem("email")}
                    </div>
                  </Link>
                </div>
                <div className="dropdown-content">
                  <div className="dropdown-content-item">
                    <Link to="/my-courses/learning" className="link">
                      My Learning
                    </Link>
                  </div>
                  <div className="dropdown-content-item">My Cart</div>
                  <div className="dropdown-content-item">
                    <Link to="/my-courses/wishlist" className="link">
                      Wishlist
                    </Link>
                  </div>
                  <div className="dropdown-content-item">
                    Instructor Dashboard
                  </div>
                </div>
                <div className="dropdown-content">
                  <Link to="/profile/info" className="link">
                    <div className="dropdown-content-item">Edit Profile</div>
                  </Link>
                  <div className="dropdown-content-item">Payment Methods</div>
                  <Link to="/profile/payment-history" className="link">
                    <div className="dropdown-content-item">
                      Purchase History
                    </div>
                  </Link>
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
