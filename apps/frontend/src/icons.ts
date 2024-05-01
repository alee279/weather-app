export function findIcon(forecast: string, isDaytime: boolean): string {
  switch (true) {
    case forecast.toLowerCase().includes("sunny"):
    case forecast.toLowerCase().includes("fair"):
    case forecast.toLowerCase().includes("clear"):
      return isDaytime ? "./assets/icons/sunny.svg" : "./assets/icons/night-clear.svg"
    case forecast.toLowerCase().includes("partly cloudy"):
      return isDaytime ? "./assets/icons/partly-cloudy.svg" : "./assets/icons/night-partly-cloudy.svg"
    case forecast.toLowerCase().includes("cloudy"):
      return "./assets/icons/cloudy.svg";
    case forecast.toLowerCase().includes("overcast"):
        return "./assets/icons/overcast.svg";
    case forecast.toLowerCase().includes("snow"):
      return "./assets/icons/snow.svg";
    case forecast.toLowerCase().includes("showers"):
      return "./assets/icons/showers.svg"
    case forecast.toLowerCase().includes("sleet"):
      return "./assets/icons/sleet.svg"
    case forecast.toLowerCase().includes("rain"):
    case forecast.toLowerCase().includes("rainy"):
      return "./assets/icons/rain.svg"
    default:
      return "./assets/icons/alien.svg";
  }
}
