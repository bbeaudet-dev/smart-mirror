export interface WeatherData {
  current: {
    temperature: number | null;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    uvIndex: number;
    visibility: number;
    windDirection: string;
    pressure: number;
    gustSpeed: number;
    cloudCover: number;
    dewPoint: number;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }>;
  error?: boolean;
  message?: string;
  location?: string;
  lastUpdated?: string;
}












