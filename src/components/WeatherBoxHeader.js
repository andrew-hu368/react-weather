import React from "react";

const WeatherBoxHeader = ({ header }) => {
  const { headerStyle } = styles;
  return (
    <div style={headerStyle} className="text-center p-3">
      {header}
    </div>
  );
};

const styles = {
  headerStyle: {
    fontSize: "1rem",
    color: "#333"
  }
};

export default WeatherBoxHeader;
