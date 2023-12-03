export type LocationData = {
    id: number;
    cityName: string;
    lat: number;
    lng: number;
}

export type LocationResponse = {
  date: string;
  sunrise: string;
  sunset: string;
  first_light: string;
  last_light: string;
  dawn: string;
  dusk: string;
  solar_noon: string;
  golden_hour: string;
  day_length: string;
  timezone: string;
  utc_offset: number;
};