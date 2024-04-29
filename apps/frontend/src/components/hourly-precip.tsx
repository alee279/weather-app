import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { HourlyPrecipData } from '../types/types';

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

  // const xAxisData = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  // const seriesData = Array.from({ length: 24 }, () => ({ data: [] }));
  const xAxisData = [];
  const seriesData = [];

  // reorganize data to make graph
  precipitationData.forEach((entry) => {
    const hour = new Date(entry.startTime).getHours();
    const precipitationValue = entry.precipitation.value;
    xAxisData.push(hour);
    seriesData.push({ data: precipitationValue });
  });

  console.log(precipitationData);

  return (
    <>
      <BarChart
        xAxis={[{ scaleType: 'band', data: xAxisData }]}
        series={seriesData} // FOR SOME REASON ONLY APPEARS IN 1ST VALUE
        // xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
        // series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        // series={[{ data: [4] }, { data: [1] }, { data: [2] }]}
        width={500}
        height={300}
      />
    </>
  );
}

export default HourlyPrecip;
