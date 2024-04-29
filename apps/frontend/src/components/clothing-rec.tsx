import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DailyForecastData } from '../types/types';

ClothingRec.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function ClothingRec({ cityName }) {
  const [forecast, setForecast] = useState<DailyForecastData>();
  const [rec, setRec] = useState('Asking ChatGPT...');

  useEffect(() => {
    // get today's daytime forecast by getting first item in week forecast array
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `/forecast/${cityName}/weeklyForecast`,
        );
        setForecast(response.data[0]);
      } catch (error) {
        console.error('Error fetching forecast', error);
      }
    };

    // use 1 forecast as input for getting recommendation
    const fetchRec = async () => {
      try {
        console.log(forecast);
        const response = await axios.post('/get-rec', { forecast: forecast });
        console.log(response);
        setRec(response.data);
      } catch (error) {
        console.error('Error fetching clothing recommendation', error);
      }
    };

    fetchForecast();
    fetchRec();
  }, [cityName, forecast]);

  return (
    <>
      <Card>
        <Typography variant="h5">What to wear today:</Typography>
        <Typography variant="body1">{rec}</Typography>
      </Card>
    </>
  );
}

export default ClothingRec;
