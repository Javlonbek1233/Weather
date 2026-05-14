export interface WeatherData {
  mock?: boolean;
  current: {
    temp: number;
    description: string;
    humidity: number;
    wind_speed: number;
    aqi: number;
    uv: number;
    icon: string;
    location: string;
  };
  forecast: {
    day: string;
    temp_max: number;
    temp_min: number;
    description: string;
  }[];
  alerts: {
    event: string;
    description: string;
  }[];
}

export type WeatherState = "clear" | "cloudy" | "rain" | "snow" | "thunder";
