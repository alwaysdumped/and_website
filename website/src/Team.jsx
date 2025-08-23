// src/Team.jsx
import React from "react";

// Existing team member data for "The PoRs" section
const teamData = [
  {
    role: "COSTAAN",
    name: "SACHIT LANKA",
    insta: "@sachit_lanka",
    image : "/images/sachit.jpg"
  },
  {
    role: "COSSACN",
    name: "HAVISH KADAVERU",
    insta: "@kadaveru_havish",
    image: "/images/havish.jpg"
  },
  {
    role: "STUCCAN",
    name: "HARINI YADAVILLI",
    insta: "@harini_yadavilli",
    image: "/images/harini.jpg"
  },
];

const Team = () => {
  return (
    <>
      <title>Team - Arts & Deco</title>
      <meta name="description" content="Meet the Department of Arts & Deco team." />

      <div className="page-container team-page-container">
        
        <div className="team-tagline-section">
          <h1 className="contact-tagline">
            WE DO<br />
            THIS NOT<br />
            BECAUSE<br />
            IT IS<br />
            EASY BUT<br />
            BECAUSE<br />
            WE<br />
            THOUGHT<br />
            IT WOULD<br />
            BE EASY
          </h1>
        </div>

        <div className="team-content-section">
          <section className="team-section">
            <h2 className="team-section-heading">The Team</h2>
            <div className="main-team-photo-wrapper">
              <img src="/images/main-team-photo.jpg" alt="The Arts & Deco Team" />
            </div>
          </section>

          <section className="team-section">
            <h2 className="team-section-heading">The PoRs</h2>
            <div className="team-members-list">
              {teamData.map((member) => (
                <div key={member.name} className="team-member-card">
                  <div className="member-image-wrapper">
                    <img src={member.image} alt={member.name} className="member-image" />
                  </div>
                  <div className="member-details">
                    <p className="member-role">&#9830; {member.role}</p>
                    <p className="member-name">{member.name}</p>
                    <a 
                      href={`https://www.instagram.com/${member.insta.substring(1)}/`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="member-contact"
                    >
                      <svg className="insta-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919 4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/></svg>
                        <span>{member.insta}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
    </>
  );
};

export default Team;