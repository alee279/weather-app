import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import forecastRouter from './routes/forecast'
import { getCityNames, updateForecastDataForAllCities } from './data';

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();
app.use(express.json())

// updateForecastDataForAllCities()
getCityNames();

interface DailyForecastData {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: string | null;
  probabilityOfPrecipitation: {
    unitCode: string;
    value: number | null;
  };
  dewpoint: {
    unitCode: string;
    value: number;
  };
  relativeHumidity: {
    unitCode: string;
    value: number;
  };
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

const openai = new OpenAI({apiKey: process.env.OPEN_AI_KEY});

async function getRec(forecast: DailyForecastData ) {
  console.log(forecast)
  const res =  openai.chat.completions.create({
    messages: [{
      "role": "system",
      "content": "Give advice in 4 sentences on what is best to wear on a given day based on the forecast given to you"
    },
    {
      "role": "user",
      "content": forecast.detailedForecast ?? forecast.shortForecast
    }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 100,
    top_p: 1
  });
  console.log(res)
  return res
}

app.post("/forecast/get-rec", async (req, res) => {
  try {
    const response = await getRec(req.body);
    // return res.status(200).send("hi");
    return res.status(200).send(JSON.stringify(response.choices[0].message.content));
  } catch (error) {
    console.error('Error fetching response:', error);
    return res.status(500).send('Error fetching response');
  }
});

app.use('/forecast', forecastRouter)

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
