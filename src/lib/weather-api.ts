export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  description: string;
  pressure: number;
}

export class WeatherAPI {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather request failed: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      description: data.weather[0].description,
      pressure: data.main.pressure
    };
  }

  async get5DayForecast(lat: number, lon: number) {
    const url = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Forecast request failed: ${response.statusText}`);
    }

    return response.json();
  }
}

export function getWeatherAPI(): WeatherAPI {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '';
  return new WeatherAPI(apiKey);
}
