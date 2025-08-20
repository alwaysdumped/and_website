// src/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="footer">
      <p>© 2025 Department of Arts & Deco</p>
      <div className="footer-links">
        <Link to="/" onClick={handleHomeClick}>
          Home
        </Link>
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
};

export default Footer;