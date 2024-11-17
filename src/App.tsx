import { useState } from 'react';

import { CoordinateInputForm } from './component/index.ts';
import { useWindData } from './hooks/useWindData.ts';

const App = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const { data, error, isLoading } = useWindData(
    coordinates?.lat || 0,
    coordinates?.lon || 0
  );

  console.log('🚀 ~ App ~ coordinates:', coordinates);
  console.log('🚀 ~ App ~ data:', data);

  const handleCoordinatesSubmit = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
  };

  return (
    <>
      {/* Coordinate Input Form */}
      <section className="coordinate-input-wrapper">
        <CoordinateInputForm onSubmit={handleCoordinatesSubmit} />
      </section>
    </>
  );
};

export default App;
