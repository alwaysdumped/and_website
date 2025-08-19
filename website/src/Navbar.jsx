import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ scrollToWorks }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      {/* Logo */}
      <Link to="/" className="logo" onClick={handleHomeClick}>
        <img src="/images/logo.png" alt="Company Logo" />
      </Link>

      {/* Right items */}
      <div className="navbar-right">
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

        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;