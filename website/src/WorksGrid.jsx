// src/WorksGrid.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link
import GridItem from "./GridItem";

const WorksGrid = () => {
  const works = [
    {
      label: "ATMOS",
      bgImage: "/images/work1.jpg",
      textBgImage: "/images/text-work1.png",
    },
    {
      label: "ARENA",
      bgImage: "/images/work2.jpg",
      textBgImage: "/images/text-work2.png",
    },
    {
      label: "PEARL",
      bgImage: "/images/work3.jpg",
      textBgImage: "/images/text-work3.jpg",
    },
    {
      label: "OTHER",
      bgImage: "/images/work4.jpg",
      textBgImage: "/images/text-work4.jpg",
    },
  ];

  return (
    <section className="works-grid">
      {/* Map over the works array to create linked grid items */}
      {works.map((work) => (
        <Link
          key={work.label}
          to={`/works/${work.label.toLowerCase()}`}
          className="grid-item-link" // Added a class for styling the link
        >
          <GridItem
            label={work.label}
            bgImage={work.bgImage}
            textBgImage={work.textBgImage}
          />
        </Link>
      ))}
    </section>
  );
};

export default WorksGrid;
