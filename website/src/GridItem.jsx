// src/GridItem.jsx
import React from "react";

const GridItem = ({ label, bgImage, textBgImage }) => {
  return (
    <div className="grid-item">
      {/* MODIFIED: Replaced background div with an img tag for better control */}
      {bgImage && (
        <img src={bgImage} alt="" className="grid-bg-img" />
      )}

      <h1 className="grid-text text-hover-target">{label}</h1>
      <h1 className="grid-text text-visible">{label}</h1>
      <h1
        className="grid-text text-image-fill"
        style={textBgImage ? { backgroundImage: `url(${textBgImage})` } : {}}
      >
        {label}
      </h1>

      <div className="overlay"></div>
    </div>
  );
};

export default GridItem;