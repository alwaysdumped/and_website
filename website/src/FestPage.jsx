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
      {/* // MODIFIED: Replaced Helmet with native React 19 tags */}
      <title>{pageTitle} Works - Arts & Deco</title>
      <meta name="description" content={`Explore our works from ${pageTitle}.`} />

      <div className="page-container">
        <h1 className="page-title">{pageTitle}</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>{pageTitle}</span>
        </div>
        <section className="fest-grid">
          {years.map((year) => {
            const yearData = festData[year];
            return (
              <Link key={year} to={`/works/${festName}/${year}`} className="grid-item-link">
                <GridItem
                  label={`${pageTitle} ${year}`}
                  bgImage={yearData.coverImage}
                  textBgImage={yearData.coverImage}
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