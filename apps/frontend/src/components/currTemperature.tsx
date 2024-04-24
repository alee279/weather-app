import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import { CurrentForecastData } from '../types/types';

CurrTemperature.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function CurrTemperature({ cityName }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [forecast, setForecast] = React.useState<CurrentForecastData>({
    temperature: 0,
    temperatureUnit: '',
    timeOfDay: '',
    shortForecast: '',
    precipitation: 0,
    windSpeed: 0,
    windDirection: '',
    humidity: 0,
    probabilityOfPrecipitation: {
      unitCode: '',
      value: 0,
    },
    relativeHumidity: {
      unitCode: '',
      value: 0,
    },
    icon: '',
  });

  React.useEffect(() => {
    const fetchForecast = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.get(`/forecast/${cityName}/currForecast`);
        // const response = await axios.get(`http://localhost:8000/forecast/${cityName}/currForecast`);
        // console.log(cityName);
        // console.log(response.data);
        // setForecast(response);
      } catch (error) {
        console.error('Error fetching forecast', error);
      }
    };

    fetchForecast();
  }, [cityName]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', margin: '30px' }}>
        <Card>
          <div
            style={{ display: 'flex', alignItems: 'center', margin: '30px' }}
          >
            <Typography variant="h1" style={{ marginRight: '8px' }}>
              {forecast.temperature}&deg;
            </Typography>
            <Typography variant="h3">{forecast.temperatureUnit}</Typography>
          </div>
        </Card>
      </div>
    </>
  );
}

export default CurrTemperature;
