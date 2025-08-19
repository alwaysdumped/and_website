// src/Footer.jsx
import React from "react";
// MODIFIED: Imported Link and useLocation
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  // ADDED: Get location to make click handler smarter
  const location = useLocation();

  const handleHomeClick = (e) => {
    // MODIFIED: Only prevent default if already on the homepage
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // On other pages, this function will do nothing, allowing the Link to navigate
  };

  return (
    <footer className="footer">
      <p>© 2025 Department of Arts & Deco</p>
      <div className="footer-links">
        {/* MODIFIED: Changed <a> to <Link> and updated its handler */}
        <Link to="/" onClick={handleHomeClick}>
          Home
        </Link>
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
};

export default Footer;