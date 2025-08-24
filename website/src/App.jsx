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
  const [isNavbarStickyOnHome, setIsNavbarStickyOnHome] = useState(false);
  const [showSignupInNav, setShowSignupInNav] = useState(false);
  const [isWorkGridAligned, setIsWorkGridAligned] = useState(false);
  const [isTeamPageScrolled, setIsTeamPageScrolled] = useState(false);
  const [isNavbarOverlappingContent, setIsNavbarOverlappingContent] = useState(false);
  // MODIFIED: Added new state for scrolling on fest/gallery pages
  const [isScrolledOnWorksPage, setIsScrolledOnWorksPage] = useState(false);
  const logoRef = useRef(null);
  const galleryRef = useRef(null);

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
    const isWorksPage = location.pathname.startsWith('/works/');
    const isGalleryPage = isWorksPage && location.pathname.split('/').length === 4;

    const handleHomeScroll = () => {
      const logoEl = logoRef.current;
      const worksGridEl = worksRef.current;
      if (logoEl && worksGridEl) {
        const logoRect = logoEl.getBoundingClientRect();
        const gridRect = worksGridEl.getBoundingClientRect();
        setIsNavbarStickyOnHome(logoRect.bottom > gridRect.top);
        if (gridRect.top === 0) return;
        const stickyNavHeight = 60;
        const isExactlyAligned = Math.abs(gridRect.top - stickyNavHeight) < 2;
        setIsWorkGridAligned(isExactlyAligned);
      }
      setShowSignupInNav(window.scrollY > 300);
    };
    
    const handleTeamScroll = () => {
      setIsTeamPageScrolled(window.scrollY > 50);
    };

    const handleGalleryScroll = () => {
      const navbarMinifiedHeight = 55;
      const galleryEl = galleryRef.current;
      const hasScrolled = window.scrollY > 0;
      if (galleryEl) {
        const galleryRect = galleryEl.getBoundingClientRect();
        const isPhysicallyOverlapping = galleryRect.top <= navbarMinifiedHeight;
        setIsNavbarOverlappingContent(hasScrolled && isPhysicallyOverlapping);
      }
    };
    
    // MODIFIED: New scroll handler for fest/gallery pages
    const handleWorksScroll = () => {
      setIsScrolledOnWorksPage(window.scrollY > 50);
    };

    // Reset all scroll-related states on route change
    setIsNavbarStickyOnHome(false);
    setIsTeamPageScrolled(false);
    setIsNavbarOverlappingContent(false);
    setIsScrolledOnWorksPage(false);
    
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

    if (isGalleryPage) {
      window.addEventListener("scroll", handleGalleryScroll);
      handleGalleryScroll();
      // Also attach the works scroll handler for navbar visibility
      window.addEventListener("scroll", handleWorksScroll);
      handleWorksScroll();
      return () => {
        window.removeEventListener("scroll", handleGalleryScroll);
        window.removeEventListener("scroll", handleWorksScroll);
      }
    }
    
    // MODIFIED: Attach handler for FestPage (and non-gallery works pages)
    if (isWorksPage) {
      window.addEventListener("scroll", handleWorksScroll);
      handleWorksScroll();
      return () => window.removeEventListener("scroll", handleWorksScroll);
    }

    setShowSignupInNav(false);
    setIsWorkGridAligned(false);
    
  }, [location, worksRef, galleryRef]);

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isApplyNowPage = location.pathname === '/apply-now';
  const isTeamPage = location.pathname === '/team';
  const isHomePage = location.pathname === '/';
  const isWorksPage = location.pathname.startsWith('/works/');

  const isNavbarSticky = () => {
    if (isHomePage) {
      return isNavbarStickyOnHome;
    }
    if (isTeamPage) {
      return isTeamPageScrolled;
    }
    // MODIFIED: Navbar on fest/gallery pages is sticky only after scrolling
    if (isWorksPage) {
      return isScrolledOnWorksPage;
    }
    // Default for Apply Now and other potential pages
    return isApplyNowPage;
  };

  const contextValue = {
    showSignupInNav,
    isWorkGridAligned,
    galleryRef
  };

  const isLogoHidden = (isTeamPageScrolled || isNavbarOverlappingContent) || (isHomePage && isNavbarStickyOnHome);

  return (
    <ScrollContext.Provider value={contextValue}>
      <Link
        to="/"
        ref={logoRef}
        className={`main-logo ${!isLogoHidden ? "" : "logo-hidden"}`}
        onClick={handleLogoClick}
      >
        <img src="/images/and_logo.png" alt="Company Logo" />
      </Link>

      <Navbar
        isSticky={isNavbarSticky()}
        isHomePage={isHomePage}
        isMinified={isTeamPageScrolled || isNavbarOverlappingContent}
      />

      <main>
        <Outlet />
      </main>
      
      {!isTeamPage && <Footer isApplyNowPage={isApplyNowPage} isTeamPage={isTeamPage} />}
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