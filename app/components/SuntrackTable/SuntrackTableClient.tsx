"use client";
import type { LocationResponse } from "@/app/typings";

import { getTomorrowDate } from "@/utils/tomorrowDate";
import { useEffect, useState } from "react";

const initData: LocationResponse = {
  date: "",
  sunrise: "",
  sunset: "",
  first_light: "",
  last_light: "",
  dawn: "",
  dusk: "",
  solar_noon: "",
  golden_hour: "",
  day_length: "",
  timezone: "",
  utc_offset: 0,
};

export default function SuntrackTableNavigator() {
  const [data, setData] = useState<LocationResponse>(initData);
  const [tomorrowData, setTomorrowData] = useState<LocationResponse>(initData);

  useEffect(() => {
    if (!navigator) return;
    const geolocation: Geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const tomorrow = getTomorrowDate();

      const res = await fetch( `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}`, { method: "POST", cache:"no-store" });
      const tomorrowRes = await fetch( `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=${tomorrow}`, {method:"POST", cache:"no-store"});

      const {results: tempData}: {results: LocationResponse}  = await res.json();
      const {results: tempTomorrowData}: {results: LocationResponse} = await tomorrowRes.json();

      setData(tempData);
      setTomorrowData(tempTomorrowData);

    });
  }, []);

  return (
    <>
      <h2 className="text-center text-xl">Your Location</h2>
      <table className="w-full mt-10">
        <thead className="grid">
          <tr className="h-10 grid grid-cols-5">
            <th className="text-right">No</th>
            <th className="text-center col-span-2">Today</th>
            <th className="text-center col-span-2">Tomorrow</th>
          </tr>
        </thead>
        <tbody className="grid">
          <tr className="h-10 grid grid-cols-5">
            <td className="text-right">Sunrise</td>
            <td className="text-center col-span-2">{data.sunrise}</td>
            <td className="text-center col-span-2">{tomorrowData.sunrise}</td>
          </tr>
          <tr className="h-11 grid grid-cols-5">
            <td className="text-right">Sunset</td>
            <td className="text-center col-span-2">{data.sunset}</td>
            <td className="text-center col-span-2">{tomorrowData.sunset}</td>
          </tr>
          <tr className="h-10 grid grid-cols-5">
            <td className="text-right">Dawn</td>
            <td className="text-center col-span-2">{data.dawn}</td>
            <td className="text-center col-span-2">{tomorrowData.dawn}</td>
          </tr>
          <tr className="h-10 grid grid-cols-5">
            <td className="text-right">Dusk</td>
            <td className="text-center col-span-2">{data.dusk}</td>
            <td className="text-center col-span-2">{tomorrowData.dusk}</td>
          </tr>
          <tr className="h-10 grid grid-cols-5">
            <td className="text-right">Day Length</td>
            <td className="text-center col-span-2">{data.day_length}</td>
            <td className="text-center col-span-2">{tomorrowData.day_length}</td>
          </tr>
          <tr className="h-10 grid grid-cols-5">
            <td className="text-right">Solar Noon</td>
            <td className="text-center col-span-2">{data.solar_noon}</td>
            <td className="text-center col-span-2">{tomorrowData.solar_noon}</td>
          </tr>
          <tr className="h-10 grid grid-cols-5">
            <td className="text-right">Timezone</td>
            <td className="text-center col-span-2">{data.timezone}</td>
            <td className="text-center col-span-2">{tomorrowData.timezone}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
