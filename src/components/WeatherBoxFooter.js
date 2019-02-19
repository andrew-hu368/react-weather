import React from "react";

const WeatherBoxFooter = ({ tempMin, tempMax }) => {
  const { tempMaxStyle, tempMinStyle } = styles;
  return (
    <div className="text-center p-3">
      <span style={tempMaxStyle}>{Number(tempMax).toFixed(2)}&deg;C</span>{" "}
      <span style={tempMinStyle}>{Number(tempMin).toFixed(2)}&deg;C</span>
    </div>
  );
};

const styles = {
  tempMaxStyle: {
    color: "rgb(51,51,51)"
  },
  tempMinStyle: {
    color: "#a1a1a1"
  }
};

export default WeatherBoxFooter;
