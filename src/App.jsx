import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [city, setCity] = useState("Berlin");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");

  const APIkey = "f8182c0d84ffb542cf45f3485a0cc6de";
  const limit = "1";
  const part = "daily,hourly,minutely,alerts";
  const units = "metric";

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${APIkey}`;
          const geocodingResponse = await fetch(geocodingUrl);
          if (!geocodingResponse.ok) {
            throw new Error("Failed to fetch location");
          }
          const locationData = await geocodingResponse.json();
          const location = locationData[0];
          setLocation(location);

          const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${locationData[0].lat}&lon=${locationData[0].lon}&units=${units}&exclude=${part}&appid=${APIkey}`;
          const weatherResponse = await fetch(weatherUrl);
          if (!weatherResponse.ok) {
            throw new Error("Failed to fetch weather");
          }
          const weatherData = await weatherResponse.json();

          setWeather(weatherData);
        } catch (error) {
          console.error("Error fetching weather data", error);
        }

        document.getElementById("city").value = "";
      };
      fetchWeather();
    }
  }, [city]);

  const keyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setCity(document.getElementById("city").value);
  };

  return (
    <main>
      <div className="app-container">
        <h2>{location.name}</h2>
        <img
          src={
            weather &&
            `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png`
          }
          alt=""
        />
        <p>{weather && weather.current.weather[0].description}</p>
        <p>{weather && weather.current.temp}°C</p>
        <input
          type="text"
          placeholder="Search for city..."
          id="city"
          onKeyDown={keyPress}
        />
      </div>
    </main>
  );
}

export default App;
