import { useState } from 'react';
import '../app.css';
import CurrForecast from '../components/CurrForecast';

function App() {
  const [city, setCity] = useState('Philadelphia');

  return (
    <>
      <CurrForecast cityName={city} />
    </>
  );
}

export default App;
