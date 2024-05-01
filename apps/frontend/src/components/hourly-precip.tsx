import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { HourlyPrecipData } from '../types/types';
import theme from '../theme';

function HourlyPrecip({ cityName, date }: { cityName: string; date: string }) {
  const [precipitationData, setPrecipitationData] = useState<
    HourlyPrecipData[]
  >([]);

  useEffect(() => {
    const fetchPrecip = async () => {
      try {
        const response = await fetch(`/forecast/${cityName}/hourlyPrecip`);
        const allDays = await response.json();
        const filteredData = allDays.filter(
          (entry) => entry.startTime.split('T')[0] === date.split('T')[0],
        );
        setPrecipitationData(filteredData);
      } catch (error) {
        console.error('Error fetching precipitation data:', error);
      }
    };

    fetchPrecip();
  });

  const xAxisData = [];
  const seriesData = [];

  // reorganize data to make graph
  precipitationData.forEach((entry) => {
    const hour = new Date(entry.startTime).getHours();
    const precipitationValue = entry.precipitation.value;
    xAxisData.push(hour.toString().concat(':00'));
    seriesData.push(precipitationValue);
  });

  return (
    <>
      <BarChart
        xAxis={[{ scaleType: 'band', data: xAxisData }]}
        yAxis={[{ scaleType: 'linear', max: 100 }]}
        series={[
          {
            data: seriesData,
            label: 'Chance of Rain (%)',
            type: 'bar',
            color: theme.palette.primary.light,
          },
        ]}
        width={500}
        height={300}
      />
    </>
  );
}

export default HourlyPrecip;
