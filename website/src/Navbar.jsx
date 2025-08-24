// src/Navbar.jsx
import React, { useState, useContext, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollContext } from "./ScrollContext";

const Navbar = ({ isSticky, isHomePage, isWorksPage, isMinified, isMinimizedOnHome, isLogoHidden }) => {
  const location = useLocation();
  const { showSignupInNav, isWorkGridAligned, isMobile } = useContext(ScrollContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isApplyNowPage = location.pathname === '/apply-now';
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
      <nav className={`navbar ${isSticky ? "navbar-scrolled" : ""} ${isHomePage && isMinimizedOnHome ? "home-scroll" : ""} ${isSticky && isWorksPage ? "works-page-scrolled" : ""} ${location.pathname === '/apply-now' ? "navbar-apply-now" : ""} ${isMinified ? "navbar-minified" : ""}`}>
        <div className="navbar-right desktop-nav">

          {!isMobile && (
            <div className="desktop-controls-group">
              <div className="pre-nav-wrapper">
                {/* MODIFIED: Home button now appears if not on homepage OR if logo is hidden */}
                {(!isHomePage || isLogoHidden) && (
                  <Link to="/" onClick={handleHomeClick} className="pre-nav-link">
                    Home
                  </Link>
                )}
                {shouldShowOurWorks && (
                  <Link to="/#works" className="pre-nav-link">
                    Our Works
                  </Link>
                )}
                {!isTeamPage && (
                  <Link to="/team" onClick={handleTeamClick} className="pre-nav-link">
                    Team
                  </Link>
                )}
              </div>
              
              {isTeamPage ? (
                 <Link to="/apply-now" className="signup-btn">
                  Apply Now
                 </Link>
              ) : (
                !isApplyNowPage && (
                  <Link
                    to="/apply-now"
                    className={`signup-btn nav-signup-btn ${showSignupInNav ? 'visible' : 'hidden'}`}
                  >
                    Apply Now
                  </Link>
                )
              )}
            </div>
          )}
        </div>

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