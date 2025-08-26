// src/Navbar.jsx
import React, { useState, memo } from "react";
import { Link, useLocation } from "react-router-dom";

// MODIFIED: Accept new props for page detection
const Navbar = ({ isSticky, isHomePage, isTeamPage, isApplyNowPage, isWorksPage }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleTeamClick = (e) => {
    if (location.pathname === "/team") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <>
      {/* MODIFIED: Apply 'home-scroll' class on all content pages */ }
      <nav className={`navbar ${isSticky ? "navbar-scrolled" : ""} ${(isHomePage || isTeamPage || isApplyNowPage || isWorksPage) && isSticky ? "home-scroll" : ""}`}>
        <button className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
      </nav>

      <div className={`mobile-nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">&times;</button>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={handleHomeClick} className="animated-nav-link">
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/#works" onClick={handleLinkClick} className="animated-nav-link">
              <p>Our Works</p>
            </Link>
          </li>
          <li>
            <Link to="/team" onClick={handleTeamClick} className="animated-nav-link">
              <p>Team</p>
            </Link>
          </li>
          <li>
            <Link to="/apply-now" onClick={handleLinkClick} className="signup-btn">
              Apply Now
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default memo(Navbar);