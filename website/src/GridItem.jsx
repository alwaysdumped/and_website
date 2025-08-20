// src/GridItem.jsx
import React from "react";

const GridItem = ({ label, bgImage, textBgImage }) => {
  // ADDED: Check if textBgImage is an array with more than one image
  const isScrolling = Array.isArray(textBgImage) && textBgImage.length > 1;

  // ADDED: Prepare dynamic styles and class names
  const textFillStyle = {};
  if (isScrolling) {
    // If it's an array, join the URLs for the background-image property
    textFillStyle.backgroundImage = textBgImage.map((url) => `url(${url})`).join(',');
    // MODIFIED: Changed multiplier from 100 to 80 to "zoom out" the image
    // Set the background to be a long horizontal strip with proportional height
    textFillStyle.backgroundSize = `${80 * textBgImage.length}% auto`;
  } else if (textBgImage) {
    // Fallback for a single image string
    textFillStyle.backgroundImage = `url(${textBgImage})`;
  }

  // ADDED: Conditionally add a 'scrolling' class
  const textFillClassName = `grid-text text-image-fill ${isScrolling ? 'scrolling' : ''}`;


  return (
    <div className="grid-item">
      {/* MODIFIED: Replaced background div with an img tag for better control */}
      {bgImage && (
        <img src={bgImage} alt="" className="grid-bg-img" />
      )}

      <h1 className="grid-text text-hover-target">{label}</h1>
      <h1 className="grid-text text-visible">{label}</h1>
      <h1
        // MODIFIED: Use the dynamic class and style variables
        className={textFillClassName}
        style={textFillStyle}
      >
        {label}
      </h1>

      <div className="overlay"></div>
    </div>
  );
};

export default GridItem;