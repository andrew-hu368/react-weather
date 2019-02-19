import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import WeatherContainer from "./components/WeatherContainer";
import WeatherBoxSingleDay from "./components/WeatherBoxSingleDay";
import "./App.css";

class App extends Component {
  state = {
    weather5Day: null
  };

  componentDidMount() {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=Hong%20Kong&APPID=d6ca8ac8f26664db3cefa8552c698bc6&units=metric"
    )
      .then(res => res.json())
      .then(data => this.formatData(data));
  }

  render() {
    if (this.state.weather5Day !== null) {
      return (
        <div className="container">
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <WeatherContainer
                    {...props}
                    weather5Day={this.state.weather5Day}
                  />
                )}
              />
              <Route
                path="/forecast/:day"
                render={props => (
                  <WeatherBoxSingleDay
                    {...props}
                    weather5Day={this.state.weather5Day}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }

    return <div className="container">Loading App...</div>;
  }

  formatData(data) {
    const weather5Day = {};
    const weatherCondition = {};

    data.list.forEach(el => {
      const date = new Date(el.dt_txt);
      const dateString = date.toDateString();
      const hourString = date.toTimeString();
      const hourlyInfo = {
        hour: hourString,
        temp_max: el.main.temp_max,
        temp_min: el.main.temp_max,
        weather: el.weather[0].main,
        weather_desc: el.weather[0].description
      };

      if (weather5Day[dateString] === undefined) {
        weather5Day[dateString] = {
          time: dateString,
          temp_max: null,
          temp_min: null,
          weather: null,
          hourly_info: []
        };
      }

      if (weatherCondition[dateString] === undefined) {
        weatherCondition[dateString] = {};
      }

      if (weatherCondition[dateString][el.weather[0].main] === undefined) {
        weatherCondition[dateString][el.weather[0].main] = 1;
      } else {
        weatherCondition[dateString][el.weather[0].main] += 1;
      }

      if (
        el.main.temp_max > weather5Day[dateString].temp_max ||
        weather5Day[dateString].temp_max === null
      ) {
        weather5Day[dateString].temp_max = el.main.temp_max;
      }

      if (
        el.main.temp_min < weather5Day[dateString].temp_min ||
        weather5Day[dateString].temp_min === null
      ) {
        weather5Day[dateString].temp_min = el.main.temp_min;
      }

      weather5Day[dateString].hourly_info.push(hourlyInfo);
    });

    Object.keys(weatherCondition).forEach(day => {
      let weatherDesc = "Clear";
      Object.keys(weatherCondition[day]).forEach(weather => {
        if (
          weatherCondition[day][weather] >= weatherCondition[day][weatherDesc]
        ) {
          weatherDesc = weather;
          weather5Day[day].weather = weather;
        }
      });
    });

    this.setState({ weather5Day: Object.values(weather5Day) });
  }
}

export default App;
