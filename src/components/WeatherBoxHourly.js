import React from "react";
import WeatherBoxHeader from "./WeatherBoxHeader";
import WeatherBoxBody from "./WeatherBoxBody";
import WeatherBoxFooter from "./WeatherBoxFooter";

const WeatherBoxHourly = ({ hourlyWeather }) => {
  return (
    <div className="weatherBox">
      <WeatherBoxHeader header={hourlyWeather.hour.slice(0, 5)} />
      <WeatherBoxBody weather={hourlyWeather.weather} />
      <WeatherBoxFooter
        tempMin={hourlyWeather.temp_min}
        tempMax={hourlyWeather.temp_max}
      />
    </div>
  );
};

export default WeatherBoxHourly;
