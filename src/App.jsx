import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState("");

  const APIkey = "f8182c0d84ffb542cf45f3485a0cc6de";
  const limit = "1";
  const part = "daily,hourly,minutely,alerts";
  const units = "metric";

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${APIkey}`;
          const geocodingResponse = await fetch(geocodingUrl);
          if (!geocodingResponse.ok) {
            throw new Error("Failed to fetch location");
          }
          const locationData = await geocodingResponse.json();
          const location = locationData[0];
          setLocationName(location.name);

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
        <h1>Weather App</h1>
        <p>This is a simple weather app using the OpenWeather API.</p>
        <input
          type="text"
          placeholder="Berlin"
          id="city"
          onKeyDown={keyPress}
        />
        <button onClick={handleSearch}>Search</button>
        <h2>{locationName}</h2>
        <p>{weather && JSON.stringify(weather.current.temp)}</p>
        <p></p>
      </div>
    </main>
  );
}

export default App;
