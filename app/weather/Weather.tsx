"use client";
import { useEffect, useState } from "react";
import type { WeatherData } from "./typings";

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  useEffect(() => {
    if (!navigator) return;
    const geolocation: Geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=1149dd8a70254b349ca154331230312&q=${lat},${lng}&aqi=no`,
        {
          cache: "no-store",
        }
      );
      const tempWeatherData: WeatherData = await res.json();
      setWeatherData(tempWeatherData);
    });
  }, []);

  return (
    <>
    {weatherData && (
      <div>
        <h2 className="text-3xl">Current Weather </h2>
        <div className="grid grid-cols-2 mt-6">
          <p>Country: </p> <p>{weatherData.location.country}</p>
          <p>Name: </p> <p>{weatherData.location.name}</p>
          <p>Region: </p> <p>{weatherData.location.region}</p>
          <p>Temp: </p> <p>{weatherData.current.temp_c} C / {weatherData.current.temp_f} F</p>
          <p>Feels like: </p> <p>{weatherData.current.feelslike_c} C / {weatherData.current.feelslike_f} F</p>
        </div>
      </div>
    )}
    </>
  );
}
