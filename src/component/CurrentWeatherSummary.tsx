import React from 'react';
import {
  WiThermometer,
  WiStrongWind,
  WiBarometer,
  WiHumidity,
  WiCloudy,
  WiDaySunny,
  WiRain,
  WiSmoke,
  WiSnow,
  WiNightAltCloudy,
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
    weather: Array<{
      description: string;
      icon: string;
      id: number;
      main: string;
    }>;
    visibility: number;
  };
}

const weatherIconMap: Record<string, JSX.Element> = {
  sunny: <WiDaySunny className="weather-icon" />,
  smoke: <WiSmoke className="weather-icon" />,
  cloudy: <WiCloudy className="weather-icon" />,
  rainy: <WiRain className="weather-icon" />,
  snowy: <WiSnow className="weather-icon" />,
  clear: <WiDaySunny className="weather-icon" />,
  night: <WiNightAltCloudy className="weather-icon" />,
  default: <WiCloudy className="weather-icon" />,
};

/*
 * This component displays the current weather information.
 * It receives the current weather data as props and displays it in a grid.
 * The weather icon is determined based on the weather description.
 * If the description includes 'sunny', it displays the WiDaySunny icon; otherwise, it displays the WiCloudy icon.
 */

export const CurrentWeatherSummary: React.FC<CurrentWeatherProps> = ({
  current,
}) => {
  const weatherDescription = current.weather[0]?.description.toLowerCase();
  const weatherIcon =
    weatherIconMap[weatherDescription] || weatherIconMap.default;

  return (
    <div
      className="current-weather-summary"
      data-testid="current-weather"
      aria-labelledby="current-weather"
    >
      <h2 className="weather-title"> {weatherIcon} Current Weather Overview</h2>

      <div className="weather-grid">
        {/* Temperature Card */}
        <div className="weather-card">
          <WiThermometer className="weather-icon" />
          <div>
            <p className="weather-label">Temperature</p>
            <p className="weather-value">
              {current.temp}°C{' '}
              <small>(Feels like {current.feels_like}°C)</small>
            </p>
          </div>
        </div>

        {/* Wind Card */}
        <div className="weather-card">
          <WiStrongWind className="weather-icon" />
          <div>
            <p className="weather-label">Wind</p>
            <p className="weather-value">
              {current.wind_speed} m/s at {current.wind_deg}°
            </p>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="weather-card">
          <WiHumidity className="weather-icon" />
          <div>
            <p className="weather-label">Humidity</p>
            <p className="weather-value">{current.humidity}%</p>
          </div>
        </div>

        {/* Pressure Card */}
        <div className="weather-card">
          <WiBarometer className="weather-icon" />
          <div>
            <p className="weather-label">Pressure</p>
            <p className="weather-value">{current.pressure} hPa</p>
          </div>
        </div>

        {/* Weather Condition Card */}
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
          {weatherIcon}
          <div>
            <p className="weather-label">Condition</p>
            <p className="weather-value">{current.weather[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
