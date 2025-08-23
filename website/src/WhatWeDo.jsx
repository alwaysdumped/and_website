// src/WhatWeDo.jsx
import React, { memo } from "react";

const WhatWeDo = () => {
  return (
    <section className="what-we-do">
      <h2>What We Do</h2>
      <p>
        We create amazing events, experiences, and showcases that inspire creativity 
        and bring people together. Our focus is on innovation and impact.
      </p>
    </section>
  );
};

export default memo(WhatWeDo);