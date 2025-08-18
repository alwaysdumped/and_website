import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Landing from "./Landing";
import WhatWeDo from "./WhatWeDo";
import WorksGrid from "./WorksGrid";
import Footer from "./Footer";
import SignUp from "./SignUp";
import "./styles.css";

const App = () => {
  const worksRef = useRef(null);

  const scrollToWorks = () => {
    worksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route
          path="/"
          element={
            <>
              <Navbar scrollToWorks={scrollToWorks} />
              <Landing />
              <WhatWeDo />
              <div ref={worksRef}>
                <WorksGrid />
              </div>
              <Footer />
            </>
          }
        />

        {/* Signup page */}
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <SignUp />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
