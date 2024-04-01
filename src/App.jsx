import React from "react";
import "./style.css";

function App() {
  const [city, setCity] = React.useState([
    {
      name: "Bautzen - Budyšin",
      local_names: {
        sl: "Budišin",
        feature_name: "Bautzen",
        sk: "Budyšín",
        ar: "بوتسن",
        la: "Budissa",
        de: "Bautzen",
        fa: "بوتسن",
        pl: "Budziszyn",
        cs: "Budyšín",
        ru: "Баутцен",
        ascii: "Bautzen",
        uk: "Бауцен",
      },
      lat: 51.1813907,
      lon: 14.4275735,
      country: "DE",
      state: "Saxony",
    },
  ]);

  const [weather, setWeather] = React.useState([
    {
      lat: 51.1814,
      lon: 14.4276,
      timezone: "Europe/Berlin",
      timezone_offset: 7200,
      current: {
        dt: 1712003165,
        sunrise: 1711946227,
        sunset: 1711992881,
        temp: 12.28,
        feels_like: 11.42,
        pressure: 1000,
        humidity: 71,
        dew_point: 7.18,
        uvi: 0,
        clouds: 100,
        visibility: 10000,
        wind_speed: 8.22,
        wind_deg: 256,
        wind_gust: 13.5,
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n",
          },
        ],
      },
    },
  ]);

  const APIkey = "f8182c0d84ffb542cf45f3485a0cc6de";
  const limit = "1";
  const part = "daily,hourly,minutely,alerts";
  let cityName = "";
  let lat = 0;
  let lon = 0;

  function CheckWeather() {
    cityName = document.getElementById("city").value;

    const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${APIkey}`;

    fetch(locationUrl)
      .then((response) => response.json())
      .then((data) => {
        setCity(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  React.useEffect(() => {
    lat = city[0].lat;
    lon = city[0].lon;

    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${part}&appid=${APIkey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [city]);

  return (
    <main>
      <div className="app-container">
        <h1>Weather App</h1>
        <p>This is a simple weather app using the OpenWeather API.</p>
        <input type="text" placeholder="Bautzen" id="city" />
        <button onClick={CheckWeather}>Search</button>
      </div>
    </main>
  );
}

export default App;
