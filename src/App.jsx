import React from "react";
import "./style.css";

function App() {
  return (
    <main>
      <div className="app-container">
        <h1>Weather App</h1>
        <p>This is a simple weather app using the OpenWeather API.</p>
        <input type="text" placeholder="Bautzen" />
      </div>
    </main>
  );
}

export default App;
