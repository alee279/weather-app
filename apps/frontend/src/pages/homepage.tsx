import { useState } from 'react';
import '../app.css';
import CurrTemperature from '../components/currTemperature';
import CurrForecast from '../components/currForecast';
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import HourlyForecast from '../components/hourly-forecast';
import WeekForecast from '../components/week-forecast';
import ClothingRec from '../components/clothing-rec';
import axios from 'axios';
import React from 'react';
// import axios from 'axios';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [city, setCity] = useState('Philadelphia');
  // const [cityName, setCityName] = useState('Philadelphia, Pennsylvania');
  const [cityList, setCityList] = useState([]);

  React.useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('/forecast/cityList');
        // console.log(cityName);
        // console.log(await response);
        setCityList(response.data.sort());
      } catch (error) {
        // console.error('Error fetching forecast', error);
      }
    };

    fetchCities();
  });

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
    // console.log(cityName);
    // setCity(cityName.split(',')[0].trim());
  };

  return (
    <>
      <Typography>Todays Weather in </Typography>
      <Box sx={{ maxWidth: 600 }}>
        <FormControl fullWidth>
          <Select value={city} onChange={handleChange}>
            {cityList.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CurrTemperature cityName={city} />
        </Grid>
        <Grid item xs={5}>
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
