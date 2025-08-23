// src/Navbar.jsx
import React, { useContext, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollContext } from "./ScrollContext";

const Navbar = ({ isSticky, isHomePage, isMinified }) => {
  const location = useLocation();
  const { showSignupInNav, isWorkGridAligned } = useContext(ScrollContext);

  const isTeamPage = location.pathname === '/team';

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleTeamClick = (e) => {
    if (location.pathname === "/team") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const shouldShowOurWorks = isHomePage ? !isWorkGridAligned : true;
  const shouldMakeSpaceForButton = (isSticky || (showSignupInNav && isHomePage)) && !isTeamPage && location.pathname !== '/apply-now';


  return (
    <nav className={`navbar ${isSticky ? "navbar-scrolled" : ""} ${isSticky && isHomePage ? "home-scroll" : ""} ${location.pathname === '/apply-now' ? "navbar-apply-now" : ""} ${isMinified ? "navbar-minified" : ""}`}>
      <div className={`navbar-right ${shouldMakeSpaceForButton ? 'with-button' : ''}`}>
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
      </div>

      {location.pathname !== "/apply-now" && !isTeamPage && (
        <Link
          to="/apply-now"
          className={`signup-btn ${showSignupInNav ? 'visible' : 'hidden'}`}
        >
          Apply Now
        </Link>
      )}
    </nav>
  );
};

export default memo(Navbar);