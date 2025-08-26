// src/Team.jsx
import React, { useContext } from "react";
import { ScrollContext } from "./ScrollContext";
import { Link } from 'react-router-dom';
import Footer from './Footer';

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

  const desktopLayout = (
    <div className="split-layout-container">
        <div className="team-tagline-section">
            <h1 className="contact-tagline">
                WE DO<br />THIS NOT<br />BECAUSE<br />IT IS<br />EASY BUT<br />BECAUSE<br />WE<br />THOUGHT<br />IT WOULD<br />BE EASY
            </h1>
        </div>
        <div className="right-column">
            <div className="desktop-button-container">
                <div className="desktop-controls-group">
                    <div className="pre-nav-wrapper">
                        <Link to="/" className="pre-nav-link">Home</Link>
                        <Link to="/#works" className="pre-nav-link">Our Works</Link>
                    </div>
                     <Link to="/apply-now" className="signup-btn">Apply Now</Link>
                </div>
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
                            <article key={member.name} className="article-wrapper">
                                <div className="rounded-lg container-project" style={{ backgroundImage: `url(${member.image})` }}></div>
                                <div className="project-info">
                                    <div className="project-title">{member.name}</div>
                                    <div className="project-bottom-row">
                                        <div className="types">
                                            <span className="project-type">{member.role}</span>
                                        </div>
                                        {/* MODIFIED: Added backticks to the href attribute to fix syntax error */}
                                        <a href={`https://www.instagram.com/${member.insta.substring(1)}/`} target="_blank" rel="noopener noreferrer" className="project-hover">
                                          <svg className="insta-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                          </svg>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
  );

  const mobileLayout = (
    <div className="page-container team-page-container">
        <div className="team-tagline-section">
            <h1 className="contact-tagline">
            WE DO<br />THIS NOT<br />BECAUSE<br />IT IS<br />EASY BUT<br />BECAUSE<br />WE<br />THOUGHT<br />IT WOULD<br />BE EASY
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
                           <img src={member.image} alt={member.name} className="member-image" />
                           <div className="member-details">
                                <div className="member-name">{member.name}</div>
                                <div className="member-role-container">
                                    <div className="member-role">{member.role}</div>
                                    <a href={`https://www.instagram.com/${member.insta.substring(1)}/`} target="_blank" rel="noopener noreferrer" className="member-contact">
                                        <svg className="insta-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    </a>
                                </div>
                           </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </div>
  );

  return (
    <>
      <title>Team - Arts & Deco</title>
      <meta name="description" content="Meet the Department of Arts & Deco team." />
      {isMobile ? mobileLayout : desktopLayout}
    </>
  );
};

export default Team;