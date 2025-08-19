// src/Footer.jsx

import React from "react";

const Footer = () => {
  const handleHomeClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="contact" className="footer">
      <p>© 2025 Department of Arts & Deco</p>
      <div className="footer-links">
        <a href="#home" onClick={handleHomeClick}>
          Home
        </a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;