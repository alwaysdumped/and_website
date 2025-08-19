// src/GalleryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { worksData } from "./data";

const GalleryPage = () => {
  const { festName, year } = useParams();
  const festData = worksData[festName];
  const yearData = festData ? festData[year] : null;

  // State to manage the currently selected image for the lightbox
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Capitalize fest name for display
  const capitalizedFestName = festName.charAt(0).toUpperCase() + festName.slice(1);

  // --- Lightbox Logic ---

  // Function to open the lightbox with the clicked image
  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  // Functions to navigate to the next/previous image
  const showNextImage = (e) => {
    e.stopPropagation(); // Prevents the click from closing the lightbox
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

  // Effect to handle keyboard navigation for the lightbox
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
    <div className="page-container">
      <h1 className="page-title">{`${capitalizedFestName} ${year}`}</h1>
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/works/${festName}`}>{capitalizedFestName}</Link> / <span>{year}</span>
      </div>

      {/* --- NEW Google Photos-style Grid --- */}
      <div className="photo-grid">
        {yearData.images.map((image, index) => (
          <div key={image.id} className="photo-grid-item" onClick={() => openLightbox(index)}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>

      {/* --- NEW Lightbox/Modal for Enlarged View --- */}
      {selectedImageIndex !== null && (
        <div className="lightbox-overlay visible" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
          <button className="lightbox-nav lightbox-prev" onClick={showPrevImage}>&#10094;</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={yearData.images[selectedImageIndex].src} alt={yearData.images[selectedImageIndex].alt} />
          </div>
          <button className="lightbox-nav lightbox-next" onClick={showNextImage}>&#10095;</button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
