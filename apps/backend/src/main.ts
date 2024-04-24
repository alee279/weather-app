import express from 'express';
import dotenv from 'dotenv';
import forecastRouter from './routes/forecast'
import { getCityNames, updateForecastDataForAllCities } from './data';

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();

// updateForecastDataForAllCities()
// getCityNames();

app.get('/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

app.use('/forecast', forecastRouter)

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
