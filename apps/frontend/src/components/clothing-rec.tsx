import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { DailyForecastData } from '../types/types';
import axios from 'axios';
import { Card, Typography } from '@mui/material';

GetRec.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function GetRec({ cityName }) {
  const [forecast, setForecast] = useState<DailyForecastData>();
  const [rec, setRec] = useState('Asking GPT...');

  useEffect(() => {
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

    const fetchRec = async () => {
      try {
        const response = await axios.post('/forecast/get-rec', forecast);
        setRec(response.data);
      } catch (error) {
        console.error('Error fetching recommendation', error);
      }
    };

    fetchForecast();
    fetchRec();
  }, [cityName]);

  return (
    <>
      <Card>
        <Typography>Todays Clothing Tip:</Typography>
        <Typography>{rec}</Typography>
      </Card>
    </>
  );
}

export default GetRec;
