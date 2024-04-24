import PropTypes from 'prop-types';
import { HourlyForecastData } from '../types/types';
import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import React from 'react';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';

HourlyForecast.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function HourlyForecast({ cityName }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [forecast, setForecast] = useState<HourlyForecastData[]>([
    {
      number: 1,
      name: '',
      startTime: '2024-04-23T00:00:00-04:00',
      endTime: '2024-04-23T20:00:00-04:00',
      isDaytime: false,
      temperature: 62,
      temperatureUnit: 'F',
      temperatureTrend: null,
      probabilityOfPrecipitation: {
        unitCode: 'wmoUnit:percent',
        value: 0,
      },
      dewpoint: {
        unitCode: 'wmoUnit:degC',
        value: 0,
      },
      relativeHumidity: {
        unitCode: 'wmoUnit:percent',
        value: 0,
      },
      windSpeed: '0 mph',
      windDirection: 'S',
      icon: 'https://api.weather.gov/icons/land/night/few,0?size=small',
      shortForecast: 'Mostly Clear',
      detailedForecast: '',
    },
  ]);

  React.useEffect(() => {
    const fetchForecast = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.get(
          `/forecast/${cityName}/hourlyForecast`,
        );
        // console.log(cityName);
        // console.log(response.data);
        // setForecast(response.data);
      } catch (error) {
        console.error('Error fetching forecast', error);
      }
    };

    fetchForecast();
  }, [cityName]);

  function convertTo12HourFormat(time: string): string {
    const date = new Date(time);
    const options = { hour12: true };
    return date.toLocaleString('en-US', options).split(',')[1].trim();
    // .replace('0', '')
    // .replace(':', '');
  }

  // start time -- temperature -- short forecast

  // precip -- wind speed
  // humidity -- wind dir
  return (
    <>
      <ThemeProvider theme={theme}>
        {forecast.map((data, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5" color="secondary">
                {convertTo12HourFormat(data.startTime)}&nbsp;&nbsp;&nbsp;
                {data.shortForecast}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {data.temperature}&deg;F
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography>
                  Precipitation: {data.probabilityOfPrecipitation.value}%
                </Typography>
                <Typography>
                  &nbsp;&nbsp;&nbsp;Wind Speed: {data.windSpeed}
                </Typography>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography>
                  Humidity: {data.relativeHumidity.value}%
                </Typography>
                <Typography>
                  &nbsp;&nbsp;&nbsp;Wind Direction: {data.windDirection}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </ThemeProvider>
    </>
  );
}

export default HourlyForecast;
