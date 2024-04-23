import { useState } from 'react';
import '../app.css';
import CurrForecast from '../components/CurrForecast';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [city, setCity] = useState('Philadelphia');

  return (
    <>
      <CurrForecast cityName={city} />
    </>
  );
}

export default App;
