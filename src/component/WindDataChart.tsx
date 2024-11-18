import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import '../utils/Chart';

interface WindChartProps {
  hourlyData: Array<{ dt: number; wind_speed: number; wind_gust: number }>;
}

/*
 * A chart component that visualizes hourly wind speed and gust data.
 * @param hourlyData - An array of hourly wind data objects.
 * @returns - A line chart displaying wind speed and gust trends.
 */
export const WindDataChart: React.FC<WindChartProps> = ({ hourlyData }) => {
  // Handle cases where there is no data
  if (!hourlyData || hourlyData.length === 0) {
    return (
      <div className="chart-section">
        <p>No wind data available to display.</p>
      </div>
    );
  }

  const chartData: ChartData<'line'> = {
    labels: hourlyData.map((hour) =>
      new Date(hour.dt * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    ),
    datasets: [
      {
        label: 'Wind Speed (m/s)',
        data: hourlyData.map((hour) => hour.wind_speed),
        borderColor: '#1E88E5', // Dynamic color for wind speed
        backgroundColor: 'rgba(30, 136, 229, 0.1)', // Light fill under the line
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Smooth lines
        pointRadius: 4, // Emphasize data points
        pointHoverRadius: 6,
      },
      {
        label: 'Wind Gust (m/s)',
        data: hourlyData.map((hour) => hour.wind_gust || 0),
        borderColor: '#F44336', // Dynamic color for wind gusts
        backgroundColor: 'rgba(244, 67, 54, 0.1)', // Light fill under the line
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        borderDash: [5, 5], // Dashed lines
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Arial, sans-serif',
            size: 12,
          },
          color: '#333', // Legend text color
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index', // Show tooltips for all datasets at a hovered point
        intersect: false,
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `${context.dataset.label}: ${value.toFixed(2)} m/s`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
          font: {
            family: 'Arial, sans-serif',
            size: 14,
            weight: 'bold',
          },
          color: '#666',
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#333',
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Wind Speed (m/s)',
          font: {
            family: 'Arial, sans-serif',
            size: 14,
            weight: 'bold',
          },
          color: '#666',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Light gridlines
        },
        ticks: {
          color: '#333',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <section
      className="chart-section"
      data-testid="wind-chart"
      aria-labelledby="wind-chart-title"
    >
      <div className="chart-overview">
        <h2 id="wind-chart-title">Hourly Wind Data Visualization</h2>
        <p>
          This chart provides a visual representation of wind speed and gust
          trends over the next 12 hours. Use it to predict changes in wind
          conditions and plan your activities accordingly.
        </p>
      </div>
      <div className="chart-container" style={{ height: '400px' }}>
        <Line data={chartData} options={options} />
      </div>
    </section>
  );
};
