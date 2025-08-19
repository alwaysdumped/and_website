import React from "react";
import GridItem from "./GridItem";

const WorksGrid = () => {
  return (
    <section className="works-grid">
      <GridItem
        label="ATMOS"
        bgImage="/images/work1.jpg"
        textBgImage="/images/text-work1.jpg"
      />
      <GridItem
        label="ARENA"
        bgImage="/images/work2.jpg"
        textBgImage="/images/text-work2.jpg"
      />
      <GridItem
        label="PEARL"
        bgImage="/images/work3.jpg"
        textBgImage="/images/text-work3.jpg"
      />
      <GridItem
        label="OTHER"
        bgImage="/images/work4.jpg"
        textBgImage="/images/text-work4.jpg"
      />
    </section>
  );
};

export default WorksGrid;