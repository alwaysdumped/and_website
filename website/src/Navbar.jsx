import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ scrollToWorks }) => {
  const location = useLocation();

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleWorksClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      if (scrollToWorks) {
        scrollToWorks();
      }
    }
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <Link to="/" className="logo" onClick={handleHomeClick}>
          LOGO
        </Link>
      </div>

      {/* Center: Links */}
      <div className="navbar-center">
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

      {/* Right: Sign Up button */}
      <div className="navbar-right">
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
