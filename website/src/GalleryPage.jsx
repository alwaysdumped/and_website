// src/GalleryPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { worksData } from "./data";

const GalleryPage = () => {
  const { festName, year } = useParams();
  const festData = worksData[festName];
  const yearData = festData ? festData[year] : null;

  // Capitalize fest name for display
  const capitalizedFestName = festName.charAt(0).toUpperCase() + festName.slice(1);

  if (!yearData) {
    return (
      <div className="page-container">
        <h1 className="page-title">Gallery Not Found</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to={`/works/${festName}`}>{capitalizedFestName}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{`${capitalizedFestName} ${year}`}</h1>
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/works/${festName}`}>{capitalizedFestName}</Link> / <span>{year}</span>
      </div>
      <div className="masonry-gallery">
        {yearData.images.map((image) => (
          <div key={image.id} className="masonry-item">
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
