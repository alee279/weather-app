import { useEffect, useState } from 'react';
import { HourlyTempData } from '../types/types';
import { LineChart } from '@mui/x-charts/LineChart';

function HourlyTemp({ cityName, date }: { cityName: string; date: string }) {
  const [tempData, setTempData] = useState<HourlyTempData[]>([]);

  useEffect(() => {
    const fetchPrecip = async () => {
      try {
        const response = await fetch(`/forecast/${cityName}/hourlyTemp`);
        const allDays = await response.json();
        const filteredData = allDays.filter(
          (entry) => entry.startTime.split('T')[0] === date.split('T')[0],
        );
        setTempData(filteredData);
      } catch (error) {
        console.error('Error fetching precipitation data:', error);
      }
    };

    fetchPrecip();
  });

  const xLabels = [];
  const seriesData = [];

  // reorganize data to make graph
  tempData.forEach((entry) => {
    const hour = new Date(entry.startTime).getHours();
    xLabels.push(hour);
    seriesData.push(entry.temperature);
  });

  return (
    <>
      <LineChart
        width={500}
        height={300}
        series={[{ data: seriesData, label: 'Temperature' }]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </>
  );
}

export default HourlyTemp;
