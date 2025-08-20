// src/GalleryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { worksData } from "./data";

const GalleryPage = () => {
  const { festName, year } = useParams();
  const festData = worksData[festName];
  const yearData = festData ? festData[year] : null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const capitalizedFestName = festName.charAt(0).toUpperCase() + festName.slice(1);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    if (selectedImageIndex === null) return;
    const nextIndex = (selectedImageIndex + 1) % yearData.images.length;
    setSelectedImageIndex(nextIndex);
  };

  const showPrevImage = (e) => {
    e.stopPropagation();
    if (selectedImageIndex === null) return;
    const prevIndex = (selectedImageIndex - 1 + yearData.images.length) % yearData.images.length;
    setSelectedImageIndex(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") {
        closeLightbox();
      }
      if (e.key === "ArrowRight") {
        showNextImage(e);
      }
      if (e.key === "ArrowLeft") {
        showPrevImage(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex]);


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
    <>
      {/* // MODIFIED: Replaced Helmet with native React 19 tags */}
      <title>{`${capitalizedFestName} ${year}`} - Arts & Deco</title>
      <meta name="description" content={`Gallery for ${capitalizedFestName} ${year}.`} />

      <div className="page-container">
        <h1 className="page-title">{`${capitalizedFestName} ${year}`}</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to={`/works/${festName}`}>{capitalizedFestName}</Link> / <span>{year}</span>
        </div>

        <div className="photo-grid">
          {yearData.images.map((image, index) => (
            <div key={image.id} className="photo-grid-item" onClick={() => openLightbox(index)}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
        
        {selectedImageIndex !== null && (
          <div className="lightbox-overlay visible" onClick={closeLightbox} role="dialog" aria-modal="true">
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close image viewer">&times;</button>
            <button className="lightbox-nav lightbox-prev" onClick={showPrevImage} aria-label="Previous image">&#10094;</button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={yearData.images[selectedImageIndex].src} alt={yearData.images[selectedImageIndex].alt} />
            </div>
            <button className="lightbox-nav lightbox-next" onClick={showNextImage} aria-label="Next image">&#10095;</button>
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryPage;