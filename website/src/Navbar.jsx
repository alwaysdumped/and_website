// src/Navbar.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollContext } from "./App";

const Navbar = ({ scrollToWorks, isSticky, isSignupPage, isHomePage }) => {
  const location = useLocation();
  const { showSignupInNav } = useContext(ScrollContext);
  
  const isContactPage = location.pathname === '/contact';

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleWorksClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      scrollToWorks && scrollToWorks();
    }
  };

  const handleContactClick = (e) => {
    if (location.pathname === "/contact") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const shouldMakeSpaceForButton = (isSticky || showSignupInNav) && !isContactPage && location.pathname !== '/signup';

  return (
    <nav className={`navbar ${isSticky ? "navbar-scrolled" : ""} ${isSticky && isHomePage ? "home-scroll" : ""} ${isSignupPage ? "navbar-signup" : ""}`}>
      <div className={`navbar-right ${shouldMakeSpaceForButton ? 'with-button' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={handleHomeClick}>Home</Link>
          </li>
          <li>
            <Link to="/#works" onClick={handleWorksClick}>Our Works</Link>
          </li>
          
          {isContactPage ? (
            <li>
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/contact" onClick={handleContactClick}>Contact</Link>
            </li>
          )}
        </ul>
      </div>

      {location.pathname !== "/signup" && !isContactPage && (
        <Link 
          to="/signup"
          className={`signup-btn ${showSignupInNav ? 'visible' : 'hidden'}`}
        >
          Sign Up
        </Link>
      )}
    </nav>
  );
};

export default Navbar;