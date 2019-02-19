import React from "react";
import { Link } from "react-router-dom";
import WeatherBoxHeader from "./WeatherBoxHeader";
import WeatherBoxBody from "./WeatherBoxBody";
import WeatherBoxFooter from "./WeatherBoxFooter";

const WeatherBox = props => {
  return (
    <div className="col-lg mr-lg-4 mx-md-4 mx-lg-0 weatherBox">
      <Link to={`/forecast/${props.weatherInfo.time}`}>
        <WeatherBoxHeader header={props.weatherInfo.time.slice(0, 3)} />
        <WeatherBoxBody weather={props.weatherInfo.weather} />
        <WeatherBoxFooter
          tempMin={props.weatherInfo.temp_min}
          tempMax={props.weatherInfo.temp_max}
        />
      </Link>
    </div>
  );
};

export default WeatherBox;
