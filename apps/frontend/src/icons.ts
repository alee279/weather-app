import sunny from "./assets/icons/sunny.svg"
import night_clear from "./assets/icons/night-clear.svg"
import partly_cloudy from "./assets/icons/partly-cloudy.svg"
import night_partly_cloudy from "./assets/icons/night-partly-cloudy.svg"
import cloudy from "./assets/icons/cloudy.svg"
import fog from "./assets/icons/fog.svg"
import snow from "./assets/icons/snow.svg"
import sleet from "./assets/icons/sleet.svg"
import drizzle from "./assets/icons/drizzle.svg"
import showers from "./assets/icons/showers.svg"
import rain from "./assets/icons/rain.svg"
import storm from "./assets/icons/storm.svg"
import thunderstorm from "./assets/icons/thunderstorm.svg"
import alien from "./assets/icons/alien.svg"


export function findIcon(forecast: string, isDaytime: boolean): string {
  switch (true) {
    case forecast.toLowerCase().includes("sunny"):
    case forecast.toLowerCase().includes("fair"):
    case forecast.toLowerCase().includes("clear"):
      return isDaytime ? sunny : night_clear
    case forecast.toLowerCase().includes("partly cloudy"):
      return isDaytime ? partly_cloudy : night_partly_cloudy
    case forecast.toLowerCase().includes("cloudy"):
      return cloudy;
    case forecast.toLowerCase().includes("fog"):
    case forecast.toLowerCase().includes("foggy"):
        return fog;
    case forecast.toLowerCase().includes("overcast"):
        return "./assets/icons/overcast.svg";
    case forecast.toLowerCase().includes("snow"):
    case forecast.toLowerCase().includes("snowy"):
      return snow;
      case forecast.toLowerCase().includes("showers"):
        return showers;
      case forecast.toLowerCase().includes("drizzle"):
      case forecast.toLowerCase().includes("light rain"):
          return drizzle;
    case forecast.toLowerCase().includes("sleet"):
      return sleet;
    case forecast.toLowerCase().includes("storm"):
        return storm;
    case forecast.toLowerCase().includes("thunder"):
    case forecast.toLowerCase().includes("thunderstorm"):
        return thunderstorm;
    case forecast.toLowerCase().includes("rain"):
    case forecast.toLowerCase().includes("rainy"):
      return rain;
    default:
      return alien;
  }
}
