// src/Team.jsx
import React from "react";

const Team = () => {
  return (
    <>
      <title>Team - Arts & Deco</title>
      <meta name="description" content="Get in touch with the Department of Arts & Deco." />

      {/* MODIFIED: Renamed className to match new CSS */}
      <div className="page-container team-page-container">
        <h1 className="page-title">Our Team</h1>
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

export default Team;