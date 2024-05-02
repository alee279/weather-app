import PropTypes from 'prop-types';
import { DailyForecastData, NightTempData } from '../types/types';
import { useState } from 'react';
import { Card, CardContent, Modal, Typography } from '@mui/material';
import React from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import HourlyPrecip from './hourly-precip';
import HourlyTemp from './hourly-temp';
import { findIcon } from '../icons';

interface details {
  precipitation: number;
  humidity: number;
  windSpeed: string;
  windDirection: string;
  shortForecast: string;
  detailedForecast: string;
  isDaytime: boolean;
}

WeekForecast.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function convertDateFormat(date: string): string {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const newDate = new Date(date);
  const dayOfWeek = daysOfWeek[newDate.getDay()];
  const month = months[newDate.getMonth()];
  const day = newDate.getDate();

  return `${dayOfWeek}, ${month} ${day}`;
}

function WeekForecast({ cityName }) {
  const [forecast, setForecast] = useState<DailyForecastData[]>([]);
  const [nightTemp, setNightTemp] = useState<NightTempData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState<string>('');
  const [openForecast, setOpenForecast] = useState<details>({
    precipitation: 0,
    humidity: 0,
    windSpeed: '',
    windDirection: '',
    shortForecast: '',
    detailedForecast: '',
    isDaytime: true,
  });

  React.useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `/forecast/${cityName}/weeklyForecast`,
        );
        setForecast(response.data);
      } catch (error) {
        console.error('Error fetching forecast', error);
      }
    };

    const fetchNightTemps = async () => {
      try {
        const response = await axios.get(
          `/forecast/${cityName}/weeklyNighttimeTemp`,
        );
        setNightTemp(response.data);
      } catch (error) {
        console.error('Error fetching nighttime temperatures', error);
      }
    };

    fetchForecast();
    fetchNightTemps();
  }, [cityName]);

  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  if (weekdays.includes(forecast[0]?.name)) {
    forecast[0].name = 'Today';
  }

  const handleOpenModal = (date) => {
    setDate(date);
    const filteredEntry = forecast.find((entry) => entry.startTime === date);
    if (filteredEntry) {
      setOpenForecast({
        precipitation:
          filteredEntry.probabilityOfPrecipitation.value ??
          openForecast.precipitation,
        humidity: filteredEntry.relativeHumidity.value ?? openForecast.humidity,
        windSpeed: filteredEntry.windSpeed ?? openForecast.windSpeed,
        windDirection:
          filteredEntry.windDirection ?? openForecast.windDirection,
        shortForecast:
          filteredEntry.shortForecast ?? openForecast.shortForecast,
        detailedForecast:
          filteredEntry.detailedForecast ?? openForecast.detailedForecast,
        isDaytime: filteredEntry.isDaytime ?? openForecast.isDaytime,
      });
    }
    console.log(openForecast);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div style={{ display: 'flex', marginLeft: '30px', marginRight: '30px' }}>
        {forecast.map((data, index) => {
          const nightTemperature = nightTemp.find(
            (item) => item.startTime === data.endTime,
          )?.temperature;
          return (
            <Card
              key={index}
              variant="outlined"
              onClick={() => handleOpenModal(data.startTime)}
              className="day-of-week-card"
              style={{ marginBottom: '30px' }}
            >
              <CardContent>
                <Typography variant="body1" className="purple-light">
                  {data.name}
                </Typography>
                <img
                  src={findIcon(data.shortForecast, data.isDaytime)}
                  alt="Weather Icon"
                  style={{ maxWidth: '130px', maxHeight: '130px' }}
                />
                <Typography variant="h5" className="day-of-week-main">
                  {data.temperature}&nbsp;/&nbsp;
                  {nightTemperature !== undefined && (
                    <span>{nightTemperature}</span>
                  )}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  className="day-of-week-main"
                >
                  {data.shortForecast}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '40px',
              borderRadius: '8px',
              position: 'relative',
            }}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
              }}
            >
              <CloseIcon />
            </button>
            <Typography
              variant="h4"
              id="modal-modal-title"
              style={{ margin: '15px' }}
            >
              {convertDateFormat(date)}
            </Typography>
            <div className="day-of-week-modal-display">
              <div
                style={{
                  width: '250px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={findIcon(
                    openForecast.shortForecast,
                    openForecast.isDaytime,
                  )}
                  alt="Weather Icon"
                  style={{
                    maxWidth: '80px',
                    maxHeight: '80px',
                    marginLeft: '100px',
                    marginRight: '40px',
                  }}
                />
                <div
                  style={{
                    width: '120px',
                  }}
                >
                  <Typography
                    className="forecast-details"
                    style={{
                      fontSize: '1.3rem',
                      marginTop: '7px',
                    }}
                  >
                    {openForecast.shortForecast}
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  marginLeft: '100px',
                }}
              >
                <Typography
                  variant="body1"
                  className="forecast-details"
                  style={{
                    fontSize: '1.3rem',
                    marginTop: '7px',
                  }}
                >
                  Precipitation: {openForecast.precipitation}%
                </Typography>
                <Typography
                  className="forecast-details"
                  style={{ fontSize: '1.3rem' }}
                >
                  Humidity: {openForecast.humidity}%
                </Typography>
              </div>
              <div
                style={{
                  marginLeft: '70px',
                }}
              >
                <Typography
                  className="forecast-details"
                  style={{ fontSize: '1.3rem', marginTop: '7px' }}
                >
                  Wind Speed: {openForecast.windSpeed}
                </Typography>
                <Typography
                  className="forecast-details"
                  style={{ fontSize: '1.3rem' }}
                >
                  Wind Direction: {openForecast.windDirection}
                </Typography>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <HourlyTemp cityName={cityName} date={date} />
              <HourlyPrecip cityName={cityName} date={date} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default WeekForecast;
