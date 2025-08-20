// src/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <>
      {/* // MODIFIED: Replaced Helmet with native React 19 tags */}
      <title>Contact Us - Arts & Deco</title>
      <meta name="description" content="Get in touch with the Department of Arts & Deco." />

      <div className="page-container contact-page-container">
        <h1 className="page-title">Contact Us</h1>
        <div className="contact-content">
          <div className="contact-text">
            <h1 className="contact-tagline">
              WE DO THIS<br />
              NOT<br />
              BECAUSE<br />
              IT IS EASY<br />
              BUT<br />
              BECAUSE WE<br />
              THOUGHT IT<br />
              WOULD BE<br />
              EASY
            </h1>
          </div>
          <div className="image-placeholders">
            <div className="image-placeholder">
              <span>Image 1</span>
            </div>
            <div className="image-placeholder">
              <span>Image 2</span>
            </div>
            <div className="image-placeholder">
              <span>Image 3</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;