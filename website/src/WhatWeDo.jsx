// src/WhatWeDo.jsx
import React, { memo } from "react";

const WhatWeDo = () => {
  return (
    <section className="what-we-do">
      <h2>What We Do</h2>
      <p>
        We transform spaces across BPHC through creativity and design. From striking murals to large-scale installations and thematic décor, our work shapes the visual identity of campus life. Whether it’s Atmos, Arena, Pearl or any other event, we craft experiences that leave a lasting impression.

      </p>
    </section>
  );
};

export default memo(WhatWeDo);