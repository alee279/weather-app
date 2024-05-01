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

HourlyForecast.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function convertTo12HourFormat(time: string): string {
  const date = new Date(time);
  return date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
}

function HourlyForecast({ cityName }) {
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
        const response = await axios.get(
          `/forecast/${cityName}/hourlyForecast`,
        );
        // console.log(cityName);
        // console.log(response.data);
        setForecast(response.data);
      } catch (error) {
        // console.error('Error fetching forecast', error);
      }
    };

    fetchForecast();
  }, [cityName]);

  return (
    <>
      {forecast.map((data, index) => (
        <Accordion key={index} className="hour-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{ width: '50px', marginRight: '40px', marginLeft: '10px' }}
            >
              <Typography variant="body1" color="secondary">
                {convertTo12HourFormat(data.startTime)}
              </Typography>
            </div>
            <div style={{ width: '280px' }}>
              <Typography
                variant="body1"
                color="secondary"
                style={{ textAlign: 'left' }}
              >
                {data.shortForecast}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
            </div>

            <Typography
              variant="body1"
              color="secondary"
              sx={{ marginLeft: '10%' }}
            >
              {data.temperature}&deg;F
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <div className="forecast-details-display">
              {' '}
              <Typography className="blue-light">
                Precipitation: {data.probabilityOfPrecipitation.value}%
              </Typography>
              <Typography className="blue-light">
                &nbsp;&nbsp;&nbsp;Wind Speed: {data.windSpeed}
              </Typography>
            </div>

            <div className="forecast-details-display">
              {' '}
              <Typography className="blue-light">
                Humidity: {data.relativeHumidity.value}%
              </Typography>
              <Typography className="blue-light">
                &nbsp;&nbsp;&nbsp;Wind Direction: {data.windDirection}
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default HourlyForecast;
