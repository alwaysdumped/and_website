// src/App.jsx
import React, { useRef, useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import Navbar from "./Navbar";
import Landing from "./Landing";
import WhatWeDo from "./WhatWeDo";
import WorksGrid from "./WorksGrid";
import Footer from "./Footer";
import SignUp from "./SignUp";
import FestPage from "./FestPage"; // ADDED
import GalleryPage from "./GalleryPage"; // ADDED
import "./styles.css";

// Create a Context to share scroll state
export const ScrollContext = createContext();

const Layout = ({ scrollToWorks }) => {
  const location = useLocation();
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [showSignupInNav, setShowSignupInNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Logic for logo visibility
      const logo = document.querySelector(".main-logo");
      const worksGrid = document.querySelector(".works-grid");
      if (logo && worksGrid) {
        const logoRect = logo.getBoundingClientRect();
        const gridRect = worksGrid.getBoundingClientRect();
        const isOverlapping =
          logoRect.bottom > gridRect.top && logoRect.top < gridRect.bottom;
        setIsLogoVisible(!isOverlapping);
      } else {
        setIsLogoVisible(true);
      }
      
      // Logic for signup button transition
      setShowSignupInNav(window.scrollY > 300); 
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    } else {
      // On other pages, reset the scroll-dependent states
      window.removeEventListener("scroll", handleScroll);
      setIsLogoVisible(true);
      setShowSignupInNav(true); 
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isSignupPage = location.pathname === '/signup';

  return (
    <ScrollContext.Provider value={{ showSignupInNav }}>
      <Link
        to="/"
        className={`main-logo ${isLogoVisible ? "" : "logo-hidden"}`}
        onClick={handleLogoClick}
      >
        <img src="/images/and_logo.png" alt="Company Logo" />
      </Link>
      
      <Navbar
        scrollToWorks={scrollToWorks}
        isSticky={!isLogoVisible || location.pathname !== '/'}
        isSignupPage={isSignupPage}
      />

      <main>
        <Outlet />
      </main>
      <Footer />
    </ScrollContext.Provider>
  );
};

const HomePageContent = ({ worksRef }) => (
  <>
    <Landing />
    <WhatWeDo />
    <div ref={worksRef}>
      <WorksGrid />
    </div>
  </>
);

const App = () => {
  const worksRef = useRef(null);
  const scrollToWorks = () => {
    worksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout scrollToWorks={scrollToWorks} />}>
          <Route index element={<HomePageContent worksRef={worksRef} />} />
          <Route path="signup" element={<SignUp />} />
          {/* 👇 UPDATED ROUTES 👇 */}
          <Route path="fest/:festName" element={<FestPage />} />
          <Route path="fest/:festName/:year" element={<GalleryPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;