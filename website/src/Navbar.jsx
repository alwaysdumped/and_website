// src/Navbar.jsx
import React, { useState, useContext, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollContext } from "./ScrollContext";

const Navbar = ({ isSticky, isHomePage, isMinified }) => {
  const location = useLocation();
  const { showSignupInNav, isWorkGridAligned } = useContext(ScrollContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isTeamPage = location.pathname === '/team';

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

  const shouldShowOurWorks = isHomePage ? !isWorkGridAligned : true;

  return (
    <>
      <nav className={`navbar ${isSticky ? "navbar-scrolled" : ""} ${isSticky && isHomePage ? "home-scroll" : ""} ${location.pathname === '/apply-now' ? "navbar-apply-now" : ""} ${isMinified ? "navbar-minified" : ""}`}>
        <div className="navbar-right desktop-nav">
          <ul className="nav-links">
            {(isSticky || !isHomePage) && (
              <li>
                <Link to="/" onClick={handleHomeClick} className="animated-nav-link">
                  <p>Home</p>
                </Link>
              </li>
            )}
            {shouldShowOurWorks && (
              <li>
                <Link to="/#works" className="animated-nav-link">
                  <p>Our Works</p>
                </Link>
              </li>
            )}
            {isTeamPage ? (
              <li>
                <Link to="/apply-now" className="signup-btn">
                  Apply Now
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/team" onClick={handleTeamClick} className="animated-nav-link">
                  <p>Team</p>
                </Link>
              </li>
            )}
          </ul>

          {!isTeamPage && location.pathname !== "/apply-now" && (
            <Link
              to="/apply-now"
              className={`signup-btn nav-signup-btn ${showSignupInNav ? 'visible' : 'hidden'}`}
            >
              Apply Now
            </Link>
          )}
        </div>

        <button className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <div className={`mobile-nav-menu ${isMenuOpen ? 'open' : ''}`}>
        {/* MODIFIED: Added an explicit close button */}
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