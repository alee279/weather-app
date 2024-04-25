import fs from 'fs';
import axios from 'axios';

interface City {
  city: string;
  growth_from_2000_to_2013: string;
  latitude: number;
  longitude: number;
  population: string;
  rank: string;
  state: string;
  dailyForecast: string | null;
  hourlyForecast: string | null;
}

// read in json cities data and parse
const data = fs.readFileSync('data/cities.json', 'utf8');
const cities = JSON.parse(data);

// given a city name, use the lat and long to find the points url that has forecast urls
export async function getForecastURL(cityName: string): Promise<{ dailyForecast: string, hourlyForecast: string } | null> {
  const city = cities.find((c: City) => c.city === cityName);
  
  const latlong = { latitude: city.latitude, longitude: city.longitude };

  if (!latlong) return null;

  try {
      const response = await axios.get(`https://api.weather.gov/points/${latlong.latitude},${latlong.longitude}`);
      const responseData = response.data;
      city.dailyForecast = responseData.properties.forecast;
      city.hourlyForecast = responseData.properties.forecastHourly;
      // fs.writeFileSync('data/cities.json', JSON.stringify(cities, null, 2), 'utf8');

      return { dailyForecast: responseData.properties.forecast, hourlyForecast: responseData.properties.forecastHourly };
  } catch (error) {
      console.error('Error fetching forecast:', error);
      return null;
  }
}

// add forecast urls into json file
export async function updateForecastDataForAllCities(): Promise<void> {

  await Promise.all(cities.map(async (city: City) => {
    try {
      console.log(city.city);
      const forecastData = await getForecastURL(city.city);
      if (forecastData) {
        city.dailyForecast = forecastData.dailyForecast;
        city.hourlyForecast = forecastData.hourlyForecast;
      }
    } catch (error) {
      console.error(`Error updating forecast for ${city.city}:`, error);
    }
  }))

  fs.writeFileSync('data/cities.json', JSON.stringify(cities, null, 2), 'utf8');
}

// get list of city names
export function getCityNames(): string[] {
  const cityNames = cities.map(city => city.city);
  return cityNames
}