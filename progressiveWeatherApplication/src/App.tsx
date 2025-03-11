import { useState } from "react";
import { fetchWeather } from "./api/featchWeather";
import "./App.css";

const App = () => {

  interface WeatherData {
    main: {
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    name: string;
    sys: {
      country: string;
    };
  }

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      console.log(data);
      setQuery("");
    }
  }
  
  return (
    <div className="main-container">
      <input type="text" className="search" placeholder="Enter city name" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
      {weather?.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.humidity)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;