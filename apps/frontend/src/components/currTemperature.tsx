import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import { HourlyForecastData } from '../types/types';

CurrTemperature.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function CurrTemperature({ cityName }) {
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

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h1">{forecast.temperature}&deg;</Typography>
            <Typography variant="h3">{forecast.temperatureUnit}</Typography>
          </div>
        </Card>
      </div>
    </>
  );
}

export default CurrTemperature;
