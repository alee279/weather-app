import express from 'express';
import { getCurrForecast, getHourlyForecast, getHourlyPrecipitation, getHourlyTemp, getWeeklyDaytimeForecast, getWeeklyNighttimeTemp } from '../getForecast';
import { getCityNames } from '../data';

const router = express.Router();

router.get('/:cityName/currForecast', async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const forecastData = await getCurrForecast(cityName);
    res.status(200).send(forecastData);
  } catch (err) {
    console.error('Error fetching forecast URL:', err);
    res.status(500).send('Internal server error');
  }
});

router.get('/:cityName/hourlyForecast', async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const forecastData = await getHourlyForecast(cityName);
    res.status(200).send(forecastData);
  } catch (err) {
    console.error('Error fetching forecast URL:', err);
    res.status(500).send('Internal server error');
  }
});

router.get('/:cityName/weeklyForecast', async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const forecastData = await getWeeklyDaytimeForecast(cityName);
    res.status(200).send(forecastData);
  } catch (err) {
    console.error('Error fetching forecast URL:', err);
    res.status(500).send('Internal server error');
  }
});

router.get('/:cityName/weeklyNighttimeTemp', async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const forecastData = await getWeeklyNighttimeTemp(cityName);
    res.status(200).send(forecastData);
  } catch (err) {
    console.error('Error fetching forecast URL:', err);
    res.status(500).send('Internal server error');
  }
});

router.get('/:cityName/hourlyPrecip', async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const forecastData = await getHourlyPrecipitation(cityName);
    res.status(200).send(forecastData);
  } catch (err) {
    console.error('Error fetching forecast URL:', err);
    res.status(500).send('Internal server error');
  }
});

router.get('/:cityName/hourlyTemp', async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const forecastData = await getHourlyTemp(cityName);
    res.status(200).send(forecastData);
  } catch (err) {
    console.error('Error fetching forecast URL:', err);
    res.status(500).send('Internal server error');
  }
});

router.get('/cityList',  async (req, res) => {
  try {
    const cityNames = getCityNames();
    res.status(200).send(cityNames);
  } catch (err) {
    console.error('Error fetching city names', err);
    res.status(500).send('Internal server error');
  }
});
export default router;
