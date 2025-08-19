// src/Navbar.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollContext } from "./App";

const Navbar = ({ scrollToWorks, isSticky, isSignupPage }) => {
  const location = useLocation();
  const { showSignupInNav } = useContext(ScrollContext);

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

  return (
    <nav className={`navbar ${isSticky ? "navbar-scrolled" : ""} ${isSignupPage ? "navbar-signup" : ""}`}>
      {/* MODIFIED: Added a conditional class here */}
      <div className={`navbar-right ${showSignupInNav ? 'with-button' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={handleHomeClick}>Home</Link>
          </li>
          <li>
            <Link to="/" onClick={handleWorksClick}>Our Works</Link>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>

      {/* This button remains positioned absolutely */}
      {location.pathname !== "/signup" && (
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