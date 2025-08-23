// src/GridItem.jsx
import React, { memo } from "react";

const GridItem = ({ label, bgImage, textBgImage }) => {
  const isScrolling = Array.isArray(textBgImage) && textBgImage.length > 1;

  const textFillStyle = {};
  if (isScrolling) {
    textFillStyle.backgroundImage = textBgImage.map((url) => `url(${url})`).join(',');
    textFillStyle.backgroundSize = `${80 * textBgImage.length}% auto`;
  } else if (textBgImage) {
    textFillStyle.backgroundImage = `url(${textBgImage})`;
  }

  const textFillClassName = `grid-text text-image-fill ${isScrolling ? 'scrolling' : ''}`;

  return (
    <div className="grid-item">
      {bgImage && (
        <img 
          src={bgImage} 
          alt="" 
          className="grid-bg-img" 
          loading="lazy" /* MODIFIED: Added lazy loading */
        />
      )}

      <h1 className="grid-text text-hover-target">{label}</h1>
      <h1 className="grid-text text-visible">{label}</h1>
      <h1
        className={textFillClassName}
        style={textFillStyle}
      >
        {label}
      </h1>

      <div className="overlay"></div>
    </div>
  );
};

export default memo(GridItem);