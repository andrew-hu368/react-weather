import React from "react";

const WeatherBoxBody = props => {
  const weatherIcon = setWeatherIcon(props.weather);
  const gradientColor = setGradientColor(props.weather);
  const styles = {
    bodyStyle: {
      background: gradientColor.primary,
      background: `-webkit-linear-gradient(45deg, ${gradientColor.primary}, ${
        gradientColor.secondary
      })`,
      background: `linear-gradient(45deg, ${gradientColor.primary}, ${
        gradientColor.secondary
      })`,
      fontSize: "5rem",
      color: "#fff"
    }
  };
  const { bodyStyle } = styles;
  return (
    <div style={bodyStyle} className="py-4 text-center">
      <i className={weatherIcon} />
    </div>
  );
};

const setWeatherIcon = weatherDesc => {
  switch (weatherDesc) {
    case "Clear":
      return "far fa-sun";
    case "Clouds":
      return "fas fa-cloud";
    case "Atmosphere":
      return "fas fa-bars";
    case "Snow":
      return "fas fa-snowflake";
    case "Rain":
      return "fas fa-cloud-sun-rain";
    case "Drizzle":
      return "fas fa-cloud-showers-heavy";
    case "Thunderstorm":
      return "fas fa-bolt";
    default:
      return "far fa-sun";
  }
};

const setGradientColor = weatherDesc => {
  switch (weatherDesc) {
    case "Clear":
      return { primary: "#F7971E", secondary: "#ffd200" };
    case "Clouds":
      return { primary: "#1f1c2c", secondary: "#928dab" };
    case "Atmosphere":
      return { primary: "#83a4d4", secondary: "#b6fbff" };
    case "Snow":
      return { primary: "#1c92d2", secondary: "#f2fcfe" };
    case "Rain":
      return { primary: "#c2e59c", secondary: "#64b3f4" };
    case "Drizzle":
      return { primary: "#2980b9", secondary: "#2c3e50" };
    case "Thunderstorm":
      return { primary: "#1f1c2c", secondary: "#928dab" };
    default:
      return { primary: "#1f1c2c", secondary: "#928dab" };
  }
};

export default WeatherBoxBody;
