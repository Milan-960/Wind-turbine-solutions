import React from 'react';

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
}

export const WindDataTable: React.FC<WindTableProps> = ({ dailyData }) => (
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
                {new Date(day.dt * 1000).toLocaleDateString()}
              </td>
              <td>{day.wind_speed}</td>
              <td>{day.wind_deg}</td>
              <td>{day.humidity}</td>
              <td>{day.temp.day}</td>
              <td>{day.pressure}</td>
              <td>
                {new Date(day.sunrise * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </td>
              <td>
                {new Date(day.sunset * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
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
