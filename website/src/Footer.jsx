// src/Footer.jsx
import React, { memo } from "react";

const Footer = ({ isApplyNowPage, isTeamPage }) => {
  const hasSplitLayout = isApplyNowPage || isTeamPage;
  const useTeamStyle = isTeamPage || isApplyNowPage;

  return (
    <footer className={`footer ${hasSplitLayout ? 'footer-split-layout' : ''} ${useTeamStyle ? 'footer-team' : ''}`}>
      <div className="footer-links">
        {useTeamStyle ? (
          <>
            {/* NEW animated links for the Team & Apply Now Page */}
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
              <span>@and_bphc</span>
            </a>
            <a href="mailto:artsndeco@hyderabad.bits-pilani.ac.in" className="animated-nav-link">
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>artsndeco@hyderabad.bits-pilani.ac.in</span>
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
              <span>@and_bphc</span>
            </a>
            <a href="mailto:artsndeco@hyderabad.bits-pilani.ac.in">
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>artsndeco@hyderabad.bits-pilani.ac.in</span>
            </a>
          </>
        )}
      </div>
    </footer>
  );
};

export default memo(Footer);