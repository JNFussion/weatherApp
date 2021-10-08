import { forecastFactory, weatherLocationFactory } from "./weather";

const App = (() => {
  const suggestedCitiesList = [
    weatherLocationFactory(
      { lon: -3.70256, lat: 40.4165 },
      "Madrid",
      "ES",
      "metric"
    ),
    weatherLocationFactory(
      { lon: 2.3486, lat: 48.853401 },
      "Paris",
      "FR",
      "metric"
    ),
    weatherLocationFactory(
      { lon: 13.41053, lat: 52.524368 },
      "Berlin",
      "DE",
      "metric"
    ),
    weatherLocationFactory(
      { lon: -0.12574, lat: 51.50853 },
      "London",
      "GB",
      "metric"
    ),
    weatherLocationFactory(
      { lon: -74.005966, lat: 40.714272 },
      "New York City",
      "US",
      "imperial"
    ),
    weatherLocationFactory(
      { lon: 37.606667, lat: 55.761665 },
      "Moscow",
      "RU",
      "metric"
    ),
    weatherLocationFactory(
      { lon: 139.691711, lat: 35.689499 },
      "Tokyo",
      "JP",
      "metric"
    ),
    weatherLocationFactory(
      { lon: -99.127663, lat: 19.428471 },
      "Mexico City",
      "MX",
      "metric"
    ),
  ];

  const getCity = (cityName) =>
    suggestedCitiesList.find((c) => c.name == cityName);

  const fetchForecast = async (coord, units) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,alerts&appid=${process.env.API_KEY}&units=${units}`,
      { mode: "cors" }
    );
    const data = await response.json();

    return data;
  };

  const findMatches = async (cityName) => {
    const response = await fetch("../src/assets/data/city.list.json");
    const cities = await response.json();
    const find = await cities.reduce((results, city) => {
      if (city.name === cityName) {
        results.push([city.coord, city.name, city.country]);
      }
      return results;
    }, []);
    return find;
  };
  const submitForm = async (cityName, units) => {
    const results = await findMatches(cityName);
    return Promise.all(
      results.map(async (match) =>
        weatherLocationFactory(
          match[0],
          match[1],
          match[2],
          units,
          forecastFactory(await fetchForecast(match[0], units))
        )
      )
    );
  };

  return { getCity, submitForm, findMatches, fetchForecast };
})();

export default App;
