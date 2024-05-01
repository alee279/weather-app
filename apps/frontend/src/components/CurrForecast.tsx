import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import { HourlyForecastData } from '../types/types';
import './styles.css';

CurrForecast.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function CurrForecast({ cityName }) {
  const [forecast, setForecast] = React.useState<HourlyForecastData>({
    number: 0,
    name: '',
    startTime: '',
    endTime: '',
    isDaytime: false,
    temperature: 0,
    temperatureUnit: '',
    temperatureTrend: null,
    probabilityOfPrecipitation: {
      unitCode: '',
      value: 0,
    },
    dewpoint: {
      unitCode: '',
      value: 0,
    },
    relativeHumidity: {
      unitCode: '',
      value: 0,
    },
    windSpeed: '',
    windDirection: '',
    icon: '',
    shortForecast: '',
    detailedForecast: '',
  });

  React.useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(`/forecast/${cityName}/currForecast`);

        setForecast(response.data);
      } catch (error) {
        // console.error('Error fetching forecast', error);
      }
    };

    fetchForecast();
  }, [cityName]);

  // temp
  // short forecast
  return (
    <>
      <Card className="temp-card">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Typography variant="h5" className="temp-text">
              {forecast.shortForecast}
            </Typography>
          </div>
          <Typography variant="h1" className="temp-text">
            {forecast.temperature}&deg;
          </Typography>
          <Typography variant="h3" className="temp-text">
            {forecast.temperatureUnit}
          </Typography>
        </div>
      </Card>
      <Card className="forecast-card">
        <div style={{ alignItems: 'center', margin: '30px' }}>
          <Typography variant="h5" className="forecast-detail-title">
            Details:
          </Typography>
          <div className="forecast-details-display">
            <div>
              <Typography
                variant="body1"
                className="forecast-details"
                style={{ fontSize: '1.3rem' }}
              >
                Precipitation: {forecast.probabilityOfPrecipitation.value}%
              </Typography>
              <Typography
                className="forecast-details"
                style={{ fontSize: '1.3rem' }}
              >
                Humidity: {forecast.relativeHumidity.value}%
              </Typography>
            </div>
            <div>
              <Typography
                className="forecast-details"
                style={{ fontSize: '1.3rem' }}
              >
                Wind Speed: {forecast.windSpeed}
              </Typography>
              <Typography
                className="forecast-details"
                style={{ fontSize: '1.3rem' }}
              >
                Wind Direction: {forecast.windDirection}
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default CurrForecast;
