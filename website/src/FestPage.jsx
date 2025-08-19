// src/FestPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import GridItem from "./GridItem";
import "./styles.css";

const STRAPI_URL = "http://localhost:1337";

const FestPage = () => {
  const { festName } = useParams(); // festName here is the slug, e.g., 'atmos'
  const [fest, setFest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFestData = async () => {
      try {
        const response = await fetch(
          `${STRAPI_URL}/api/event-years?populate=*&filters[fest][slug][$eq]=${festName}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.data.length > 0) {
            const festDisplayName = data.data[0].attributes.fest.data.attributes.name;
            setFest({ name: festDisplayName, years: data.data });
        } else {
            // Handle case where the fest exists but has no years yet.
            const festResponse = await fetch(`${STRAPI_URL}/api/fests?filters[slug][$eq]=${festName}`);
            const festData = await festResponse.json();
            if (festData.data.length > 0) {
                 setFest({ name: festData.data[0].attributes.name, years: [] });
            } else {
                 setFest(null); // No fest found
            }
        }
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch fest data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchFestData();
  }, [festName]);

  if (loading) {
    return <div className="page-container"><h2>Loading...</h2></div>;
  }
  if (error) {
    return <div className="page-container"><h2>Error: {error}</h2></div>;
  }
  if (!fest) {
    return <div className="page-container"><h2>Fest not found!</h2></div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{fest.name}</h1>
      <section className="works-grid">
        {fest.years.length > 0 ? fest.years.map((item) => (
          <Link key={item.id} to={`/fest/${festName}/${item.attributes.year}`} className="grid-item-link">
            <GridItem
              label={item.attributes.label}
              bgImage={`${STRAPI_URL}${item.attributes.bgImage.data.attributes.url}`}
              textBgImage={`${STRAPI_URL}${item.attributes.textBgImage.data.attributes.url}`}
            />
          </Link>
        )) : <p style={{textAlign: 'center'}}>No events found for this fest yet.</p>}
      </section>
    </div>
  );
};

export default FestPage;