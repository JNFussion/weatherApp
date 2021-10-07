import {
  add,
  fromUnixTime,
  isAfter,
  isBefore,
  isFuture,
  startOfToday,
} from "date-fns";

const forecastFactory = (json) => {
  const hourlyWeather = [];
  const dailyWeather = [];

  json.hourly.forEach((hour) => {
    const time = fromUnixTime(hour.dt);
    if (isFuture(time) && isBefore(time, add(new Date(), { hours: 24 }))) {
      hourlyWeather.push({
        date: time,
        temp: hour.temp,
        weather: hour.weather[0],
      });
    }
  });
  json.daily.forEach((day) => {
    const date = fromUnixTime(day.dt);

    if (
      !isAfter(date, add(new Date(), { days: 8 })) &&
      !isBefore(date, startOfToday())
    ) {
      dailyWeather.push({
        date,
        temp: {
          min: day.temp.min,
          max: day.temp.max,
        },
        weather: day.weather[0],
      });
    }
  });

  return {
    current: {
      sunrise: fromUnixTime(json.current.sunrise),
      sunset: fromUnixTime(json.current.sunset),
      temp: json.current.temp,
      pressure: json.current.pressure,
      humidity: json.current.humidity,
      windSpeed: json.current.wind_speed,
      weather: json.current.weather[0],
    },
    hourly: hourlyWeather,
    daily: dailyWeather,
  };
};

const weatherLocationFactory = (coord, cityName, country, units, forecast) => ({
  name: cityName,
  country,
  coord,
  units,
  forecast,
});

export { weatherLocationFactory, forecastFactory };
