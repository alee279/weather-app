import { useState } from 'react';
import '../app.css';
import CurrTemperature from '../components/currTemperature';
import CurrForecast from '../components/currForecast';
import { Grid } from '@mui/material';
import HourlyForecast from '../components/hourly-forecast';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [city, setCity] = useState('Philadelphia');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <CurrTemperature cityName={city} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CurrForecast cityName={city} />
      </Grid>
      <Grid item xs={12} md={6}>
        <HourlyForecast cityName={city} />
      </Grid>
    </Grid>
  );
}

export default App;
