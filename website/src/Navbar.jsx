// src/Navbar.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollContext } from "./App";

const Navbar = ({ scrollToWorks, isSticky, isSignupPage }) => {
  const location = useLocation();
  const { showSignupInNav } = useContext(ScrollContext);
  
  // ADDED: A variable to check if we are on the contact page
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

  return (
    <nav className={`navbar ${isSticky ? "navbar-scrolled" : ""} ${isSignupPage ? "navbar-signup" : ""}`}>
      {/* MODIFIED: The .with-button class is now disabled on the contact page */}
      <div className={`navbar-right ${showSignupInNav && !isContactPage ? 'with-button' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={handleHomeClick}>Home</Link>
          </li>
          <li>
            <Link to="/#works" onClick={handleWorksClick}>Our Works</Link>
          </li>
          
          {/* MODIFIED: Conditionally render Contact link or Sign Up button */}
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

      {/* MODIFIED: This button is now hidden on the contact page as well */}
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