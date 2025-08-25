// src/Team.jsx
import React, { useContext } from "react";
import { ScrollContext } from "./ScrollContext";

const teamData = [
  {
    role: "COSTAAN",
    name: "SACHIT LANKA",
    insta: "@sachit_lanka",
    image: "/images/sachit.jpg"
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
  const { isMobile } = useContext(ScrollContext);

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
                isMobile ? (
                  // CARD DESIGN FOR MOBILE
                  <div key={member.name} className="team-member-card">
                    <div className="member-image-wrapper">
                      <img src={member.image} alt={member.name} className="member-image" />
                    </div>
                    <div className="member-details">
                      <p className="member-name">{member.name}</p>
                      <div className="member-role-container">
                        <p className="member-role">{member.role}</p>
                        <a 
                          href={`https://www.instagram.com/${member.insta.substring(1)}/`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="member-contact"
                        >
                          <svg className="insta-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                          <span className="member-insta-handle">{member.insta}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  // CARD DESIGN FOR DESKTOP
                  <article key={member.name} className="article-wrapper">
                    <div 
                      className="rounded-lg container-project"
                      style={{ backgroundImage: `url(${member.image})` }}
                    ></div>
                    <div className="project-info">
                      <div className="project-title">{member.name}</div>
                      <div className="project-bottom-row">
                        <div className="types">
                          <span className="project-type">{member.role}</span>
                        </div>
                        <a 
                          href={`https://www.instagram.com/${member.insta.substring(1)}/`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-hover"
                          aria-label={`Visit ${member.name}'s Instagram`}
                        >
                          <svg className="insta-icon" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </article>
                )
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Team;