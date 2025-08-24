// src/FestPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { worksData } from "./data";
import GridItem from "./GridItem";

const FestPage = () => {
  const { festName } = useParams();
  const festData = worksData[festName];

  const pageTitle = festName.charAt(0).toUpperCase() + festName.slice(1);

  if (!festData) {
    return (
      <div className="page-container">
        <h1 className="page-title">Fest Not Found</h1>
      </div>
    );
  }

  const years = Object.keys(festData).sort((a, b) => b - a);

  return (
    <>
      <title>{pageTitle} Works - Arts & Deco</title>
      <meta name="description" content={`Explore our works from ${pageTitle}.`} />

      {/* MODIFIED: Added a new class for custom mobile padding */}
      <div className="page-container page-container-flush">
        <h1 className="page-title">{pageTitle}</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>{pageTitle}</span>
        </div>
        <section className="fest-grid">
          {years.map((year) => {
            const yearData = festData[year];
            
            const coverImage = Array.isArray(yearData.coverImage)
              ? yearData.coverImage
              : [yearData.coverImage];

            return (
              <Link key={year} to={`/works/${festName}/${year}`} className="grid-item-link">
                <GridItem
                  label={year}
                  bgImage={yearData.background}
                  textBgImage={coverImage}
                />
              </Link>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default FestPage;