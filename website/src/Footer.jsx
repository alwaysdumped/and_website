// src/Footer.jsx
import React, { memo } from "react";

const Footer = ({ isApplyNowPage, isTeamPage }) => {
  const hasSplitLayout = isApplyNowPage || isTeamPage;

  return (
    <footer className={`footer ${hasSplitLayout ? 'footer-split-layout' : ''} ${isTeamPage ? 'footer-team' : ''}`}>
      <div className="footer-links">
        {isTeamPage ? (
          <>
            {/* NEW animated links for the Team Page */}
            <a 
              href="https://www.instagram.com/and_bphc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="animated-nav-link"
            >
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <p>@and_bphc</p>
            </a>
            <a href="mailto:artsndeco@hyderabad.bits-pilani.ac.in" className="animated-nav-link">
              {/* MODIFIED: Replaced the filled mail icon with an outlined version */}
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <p>artsndeco@hyderabad.bits-pilani.ac.in</p>
            </a>
          </>
        ) : (
          <>
            {/* ORIGINAL links for all other pages */}
            <a 
              href="https://www.instagram.com/and_bphc" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              @and_bphc
            </a>
            <a href="mailto:artsndeco@hyderabad.bits-pilani.ac.in">
              {/* MODIFIED: Replaced the filled mail icon with an outlined version */}
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              artsndeco@hyderabad.bits-pilani.ac.in
            </a>
          </>
        )}
      </div>
    </footer>
  );
};

export default memo(Footer);