// src/App.jsx
import React, { useRef, useState, useEffect, createContext, useContext, Suspense, lazy, memo } from "react";
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
import "./styles.css";

// Lazily import page components for code-splitting
const SignUp = lazy(() => import('./SignUp'));
const Contact = lazy(() => import('./Contact'));
const FestPage = lazy(() => import('./FestPage'));
const GalleryPage = lazy(() => import('./GalleryPage'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const ScrollContext = createContext();

const Layout = ({ scrollToWorks }) => {
  const location = useLocation();
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [showSignupInNav, setShowSignupInNav] = useState(false);

  useEffect(() => {
    if (location.hash === '#works') {
      setTimeout(() => {
        const worksElement = document.getElementById('works');
        if (worksElement) {
          worksElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
    
    const handleScroll = () => {
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
      setShowSignupInNav(window.scrollY > 300); 
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    } else {
      setIsLogoVisible(true);
      setShowSignupInNav(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isSignupPage = location.pathname === '/signup';
  const isHomePage = location.pathname === '/';

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
        isSticky={!isLogoVisible || isSignupPage || location.pathname.startsWith('/works')}
        isSignupPage={isSignupPage}
        isHomePage={isHomePage}
      />

      <main>
        <Outlet />
      </main>
      <Footer />
    </ScrollContext.Provider>
  );
};

const HomePageContent = memo(({ worksRef }) => (
  <>
    <title>Arts & Deco</title>
    <meta name="description" content="Official website for the Department of Arts & Deco." />
    <Landing />
    <WhatWeDo />
    <div id="works" ref={worksRef}>
      <WorksGrid />
    </div>
  </>
));

const App = () => {
  const worksRef = useRef(null);
  const scrollToWorks = () => {
    worksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div className="page-container"><h1>Loading...</h1></div>}>
        <Routes>
          <Route path="/" element={<Layout scrollToWorks={scrollToWorks} />}>
            <Route index element={<HomePageContent worksRef={worksRef} />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="contact" element={<Contact />} />
            <Route path="works/:festName" element={<FestPage />} />
            <Route path="works/:festName/:year" element={<GalleryPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;