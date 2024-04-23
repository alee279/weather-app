import React from 'react';
// import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';

CurrForecast.propTypes = {
  cityName: PropTypes.string.isRequired,
};

function CurrForecast({ cityName }) {
  const [temp] = React.useState('0');

  React.useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(`/forecast/${cityName}/currForecast`);
        console.log(cityName);
        console.log(response.data.temp);
        console.log(response.data);
        // setTemp(response);
      } catch (error) {
        console.error('Error fetching forecast', error);
      }
    };

    fetchForecast();
  }, [cityName]);

  return (
    <>
      <p>curr forecast</p>
      <p>{temp}</p>
    </>
  );
}

export default CurrForecast;
