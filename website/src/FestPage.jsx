// src/FestPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { festData } from "./data"; // Import our data
import GridItem from "./GridItem";
import "./styles.css";

const FestPage = () => {
  const { festName } = useParams(); // Gets 'atmos' from the URL '/fest/atmos'
  const fest = festData[festName];

  // Handle case where fest is not found
  if (!fest) {
    return <div className="page-container"><h2>Fest not found!</h2></div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{fest.name}</h1>
      <section className="works-grid">
        {fest.years.map((item) => (
          <Link key={item.year} to={`/fest/${festName}/${item.year}`} className="grid-item-link">
            <GridItem
              label={item.label}
              bgImage={item.bgImage}
              textBgImage={item.textBgImage}
            />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default FestPage;