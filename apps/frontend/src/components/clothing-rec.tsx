import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { DailyForecastData } from '../types/types';
import axios from 'axios';
import { Card, Typography } from '@mui/material';
import './styles.css';

GetRec.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function GetRec({ cityName }) {
  // const [forecast, setForecast] = useState<DailyForecastData>();
  const [rec, setRec] = useState('Asking GPT...');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `/forecast/${cityName}/weeklyForecast`,
        );
        return response.data[0];
      } catch (error) {
        console.error('Error fetching forecast', error);
      }
    };

    const fetchRec = async (forecast: DailyForecastData) => {
      try {
        const response = await axios.post('/forecast/get-rec', forecast);
        setRec(response.data);
      } catch (error) {
        console.error('Error fetching recommendation', error);
      }
    };

    fetchForecast().then(fetchRec);
  }, [cityName]);

  return (
    <>
      <Card className="clothing-card">
        <Typography
          variant="h5"
          className="clothing-title"
          style={{ marginBottom: '10px' }}
        >
          Todays Clothing Tip:
        </Typography>
        <Typography className="clothing-text">{rec}</Typography>
      </Card>
    </>
  );
}

export default GetRec;
