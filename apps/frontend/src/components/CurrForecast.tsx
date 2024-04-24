import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import { CurrentForecastData } from '../types/types';

CurrForecast.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function CurrForecast({ cityName }) {
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
        const response = await axios.get(`/forecast/${cityName}/currForecast`);
        console.log(cityName);
        console.log(response.data);
        // setForecast(response);
      } catch (error) {
        console.error('Error fetching forecast', error);
      }
    };

    fetchForecast();
  }, [cityName]);

  // short forecast
  // precip -- wind speed
  // humidity -- wind dir
  return (
    <>
      <Card>
        <div style={{ alignItems: 'center', margin: '30px' }}>
          <Typography>{forecast.shortForecast}</Typography>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>
              Precipitation: {forecast.probabilityOfPrecipitation.value}
            </Typography>
            <Typography>
              &nbsp;&nbsp;&nbsp;Wind Speed: {forecast.windSpeed}
            </Typography>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Humidity: {forecast.humidity}</Typography>
            <Typography>
              &nbsp;&nbsp;&nbsp;Wind Direction: {forecast.windDirection}
            </Typography>
          </div>
        </div>
      </Card>
    </>
  );
}

export default CurrForecast;
