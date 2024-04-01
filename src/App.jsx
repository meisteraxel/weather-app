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

  const [weather, setWeather] = React.useState([]);

  const APIkey = "f8182c0d84ffb542cf45f3485a0cc6de";
  const limit = "1";
  const part = "hourly,minutely,alerts";
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

    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${APIkey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(weather);
  }, [city]);

  return (
    <main>
      <div className="app-container">
        <h1>Weather App</h1>
        <p>This is a simple weather app using the OpenWeather API.</p>
        <input type="text" placeholder="Bautzen" id="city" />
        <button onClick={CheckWeather}>Search</button>
        <p></p>
      </div>
    </main>
  );
}

export default App;
