// src/GridItem.jsx
import React from "react";

const GridItem = ({ label, bgImage, textBgImage }) => {
  return (
    <div className="grid-item">
      {bgImage && (
        <div
          className="grid-bg"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
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
