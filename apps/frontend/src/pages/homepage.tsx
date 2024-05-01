import { useEffect, useState } from 'react';
import {
  Grid,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
} from '@mui/material';
import HourlyForecast from '../components/hourly-forecast';
import WeekForecast from '../components/week-forecast';
import axios from 'axios';
import ClothingRec from '../components/clothing-rec';
import theme from '../theme';
import CurrForecast from '../components/currForecast';

function App() {
  const [city, setCity] = useState('Philadelphia');
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('forecast/cityList');
        setCityList(response.data.sort());
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
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundImage: `url(${'https://media.istockphoto.com/id/1406927873/vector/subtle-gradient-blend-background.jpg?s=612x612&w=0&k=20&c=QobMWoFJTszTReSo6am7A-vlEygNVM9S0C4zQAzyPUE='})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">Today&apos;s Weather In:</Typography>
          {'  '}
          <Select
            value={city}
            onChange={handleCityChange}
            className="city-select"
          >
            {cityList.map((city) => (
              <MenuItem key={city} value={city}>
                <Typography variant="h5">{city}</Typography>
              </MenuItem>
            ))}
          </Select>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <CurrForecast cityName={city} />
            <ClothingRec cityName={city} />
          </Grid>
          <Grid item xs={6}>
            <HourlyForecast cityName={city} />
          </Grid>
          <Grid item xs={12}>
            <WeekForecast cityName={city} />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
