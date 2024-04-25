import PropTypes from 'prop-types';
import { DailyForecastData, NightTempData } from '../types/types';
import { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import axios from 'axios';

DayForecast.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function DayForecast({ cityName }) {
  const [forecast, setForecast] = useState<DailyForecastData[]>([]);
  const [lowTemps, setLowTemps] = useState<NightTempData[]>([]);

  React.useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `/forecast/${cityName}/weeklyForecast`,
        );
        setForecast(response.data);
      } catch (error) {
        // console.error('Error fetching forecast', error);
      }
    };

    const fetchNightTemps = async () => {
      try {
        const response = await axios.get(
          `/forecast/${cityName}/weeklyNighttimeTemp`,
        );
        setLowTemps(response.data);
      } catch (error) {
        // console.error('Error fetching forecast', error);
      }
    };

    fetchForecast();
    fetchNightTemps();
  }, [cityName]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        {forecast.map((data, index) => {
          const nightTempIndex = index;
          const nightTempData = lowTemps[nightTempIndex];
          return (
            <Card key={index} variant="outlined">
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  {data.name}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  {data.temperature}&nbsp;/&nbsp;
                  {nightTempData && <span>{nightTempData.temperature}</span>}
                </Typography>
                <Typography variant="body1" component="div">
                  {data.shortForecast}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default DayForecast;
