// src/App.jsx
import React, { useRef, useState, useEffect, Suspense, lazy, memo } from "react";
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
import { ScrollContext } from "./ScrollContext";

const ApplyNow = lazy(() => import('./ApplyNow'));
const Team = lazy(() => import('./Team'));
const FestPage = lazy(() => import('./FestPage'));
const GalleryPage = lazy(() => import('./GalleryPage'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = ({ scrollToWorks, worksRef }) => {
  const location = useLocation();
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [showSignupInNav, setShowSignupInNav] = useState(false);
  const [isWorkGridAligned, setIsWorkGridAligned] = useState(false);
  const [isTeamPageScrolled, setIsTeamPageScrolled] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    if (location.hash === '#works') {
      const timer = setTimeout(() => {
        scrollToWorks && scrollToWorks();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location, scrollToWorks]);

  useEffect(() => {
    const isHomePage = location.pathname === '/';
    const isTeamPage = location.pathname === '/team';

    const handleHomeScroll = () => {
      const logoEl = logoRef.current;
      const worksGridEl = worksRef.current;
      if (logoEl && worksGridEl) {
        const logoRect = logoEl.getBoundingClientRect();
        const gridRect = worksGridEl.getBoundingClientRect();
        if (gridRect.top === 0) return;
        const isOverlapping = logoRect.bottom > gridRect.top;
        setIsLogoVisible(!isOverlapping);

        const stickyNavHeight = 60;
        const isExactlyAligned = Math.abs(gridRect.top - stickyNavHeight) < 2;
        setIsWorkGridAligned(isExactlyAligned);
      }
      setShowSignupInNav(window.scrollY > 300);
    };
    
    const handleTeamScroll = () => {
      setIsTeamPageScrolled(window.scrollY > 50);
    };

    setIsLogoVisible(true);
    setIsTeamPageScrolled(false);
    
    if (isHomePage) {
      window.addEventListener("scroll", handleHomeScroll);
      handleHomeScroll(); 
      return () => window.removeEventListener("scroll", handleHomeScroll);
    } 
    
    if (isTeamPage) {
      window.addEventListener("scroll", handleTeamScroll);
      handleTeamScroll(); 
      return () => window.removeEventListener("scroll", handleTeamScroll);
    }

    setShowSignupInNav(false);
    setIsWorkGridAligned(false);
    
  }, [location, worksRef]);

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isApplyNowPage = location.pathname === '/apply-now';
  const isTeamPage = location.pathname === '/team';
  const isHomePage = location.pathname === '/';

  const isNavbarSticky = () => {
    if (isTeamPage) {
      return isTeamPageScrolled;
    }
    return !isLogoVisible || isApplyNowPage || location.pathname.startsWith('/works');
  };

  return (
    <ScrollContext.Provider value={{ showSignupInNav, isWorkGridAligned }}>
      <Link
        to="/"
        ref={logoRef}
        className={`main-logo ${isLogoVisible && !isTeamPageScrolled ? "" : "logo-hidden"}`}
        onClick={handleLogoClick}
      >
        <img src="/images/and_logo.png" alt="Company Logo" />
      </Link>

      <Navbar
        isSticky={isNavbarSticky()}
        isHomePage={isHomePage}
        isMinified={isTeamPageScrolled}
      />

      <main>
        <Outlet />
      </main>
      
      {/* MODIFIED: Reverted change to always render the Footer and pass it the isTeamPage prop */}
      <Footer isApplyNowPage={isApplyNowPage} isTeamPage={isTeamPage} />
    </ScrollContext.Provider>
  );
};

const HomePageContent = memo(({ worksRef }) => (
  <>
    <title>Arts & Deco</title>
    <meta name="description" content="Official website for the Department of Arts & Deco." />
    <div id="home">
      <Landing />
    </div>
    <div id="what-we-do">
      <WhatWeDo />
    </div>
    <div id="works" ref={worksRef}>
      <WorksGrid />
    </div>
  </>
));

const App = () => {
  const worksRef = useRef(null);

  const scrollToWorks = () => {
    const worksGridEl = worksRef.current;
    if (worksGridEl) {
      const stickyNavHeight = 60;
      const elementPosition = worksGridEl.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - stickyNavHeight;

      window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
      });
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div className="page-container"><h1>Loading...</h1></div>}>
        <Routes>
          <Route path="/" element={<Layout scrollToWorks={scrollToWorks} worksRef={worksRef} />}>
            <Route index element={<HomePageContent worksRef={worksRef} />} />
            <Route path="apply-now" element={<ApplyNow />} />
            <Route path="team" element={<Team />} />
            <Route path="works/:festName" element={<FestPage />} />
            <Route path="works/:festName/:year" element={<GalleryPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;