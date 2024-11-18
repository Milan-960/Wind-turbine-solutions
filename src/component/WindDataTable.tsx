import React from 'react';
import { convertUnixTimeToLocalTime } from '../utils';

interface WindTableProps {
  dailyData: Array<{
    dt: number;
    wind_speed: number;
    wind_deg: number;
    humidity: number;
    temp: { day: number };
    pressure: number;
    summary: string;
    sunrise: number;
    sunset: number;
  }>;
  timezone: string;
}

/*
 * A table component that displays daily wind data.
 * @param dailyData - An array of daily wind data objects.
 * @param timezone - The timezone for the data.
 * @returns - A table displaying wind metrics for each day.
 */
export const WindDataTable: React.FC<WindTableProps> = ({
  dailyData,
  timezone,
}) => (
  <div
    className="wind-table-section"
    data-testid="wind-table"
    aria-labelledby="wind-table"
  >
    {/* Table Overview */}
    <div className="table-overview">
      <h2>Daily Wind Data Overview</h2>
      <p>
        This table provides a detailed breakdown of wind-related metrics for
        each day, including wind speed, direction, humidity, temperature,
        atmospheric pressure, and sunrise/sunset times. Use this data to plan
        maintenance or analyze weather trends.
      </p>
    </div>

    {/* Responsive Table */}
    <div className="responsive-table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th className="sticky-column">Date</th>
            <th>Wind Speed (m/s)</th>
            <th>Wind Direction (°)</th>
            <th>Humidity (%)</th>
            <th>Temperature (°C)</th>
            <th>Pressure (hPa)</th>
            <th>Sunrise</th>
            <th>Sunset</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {dailyData.map((day) => (
            <tr key={day.dt}>
              <td className="sticky-column">
                {convertUnixTimeToLocalTime(day.dt, timezone, {
                  includeDate: true,
                  includeTime: false,
                })}
              </td>
              <td>{day.wind_speed}</td>
              <td>{day.wind_deg}</td>
              <td>{day.humidity}</td>
              <td>{day.temp.day}</td>
              <td>{day.pressure}</td>
              <td>
                {convertUnixTimeToLocalTime(day.sunrise, timezone, {
                  timeOnly: true,
                })}
              </td>
              <td>
                {convertUnixTimeToLocalTime(day.sunset, timezone, {
                  timeOnly: true,
                })}
              </td>
              <td>{day.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
