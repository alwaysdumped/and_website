// src/WorksGrid.jsx
import React, { memo } from "react";
import { Link } from "react-router-dom";
import GridItem from "./GridItem";

const WorksGrid = () => {
  const works = [
    {
      label: "ATMOS",
      bgImage: "/images/atmos/atmos-main-bg.jpg",
      textBgImage: [
        "/images/text-work3.jpg",
        "/images/atmos/atmos-scroll-1.jpg",
      ],
    },
    {
      label: "ARENA",
      bgImage: "/images/work2.jpg",
      textBgImage: ["/images/arena25str.jpg","/images/pearl-2024-cover.jpg"
      ],
    },
    {
      label: "PEARL",
      bgImage: "/images/work3.jpg",
      textBgImage: ["/images/pearl24at2.jpg", "/images/pearl-2024-cover.jpg"],
    },
    {
      label: "OTHER",
      bgImage: "/images/work4.jpg",
      textBgImage: ["/images/text-work2.jpg", "/images/other-2024-cover.jpg"],
    },
  ];

  return (
    <section className="works-grid">
      {works.map((work) => {
        const linkPath =
          work.label === "OTHER"
            ? "/works/other/2024"
            : `/works/${work.label.toLowerCase()}`;

        return (
          <Link key={work.label} to={linkPath} className="grid-item-link">
            <GridItem
              label={work.label}
              bgImage={work.bgImage}
              textBgImage={work.textBgImage}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default memo(WorksGrid);