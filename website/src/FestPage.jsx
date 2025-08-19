// src/FestPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { worksData } from "./data";
import GridItem from "./GridItem";

const FestPage = () => {
  const { festName } = useParams();
  const festData = worksData[festName];

  // Capitalize the first letter of the fest name for the title
  const pageTitle = festName.charAt(0).toUpperCase() + festName.slice(1);

  if (!festData) {
    return (
      <div className="page-container">
        <h1 className="page-title">Fest Not Found</h1>
      </div>
    );
  }

  // Get the years and sort them in descending order (newest first)
  const years = Object.keys(festData).sort((a, b) => b - a);

  return (
    <div className="page-container">
      <h1 className="page-title">{pageTitle}</h1>
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>{pageTitle}</span>
      </div>
      {/* MODIFIED: Using a new "fest-grid" class for a 3-column layout */}
      <section className="fest-grid">
        {years.map((year) => {
          const yearData = festData[year];
          return (
            <Link key={year} to={`/works/${festName}/${year}`} className="grid-item-link">
              <GridItem
                label={`${pageTitle} ${year}`}
                bgImage={yearData.coverImage}
                textBgImage={yearData.coverImage} // Using cover image for text fill as well
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default FestPage;
