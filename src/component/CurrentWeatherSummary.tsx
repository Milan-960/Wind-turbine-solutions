import React from 'react';
import {
  WiThermometer,
  WiStrongWind,
  WiBarometer,
  WiHumidity,
  WiCloudy,
  WiDaySunny,
} from 'react-icons/wi';
import { MdVisibility } from 'react-icons/md';

interface CurrentWeatherProps {
  current: {
    temp: number;
    feels_like: number;
    wind_speed: number;
    wind_deg: number;
    humidity: number;
    pressure: number;
    weather: { description: string }[];
    visibility: number;
  };
}

/*
 * This component displays the current weather information.
 * It receives the current weather data as props and displays it in a grid.
 * The weather icon is determined based on the weather description.
 * If the description includes 'sunny', it displays the WiDaySunny icon; otherwise, it displays the WiCloudy icon.
 */
export const CurrentWeatherSummary: React.FC<CurrentWeatherProps> = ({
  current,
}) => (
  <div
    className="current-weather-summary"
    data-testid="current-weather"
    aria-labelledby="current-weather"
  >
    <h2 className="weather-title">🌤 Current Weather Overview</h2>
    <div className="weather-grid">
      <div className="weather-card">
        <WiThermometer className="weather-icon" />
        <div>
          <p className="weather-label">Temperature</p>
          <p className="weather-value">
            {current.temp}°C <small>(Feels like {current.feels_like}°C)</small>
          </p>
        </div>
      </div>
      <div className="weather-card">
        <WiStrongWind className="weather-icon" />
        <div>
          <p className="weather-label">Wind</p>
          <p className="weather-value">
            {current.wind_speed} m/s at {current.wind_deg}°
          </p>
        </div>
      </div>
      <div className="weather-card">
        <WiHumidity className="weather-icon" />
        <div>
          <p className="weather-label">Humidity</p>
          <p className="weather-value">{current.humidity}%</p>
        </div>
      </div>
      <div className="weather-card">
        <WiBarometer className="weather-icon" />
        <div>
          <p className="weather-label">Pressure</p>
          <p className="weather-value">{current.pressure} hPa</p>
        </div>
      </div>
      <div className="weather-card">
        <MdVisibility className="weather-icon" />
        <div>
          <p className="weather-label">Visibility</p>
          <p className="weather-value">
            {(current.visibility / 1000).toFixed(1)} km
          </p>
        </div>
      </div>
      <div className="weather-card">
        {current.weather[0].description.includes('sunny') ? (
          <WiDaySunny className="weather-icon" />
        ) : (
          <WiCloudy className="weather-icon" />
        )}
        <div>
          <p className="weather-label">Condition</p>
          <p className="weather-value">{current.weather[0].description}</p>
        </div>
      </div>
    </div>
  </div>
);
