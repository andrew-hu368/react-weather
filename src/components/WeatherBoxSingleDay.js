import React from "react";
import WeatherBoxHourly from "./WeatherBoxHourly";

const WeatherBoxSingleDay = props => {
  const { singleDayStyle } = styles;
  const weather = props.weather5Day.filter(el => {
    if (props.match.params.day === el.time) {
      return el;
    }
  })[0];

  return (
    <div style={singleDayStyle}>
      <h1 className="text-center my-lg-5 my-md-3">
        Weather forecast for {props.match.params.day}
      </h1>
      <div className="d-flex flex-row justify-content-lg-around">
        {weather.hourly_info.map(el => {
          return (
            <WeatherBoxHourly hourlyWeather={el} key={el.hour.slice(0, 5)} />
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  singleDayStyle: {
    boxRadius: "5px",
    background: "#fff"
  }
};

export default WeatherBoxSingleDay;
