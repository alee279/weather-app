import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import forecastRouter from './routes/forecast'
import { getCityNames, updateForecastDataForAllCities } from './data';

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();

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

const openai = new OpenAI({apiKey: 'sk-proj-LNK5zZxyXESIlThUZpmVT3BlbkFJG9CQnECmueaWEEMal8Kt'});

async function getRec(forecast: DailyForecastData ) {
  console.log(forecast)
  const res =  openai.chat.completions.create({
    messages: [{
      "role": "system",
      "content": "Give advice on what is best to wear on a given day based on the forecast given to you"
    },
    {
      "role": "user",
      "content": JSON.stringify(forecast)
    }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1
  });
  console.log(res)
  return res
}

app.post("/get-rec", async (req, res) => {
  try {
    const response = await getRec(req.body);
    return res.status(200).send("hi");
    return res.status(200).send(JSON.stringify(response.choices[0].message.content));
  } catch (error) {
    console.error('Error fetching response:', error);
    return res.status(500).send('Error fetching response');
  }
});


app.get('/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

app.use('/forecast', forecastRouter)

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
