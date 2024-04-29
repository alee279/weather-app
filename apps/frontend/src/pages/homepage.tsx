import { useEffect, useState } from 'react';
import '../app.css';
import CurrTemperature from '../components/currTemperature';
import CurrForecast from '../components/currForecast';
import { Grid, MenuItem, Select, Typography } from '@mui/material';
import HourlyForecast from '../components/hourly-forecast';
// import DayForecast from '../components/day-forecast';
import WeekForecast from '../components/week-forecast';
import axios from 'axios';
import ClothingRec from '../components/clothing-rec';
// import axios from 'axios';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [city, setCity] = useState('Philadelphia');
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('forecast/cityList');
        setCityList(response.data.sort()); // Set cityList to response.data
      } catch (error) {
        console.error('Error fetching cities', error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <div>
        <Typography variant="body1">Todays Weather In:</Typography>
        <Select
          value={city}
          onChange={handleCityChange}
          style={{ width: '600px' }}
        >
          {cityList.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={1} />
        <Grid item xs={2}>
          <CurrTemperature cityName={city} />
        </Grid>
        <Grid item xs={4}>
          <CurrForecast cityName={city} />
        </Grid>
        <Grid item xs={4}>
          <ClothingRec cityName={city} />
        </Grid>
        <Grid item xs={4}>
          <HourlyForecast cityName={city} />
        </Grid>
        <Grid item xs={12}>
          <WeekForecast cityName={city} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
