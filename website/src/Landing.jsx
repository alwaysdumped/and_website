// src/Landing.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ScrollContext } from "./App"; // Import the context

const Landing = () => {
  // Use the context to get the shared state
  const { showSignupInNav } = useContext(ScrollContext);

  return (
    <section id="home" className="landing">
      <div className="landing-content">
      </div>

      {/* ADDED: The initial signup button */}
      {/* It's hidden when the navbar's button is shown */}
      <Link 
        to="/signup"
        className={`signup-btn signup-btn-landing ${showSignupInNav ? 'hidden' : 'visible'}`}
      >
        Sign Up
      </Link>
    </section>
  );
};

export default Landing;