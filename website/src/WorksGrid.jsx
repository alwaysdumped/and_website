// src/WorksGrid.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link
import GridItem from "./GridItem";

const WorksGrid = () => {
  const works = [
    {
      label: "ATMOS",
      bgImage: "/images/work1.jpg",
      // MODIFIED: Changed to an array of images for the scrolling text effect
      textBgImage: [
        "/images/text-work1.png",
        "/images/atmos-2023-cover.jpg",
        "/images/atmos-2024-cover.jpg",
      ],
    },
    {
      label: "ARENA",
      bgImage: "/images/work2.jpg",
      // MODIFIED: Changed to an array of images for the scrolling text effect
      textBgImage: [
        "/images/text-work2.png",
        "/images/arena-2024-cover.jpg",
        "/images/arena-2023-cover.jpg",
      ],
    },
    {
      label: "PEARL",
      bgImage: "/images/work3.jpg",
      // MODIFIED: Changed to an array of images for the scrolling text effect
      textBgImage: ["/images/text-work3.jpg", "/images/pearl-2024-cover.jpg"],
    },
    {
      label: "OTHER",
      bgImage: "/images/work4.jpg",
      // MODIFIED: Changed to an array of images for the scrolling text effect
      textBgImage: ["/images/text-work4.jpg", "/images/other-2024-cover.jpg"],
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