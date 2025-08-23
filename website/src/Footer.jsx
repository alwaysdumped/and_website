// src/Footer.jsx
import React, { memo } from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        {/* IMPORTANT: Replace with your actual Instagram handle and URL */}
        <a 
          href="https://www.instagram.com/yourhandle" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          @yourhandle
        </a>
        
        {/* IMPORTANT: Replace with your actual email address */}
        <a href="mailto:contact@yourdomain.com">
          contact@yourdomain.com
        </a>
      </div>
    </footer>
  );
};

export default memo(Footer);