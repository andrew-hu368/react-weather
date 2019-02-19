import React from "react";
import WeatherBox from "./WeatherBox";
import WeatherChart from "./WeatherChart";

const WeatherContainer = ({ weather5Day }) => {
  return (
    <div>
      <h1 className="text-center my-lg-5 my-md-3">
        Weather forecast for Hong Kong
      </h1>
      <div className="row">
        {weather5Day.map(el => {
          return <WeatherBox weatherInfo={el} key={el.time} />;
        })}
      </div>
    </div>
  );
};

export default WeatherContainer;
