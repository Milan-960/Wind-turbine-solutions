import { useState } from 'react';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import {
  TurbineMap,
  CurrentWeatherSummary,
  CoordinateInputForm,
  WindDataChart,
  WindDataTable,
} from './component/index.ts';
import { useWindData } from './hooks/useWindData.ts';
import ErrorMessage from './ui/ErrorMessage.tsx';

const App = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const { data, error, isLoading } = useWindData(
    coordinates?.lat || 0,
    coordinates?.lon || 0
  );

  const handleCoordinatesSubmit = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
  };

  return (
    <>
      {/* Coordinate Input Form */}
      <section className="coordinate-input-wrapper">
        <CoordinateInputForm onSubmit={handleCoordinatesSubmit} />
      </section>

      {/* Todo: we can create a separate component for loading state as the application grow.. Right now I don not see the need to show the loading. */}
      {isLoading && (
        <div className="loading-container">
          <AiOutlineLoading3Quarters />
          <p>Loading...</p>
        </div>
      )}

      {/* Main Content */}
      {coordinates && data && (
        <section className="main-content-wrapper">
          <section className="map-weather-container">
            {/* Map and Weather Summary */}
            <TurbineMap lat={coordinates.lat} lon={coordinates.lon} />
            <CurrentWeatherSummary current={data.current} />
          </section>

          {/* Chart and Table */}
          <section className="chart-table-container">
            {/* 
             Comment out the following line to show only
             the first 12 hours of data in the chart and 
             the first 2 days in the table. 
             */}
            {/* <WindDataChart hourlyData={data.hourly.slice(0, 12)} />
            <WindDataTable
              dailyData={data.daily.slice(0, 2)}
              timezone={data.timezone}
            /> */}

            <WindDataChart hourlyData={data.hourly} />
            <WindDataTable dailyData={data.daily} timezone={data.timezone} />
          </section>
        </section>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-wrapper">
          <ErrorMessage message={error} />
        </div>
      )}
    </>
  );
};

export default App;
