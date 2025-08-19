// src/GridItem.jsx

import React from "react";

const GridItem = ({ label, bgImage, textBgImage }) => {
  return (
    <div className="grid-item">
      {/* The blurred background image (remains the same) */}
      {bgImage && (
        <div
          className="grid-bg"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
      )}

      {/* NOTE: The order of the text layers has been changed to fix the hover effect. */}
      {/* z-index in the CSS will handle the correct visual stacking. */}

      {/* Layer 3: INVISIBLE Hover Target (MUST be first in the HTML for the CSS to work) */}
      <h1 className="grid-text text-hover-target">{label}</h1>

      {/* Layer 1: VISIBLE Solid White Text (Bottom visual layer) */}
      <h1 className="grid-text text-visible">{label}</h1>

      {/* Layer 2: The image-filled text that fades in (Middle visual layer) */}
      <h1
        className="grid-text text-image-fill"
        style={textBgImage ? { backgroundImage: `url(${textBgImage})` } : {}}
      >
        {label}
      </h1>

      {/* The dark overlay (remains the same) */}
      <div className="overlay"></div>
    </div>
  );
};

export default GridItem;