import { format, isToday } from "date-fns";
import Mustache from "mustache";
import App from "./app";
import { forecastFactory } from "./weather";

const domController = (() => {
  const form = document.querySelector("form");
  const cityTemplate = document.getElementById("cityTemplate").innerHTML;
  const searchResultsTemplate = document.getElementById(
    "searchResultsTemplate"
  ).innerHTML;
  const weatherAttachment = {
    "01d": { icon: "fas fa-sun", bg: "clear" },
    "02d": { icon: "fas fa-cloud-sun", bg: "few-clouds" },
    "03d": { icon: "fas fa-cloud", bg: "scattered-clouds" },
    "04d": { icon: "fas fa-cloud", bg: "clouds" },
    "09d": { icon: "fas fa-cloud-showers-heavy", bg: "shower" }, // meteor
    "10d": { icon: "fas fa-cloud-sun-rain", bg: "rain" },
    "11d": { icon: "fas fa-bolt", bg: "thunderstorm" },
    "13d": { icon: "fas fa-snowflake", bg: "snow" },
    "50d": { icon: "fas fa-smog", bg: "mist" },
    "01n": { icon: "fas fa-moon", bg: "clear" },
    "02n": { icon: "fas fa-cloud-moon", bg: "few-clouds" },
    "03n": { icon: "fas fa-cloud", bg: "scattered-clouds" },
    "04n": { icon: "fas fa-cloud", bg: "clouds" },
    "09n": { icon: "fas fa-cloud-showers-heavy", bg: "shower" },
    "10n": { icon: "fas fa-cloud-moon-rain", bg: "rain" },
    "11n": { icon: "fas fa-bolt", bg: "thunderstorm" },
    "13n": { icon: "fas fa-snowflake", bg: "snow" },
    "50n": { icon: "fas fa-smog", bg: "mist" },
  };
  let cachedSearchResults;

  const resolve = (path, obj) => {
    return path.split(".").reduce(function (prev, curr) {
      return prev ? prev[curr] : null;
    }, obj || self);
  };

  const helperTemplateFunctions = {
    icon: function () {
      let self = this;
      return function (iconWeather, render) {
        return render(weatherAttachment[resolve(iconWeather, self)].icon);
      };
    },
    background: function () {
      return weatherAttachment[this.forecast.current.weather.icon].bg;
    },
    stacked: function () {
      return (
        this.forecast.current.weather.icon === "04d" ||
        this.forecast.current.weather.icon === "04n"
      );
    },
    stackedTime: function () {
      return this.weather.icon === "04d" || this.weather.icon === "04n";
    },
    getHour: function () {
      let self = this;
      return function (date, render) {
        return render(format(resolve(date, self), "p"));
      };
    },
    getDayOfWeek: function () {
      return format(this.date, "EEEE");
    },
    isToday: function () {
      return isToday(this.date);
    },
    formatTemp: function () {
      let self = this;
      return function (temp, render) {
        return render((resolve(temp, self) | 0).toString());
      };
    },
  };

  const renderCity = (location) => {
    document.body.innerHTML = Mustache.render(cityTemplate, {
      city: location,
      ...helperTemplateFunctions,
    });
  };

  const renderSearchResults = (listLocation) => {
    document.body.innerHTML = Mustache.render(searchResultsTemplate, {
      cities: listLocation,
      length: listLocation.length,
      ...helperTemplateFunctions,
    });
  };

  const handleSubmission = async (formData) => {
    cachedSearchResults = await App.submitForm(
      formData.get("city-name"),
      formData.get("degree")
    );
    renderSearchResults(cachedSearchResults);
  };

  // EVENTS

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmission(new FormData(e.target));
  });

  document.addEventListener("click", (e) => {
    if (e.target && e.target.className == "suggested-btn") {
      let city = App.getCity(e.target.textContent);
      App.fetchForecast(city.coord, city.units).then((result) => {
        city.forecast = forecastFactory(result);
        renderCity(city);
      });
    }
    if (e.target && e.target.id.startsWith("city-result")) {
      renderCity(
        cachedSearchResults.find(
          (c) =>
            c.coord.lat == e.target.dataset.lat &&
            c.coord.lon == e.target.dataset.lon
        )
      );
    }
  });
})();
