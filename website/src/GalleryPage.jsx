// src/GalleryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

const STRAPI_URL = "http://localhost:1337";

const GalleryPage = () => {
  const { festName, year } = useParams();
  const [eventYear, setEventYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      if (!festName || !year) return;

      try {
        const response = await fetch(
          `${STRAPI_URL}/api/event-years?populate=*,fest,galleryImages&filters[fest][slug][$eq]=${festName}&filters[year][$eq]=${year}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          setEventYear(data.data[0].attributes);
        } else {
          setEventYear(null);
        }
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch gallery data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [festName, year]);

  if (loading) {
    return <div className="page-container"><h2>Loading Gallery...</h2></div>;
  }
  if (error) {
    return <div className="page-container"><h2>Error: {error}</h2></div>;
  }
  if (!eventYear) {
    return <div className="page-container"><h2>Gallery not found!</h2></div>;
  }

  const fest = eventYear.fest?.data?.attributes;
  const galleryImages = eventYear.galleryImages?.data || [];

  return (
    <div className="page-container">
      <h1 className="page-title">{eventYear.label} Gallery</h1>
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/fest/${fest?.slug}`}>{fest?.name}</Link> / {eventYear.label}
      </div>
      <div className="masonry-gallery">
        {galleryImages.length > 0 ? (
          galleryImages.map((image) => (
            <div key={image.id} className="masonry-item">
              <img src={`${STRAPI_URL}${image.attributes.url}`} alt={image.attributes.alternativeText || 'Artwork'} />
            </div>
          ))
        ) : (
          <p>No images in this gallery yet.</p>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;