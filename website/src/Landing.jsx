// src/Landing.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ScrollContext } from "./App";

const Landing = () => {
  const { showSignupInNav } = useContext(ScrollContext);

  return (
    <section id="home" className="landing">
      <div className="landing-content">
      </div>

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
