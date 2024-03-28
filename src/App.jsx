import { useEffect, useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherDisplay from "./WeatherDisplay";

const App = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState("96746");

  const apiKey = "df5235b07d874835b4234937242803";
  const api = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${userLocation}&days=5&aqi=no&alerts=no`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForecast(data.forecast.forecastday);
    }, 1000);
  };

  const fetchWeather = () => {
    return fetch(api)
      .then((res) => res.json())
      .then((d) => {
        console.log("Fetched weather data:", d);
        setData(d);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  useEffect(() => {
    fetchWeather();
  }, [userLocation]);
  console.log(data);
  console.log(userLocation);

  return (
    <div>
      <h2>Weather Forecast</h2>
      <WeatherForm
        handleSubmit={handleSubmit}
        loading={loading}
        setLoading={setLoading}
        setUserLocation={setUserLocation}
        userLocation={userLocation}
      />
      {loading && <div>Loading...</div>}
      <WeatherDisplay forecast={forecast} />
    </div>
  );
};

export default App;
