"use client";

import { useEffect, useState } from "react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Point() {
  return(
    <>
    <span id="point" className="">{":"}</span>
    </>
  )
}

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <>
      <div className="flex flex-col justify-center items-center text-white text-shadow">
        <div className="text-2xl font-bold"> {dayNames[time.getDay()] + " " + time.getDate() + " " + monthNames[time.getMonth()] + " " + time.getFullYear()} </div>
        <div className="text-5xl font-bold">
          <span>{hours < 10 ? `0${hours}`: hours}</span>
          <Point />
          <span>{minutes < 10 ? `0${minutes}`: minutes}</span>
          <Point />
          <span>{seconds < 10 ? `0${seconds}`: seconds}</span>
        </div>
      </div>
    </>
  );
}
