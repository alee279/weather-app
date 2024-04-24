import PropTypes from 'prop-types';
import { HourlyForecastData } from '../types/types';
import { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import axios from 'axios';

DayForecast.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function DayForecast({ cityName }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [forecast, setForecast] = useState<HourlyForecastData[]>([]);

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

  return (
    <>
      {forecast.map((data, index) => (
        <Card key={index} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              Forecast {data.startTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start Time: {data.startTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              End Time: {data.endTime}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
