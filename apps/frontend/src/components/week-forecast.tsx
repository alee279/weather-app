import PropTypes from 'prop-types';
import { DailyForecastData, NightTempData } from '../types/types';
import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
  Button,
} from '@mui/material';
import React from 'react';
import axios from 'axios';
import DayForecast from './day-forecast';

WeekForecast.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function WeekForecast({ cityName }) {
  const [forecast, setForecast] = useState<DailyForecastData[]>([]);
  const [lowTemps, setLowTemps] = useState<NightTempData[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );

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

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedCardIndex(null);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        {forecast.map((data, index) => {
          // Calculate the index of the nighttime temperature data corresponding to the forecast end time
          const nightTempIndex = index;
          const nightTempData = lowTemps[nightTempIndex];
          return (
            <Card
              key={index}
              variant="outlined"
              onClick={() => handleCardClick(index)}
              style={{ width: '180px' }}
            >
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  {data.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  H: {data.temperature}&nbsp;&nbsp;&nbsp;
                  {nightTempData && <span>L: {nightTempData.temperature}</span>}
                </Typography>
                <Typography variant="body1" component="div">
                  {data.shortForecast}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Modal open={selectedCardIndex !== null} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            {forecast[selectedCardIndex]?.name}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {/* Render additional details or content of the modal */}
            {/* You can access selected card's data using forecast[selectedCardIndex] */}
          </Typography>
          <DayForecast></DayForecast>
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </>
  );
}

export default WeekForecast;
