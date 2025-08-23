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
    const handleScroll = () => {
      const logoEl = logoRef.current;
      const worksGridEl = worksRef.current;

      if (logoEl && worksGridEl) {
        const logoRect = logoEl.getBoundingClientRect();
        const gridRect = worksGridEl.getBoundingClientRect();

        const isOverlapping = logoRect.bottom > gridRect.top;
        setIsLogoVisible(!isOverlapping);

        const stickyNavHeight = 60;
        const isExactlyAligned = Math.abs(gridRect.top - stickyNavHeight) < 2;
        setIsWorkGridAligned(isExactlyAligned);
      }

      setShowSignupInNav(window.scrollY > 300);
    };

    const isHomePage = location.pathname === '/';
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    } else {
      setIsLogoVisible(true);
      setShowSignupInNav(false);
      setIsWorkGridAligned(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location, worksRef]);

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isApplyNowPage = location.pathname === '/apply-now';
  const isHomePage = location.pathname === '/';

  return (
    <ScrollContext.Provider value={{ showSignupInNav, isWorkGridAligned }}>
      <Link
        to="/"
        ref={logoRef}
        className={`main-logo ${isLogoVisible ? "" : "logo-hidden"}`}
        onClick={handleLogoClick}
      >
        <img src="/images/and_logo.png" alt="Company Logo" />
      </Link>

      <Navbar
        isSticky={!isLogoVisible || isApplyNowPage || location.pathname.startsWith('/works')}
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