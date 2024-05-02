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
        // eslint-disable-next-line no-console
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
          backgroundImage: `url(${'https://img.freepik.com/free-photo/colorful-cloudy-sky-sunset-gradient-color-sky-texture-abstract-nature-background-very-peri_127032-2364.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714521600&semt=aishttps://img.freepik.com/premium-photo/pixel-art-star-sky-evening-background-with-cloudy-purple-sky_887552-25474.jpg'})`,
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
              <MenuItem
                key={city}
                value={city}
                style={{ backgroundColor: 'white' }}
              >
                <Typography variant="body1">{city}</Typography>
              </MenuItem>
            ))}
          </Select>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <CurrForecast cityName={city} />
            <ClothingRec cityName={city} />
          </Grid>
          <Grid item xs={5}>
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
