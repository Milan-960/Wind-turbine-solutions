import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * useWindData Hook
 * Fetches wind data for a given set of coordinates using the OpenWeatherMap API.
 *
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 *
 * @returns {{
 *   data: any;         // Fetched wind data (if available).
 *   error: string | null;  // Error message (if any).
 *   isLoading: boolean;    // Loading state for the API request.
 * }}
 *
 * @example
 * const { data, error, isLoading } = useWindData(40.7128, -74.0060);
 * if (isLoading) console.log("Loading...");
 * if (error) console.error(error);
 * if (data) console.log(data);
 */

/**
 * Vite makes VITE_-prefixed variables available via import.meta.env.
 * for more check this stack overflow answer: https://stackoverflow.com/questions/70883903/loading-env-variables-in-react-app-using-vite
 */
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const useWindData = (lat: number, lon: number) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lon) return;

    // Function to fetch wind data
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // API call to OpenWeatherMap
        const response = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall`,
          {
            params: {
              lat,
              lon,
              exclude: 'minutely,alerts',
              units: 'metric', // Metric units for temperature and wind speed
              appid: API_KEY,
            },
          }
        );

        setData(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            'An error occurred while fetching data.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lat, lon]);

  return { data, error, isLoading };
};
