export interface ForecastData {
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
