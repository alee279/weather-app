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

// get forecast of current hour
export async function getCurrForecast(cityName: string): Promise<unknown> {
  const city = cities.find((c: City) => c.city === cityName);
  if (!city) {
    console.error(`City '${cityName}' not found`);
    return null;
  }

  try {
    const response = await axios.get(city.hourlyForecast);
    return response.data.properties.periods[0];
      } catch (error) {
    console.error('Error fetching daily forecast:', error);
    throw error; 
  }
}

// get 24 hr forecast
export async function getHourlyForecast(cityName: string): Promise<unknown> {
  const city = cities.find((c: City) => c.city === cityName);

  if (!city) {
    console.error(`City '${cityName}' not found`);
    return null;
  }

  try {
    const response = await axios.get(city.hourlyForecast);
    return response.data.properties.periods.slice(0, 12);
  } catch (error) {
    console.error('Error fetching daily forecast:', error);
    throw error; 
  }
}

// get daytime forecast for week
export async function getWeeklyDaytimeForecast(cityName: string): Promise<unknown> {
  const city = cities.find((c: City) => c.city === cityName);

  if (!city) {
    console.error(`City '${cityName}' not found`);
    return null;
  }

  try {
    const response = await axios.get(city.dailyForecast);
    const periods = response.data.properties.periods;
    return periods.filter(period => period.isDaytime);
  } catch (error) {
    console.error('Error fetching daily forecast:', error);
    throw error;
  }
}

// get nighttime temp for the week
export async function getWeeklyNighttimeTemp(cityName: string): Promise<unknown> {
  const city = cities.find((c: City) => c.city === cityName);

  if (!city) {
    console.error(`City '${cityName}' not found`);
    return null;
  }

  try {
    const response = await axios.get(city.dailyForecast);
    const periods = response.data.properties.periods;
    return periods.filter(period => !period.isDaytime).map(period => ({
      startTime: period.startTime,
      temperature: period.temperature
    }));
  } catch (error) {
    console.error('Error fetching daily forecast:', error);
    throw error;
  }
}

// get hourly precipitation precentages
export async function getHourlyPrecipitation(cityName: string): Promise<unknown> {
  const city = cities.find((c: City) => c.city === cityName);

  if (!city) {
    console.error(`City '${cityName}' not found`);
    return null;
  }

  try {
    const response = await axios.get(city.hourlyForecast);
    return response.data.properties.periods.map(period => ({
      startTime: period.startTime,
      precipitation: period.probabilityOfPrecipitation
    }));
  } catch (error) {
    console.error('Error fetching daily forecast:', error);
    throw error; 
  }
}

// get hourly precipitation precentages
export async function getHourlyTemp(cityName: string): Promise<unknown> {
  const city = cities.find((c: City) => c.city === cityName);

  if (!city) {
    console.error(`City '${cityName}' not found`);
    return null;
  }

  try {
    const response = await axios.get(city.hourlyForecast);
    return response.data.properties.periods.map(period => ({
      startTime: period.startTime,
      temperature: period.temperature
    }));
  } catch (error) {
    console.error('Error fetching daily forecast:', error);
    throw error; 
  }
}