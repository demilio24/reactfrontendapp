import type { LocationData, LocationResponse } from "@/app/typings";
import { getTomorrowDate } from "@/utils/tomorrowDate";

type Props = {
  location: LocationData;
};
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

export default async function SuntrackTable({ location }: Props) {
  const tomorrowDate: string = getTomorrowDate();
  let data: LocationResponse = initData;
  let tomorrowData: LocationResponse = initData;
  try {
    const res = await fetch(
      `https://api.sunrisesunset.io/json?lat=${location?.lat}&lng=${location?.lng}`,
      { method: "POST", cache: "no-store" }
    );
    const tomorrowRes = await fetch(
      `https://api.sunrisesunset.io/json?lat=${location?.lat}&lng=${location?.lng}&date=${tomorrowDate}`,
      { method: "POST", cache: "no-store" }
    );
    if(!res.ok || !tomorrowRes.ok){
      throw new Error();
    }
    const results = await res.json();
    const tomorrowResults = await tomorrowRes.json();

    data = results.results;
    tomorrowData = tomorrowResults.results;
  } catch (err) {
    console.log("Error Ecountered: " + err);
  }

  return (
    <>
      <h2 className="text-center text-xl">{location.cityName}</h2>
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
            <td className="text-center col-span-2">
              {tomorrowData.day_length}
            </td>
          </tr>
          <tr className="h-10 grid grid-cols-5">
            <td className="text-right">Solar Noon</td>
            <td className="text-center col-span-2">{data.solar_noon}</td>
            <td className="text-center col-span-2">
              {tomorrowData.solar_noon}
            </td>
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
