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
import Loader from "./Loader";
import "./styles.css";
import { ScrollContext } from "./ScrollContext";

const ApplyNow = lazy(() => import('./ApplyNow'));
const Team = lazy(() => import('./Team'));
const FestPage = lazy(() => import('./FestPage'));
const GalleryPage = lazy(() => import('./GalleryPage'));

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);
  return matches;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = ({ scrollToWorks, worksRef, whatWeDoRef, landingRef }) => {
  const location = useLocation();
  const [isNavbarVisibleOnHome, setIsNavbarVisibleOnHome] = useState(false);
  const [isNavbarMinimizedOnHome, setIsNavbarMinimizedOnHome] = useState(false);
  const [showSignupInNav, setShowSignupInNav] = useState(false);
  const [isWorkGridAligned, setIsWorkGridAligned] = useState(false);
  const [isTeamPageScrolled, setIsTeamPageScrolled] = useState(false);
  const [isNavbarOverlappingContent, setIsNavbarOverlappingContent] = useState(false);
  const [isScrolledOnWorksPage, setIsScrolledOnWorksPage] = useState(false);
  const [isScrolledOnHome, setIsScrolledOnHome] = useState(false);
  const logoRef = useRef(null);
  const galleryRef = useRef(null);

  const isApplyNowPage = location.pathname === '/apply-now';
  const isTeamPage = location.pathname === '/team';
  const isHomePage = location.pathname === '/';
  const isWorksPage = location.pathname.startsWith('/works/');
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (location.hash === '#works') {
      const timer = setTimeout(() => {
        scrollToWorks && scrollToWorks();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location, scrollToWorks]);

  useEffect(() => {
    const isGalleryPage = isWorksPage && location.pathname.split('/').length === 4;
    const handleHomeScroll = () => {
      setIsScrolledOnHome(window.scrollY > 10);
      
      const landingEl = landingRef.current;
      const worksGridEl = worksRef.current;

      if (landingEl) {
        const landingRect = landingEl.getBoundingClientRect();
        setIsNavbarVisibleOnHome(landingRect.bottom <= 110);
      }
      
      if (worksGridEl) {
        const gridRect = worksGridEl.getBoundingClientRect();
        setIsNavbarMinimizedOnHome(gridRect.top <= 60);

        const stickyNavHeight = 60;
        const isExactlyAligned = Math.abs(gridRect.top - stickyNavHeight) < 2;
        setIsWorkGridAligned(isExactlyAligned);
      }
      
      setShowSignupInNav(window.scrollY > 300);
    };
    const handleTeamScroll = () => setIsTeamPageScrolled(window.scrollY > 50);
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
    const handleWorksScroll = () => setIsScrolledOnWorksPage(window.scrollY > 50);

    setIsNavbarVisibleOnHome(false);
    setIsNavbarMinimizedOnHome(false);
    setIsTeamPageScrolled(false);
    setIsNavbarOverlappingContent(false);
    setIsScrolledOnWorksPage(false);
    setIsScrolledOnHome(false);
    if (!isHomePage) {
      setShowSignupInNav(false);
    }
    
    let cleanupFuncs = [];
    if (isHomePage) {
      window.addEventListener("scroll", handleHomeScroll);
      handleHomeScroll();
      cleanupFuncs.push(() => window.removeEventListener("scroll", handleHomeScroll));
    } 
    if (isTeamPage) {
      window.addEventListener("scroll", handleTeamScroll);
      handleTeamScroll(); 
      cleanupFuncs.push(() => window.removeEventListener("scroll", handleTeamScroll));
    }
    if (isGalleryPage) {
      window.addEventListener("scroll", handleGalleryScroll);
      handleGalleryScroll();
      cleanupFuncs.push(() => window.removeEventListener("scroll", handleGalleryScroll));
    }
    if (isWorksPage) {
      window.addEventListener("scroll", handleWorksScroll);
      handleWorksScroll();
      cleanupFuncs.push(() => window.removeEventListener("scroll", handleWorksScroll));
    }
    setIsWorkGridAligned(false);
    
    return () => cleanupFuncs.forEach(fn => fn());
  }, [location, worksRef, whatWeDoRef, landingRef, isHomePage, isTeamPage, isApplyNowPage, isWorksPage]);

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isNavbarSticky = () => {
    if (isHomePage) return isNavbarVisibleOnHome;
    if (isTeamPage) return isTeamPageScrolled;
    if (isWorksPage) return isScrolledOnWorksPage;
    return isApplyNowPage;
  };

  let isNavbarButtonVisible;
  if (isHomePage) {
    isNavbarButtonVisible = showSignupInNav;
  } else if (isApplyNowPage || isTeamPage) {
    isNavbarButtonVisible = false;
  } else {
    isNavbarButtonVisible = true;
  }

  const contextValue = {
    showSignupInNav: isNavbarButtonVisible,
    isWorkGridAligned,
    galleryRef,
    isMobile,
  };

  const isLogoHidden = 
    (isTeamPageScrolled || isNavbarOverlappingContent) || 
    (!isMobile && isHomePage && isNavbarMinimizedOnHome) ||
    (isMobile && isHomePage && isScrolledOnHome);

  return (
    <ScrollContext.Provider value={contextValue}>
      <Navbar
        isSticky={isNavbarSticky()}
        isHomePage={isHomePage}
        isMinimizedOnHome={isNavbarMinimizedOnHome}
        isMinified={isTeamPageScrolled || isNavbarOverlappingContent}
        isLogoHidden={isLogoHidden} 
      />
      <Link
        to="/"
        ref={logoRef}
        className={`main-logo ${!isLogoHidden ? "" : "logo-hidden"}`}
        onClick={handleLogoClick}
      >
        <img src="/images/and_logo.png" alt="Company Logo" />
      </Link>

      <main>
        <Outlet />
      </main>
      
      <Footer isApplyNowPage={isApplyNowPage} isTeamPage={isTeamPage} />
    </ScrollContext.Provider>
  );
};

const HomePageContent = memo(({ worksRef, whatWeDoRef, landingRef }) => (
  <>
    <title>Arts & Deco</title>
    <meta name="description" content="Official website for the Department of Arts & Deco." />
    <div id="home" ref={landingRef}>
      <Landing />
    </div>
    <div id="what-we-do" ref={whatWeDoRef}>
      <WhatWeDo />
    </div>
    <div id="works" ref={worksRef}>
      <WorksGrid />
    </div>
  </>
));

const App = () => {
  const worksRef = useRef(null);
  const whatWeDoRef = useRef(null);
  const landingRef = useRef(null);

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
      <Suspense 
        fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout scrollToWorks={scrollToWorks} worksRef={worksRef} whatWeDoRef={whatWeDoRef} landingRef={landingRef} />}>
            <Route index element={<HomePageContent worksRef={worksRef} whatWeDoRef={whatWeDoRef} landingRef={landingRef} />} />
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