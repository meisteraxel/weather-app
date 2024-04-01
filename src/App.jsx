import React from "react";
import "./style.css";

function App() {
  const lat = "33.44";
  const lon = "-94.04";
  const part = "hourly,minutely,alerts";
  const APIkey = "f8182c0d84ffb542cf45f3485a0cc6de";

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${APIkey}`;

  function CheckWeather() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <main>
      <div className="app-container">
        <h1>Weather App</h1>
        <p>This is a simple weather app using the OpenWeather API.</p>
        <input type="text" placeholder="Bautzen" />
        <button onClick={CheckWeather}>Search</button>
      </div>
    </main>
  );
}

export default App;
