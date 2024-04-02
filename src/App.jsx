import React, { useEffect } from "react";
import "./style.css";

function App() {
  const [city, setCity] = React.useState("");
  const [weather, setWeather] = React.useState(null);

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
          const location = await geocodingResponse.json();

          const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${location[0].lat}&lon=${location[0].lon}&units=${units}&exclude=${part}&appid=${APIkey}`;
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

  const handleSearch = () => {
    setCity(document.getElementById("city").value);
  };

  return (
    <main>
      <div className="app-container">
        <h1>Weather App</h1>
        <p>This is a simple weather app using the OpenWeather API.</p>
        <input type="text" placeholder="Berlin" id="city" />
        <button onClick={handleSearch}>Search</button>
        <p>{weather && JSON.stringify(weather.current.temp)}</p>
        <p></p>
      </div>
    </main>
  );
}

export default App;
