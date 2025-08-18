import React from "react";

const GridItem = ({ label, bgColor, bgImage }) => {
  return (
    <div className="grid-item" style={{ backgroundColor: bgColor }}>
      {bgImage && (
        <div
          className="grid-bg"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
      )}
      <h1
        className="grid-text"
        style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
      >
        {label}
      </h1>
      <div className="overlay"></div>
    </div>
  );
};

export default GridItem;
