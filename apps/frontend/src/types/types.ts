export interface CurrentForecastData {
  temperature: number;
  temperatureUnit: string;
  timeOfDay: string;
  shortForecast: string;
  precipitation: number;
  windSpeed: number;
  windDirection: string;
  humidity: number;
  probabilityOfPrecipitation: {
    unitCode: string;
    value: number;
  };
  relativeHumidity: {
    unitCode: string;
    value: number;
  };
  icon: string;
}

export interface HourlyForecastData {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: string | null;
  probabilityOfPrecipitation: {
    unitCode: string;
    value: number;
  };
  dewpoint: {
    unitCode: string;
    value: number;
  };
  relativeHumidity: {
    unitCode: string;
    value: number;
  };
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

