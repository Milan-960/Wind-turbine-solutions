import React, { useState } from 'react';
import { coordinateSchema } from '../utils/Schemas';

interface CoordinateInputProps {
  onSubmit: (lat: number, lon: number) => void;
}

/*
 * This component is responsible for taking user input for latitude and longitude
 * and validating the input before submitting it to the parent component.
 * It uses the coordinateSchema to validate the input.
 ! If the input is invalid, it displays an error message.
 */
export const CoordinateInputForm: React.FC<CoordinateInputProps> = ({
  onSubmit,
}) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitudeError, setLatitudeError] = useState<string | null>(null);
  const [longitudeError, setLongitudeError] = useState<string | null>(null);
  const [formTouched, setFormTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);

    const validation = coordinateSchema.safeParse({ latitude, longitude });
    if (!validation.success) {
      const errors = validation.error.format();
      setLatitudeError(errors.latitude?._errors?.[0] || null);
      setLongitudeError(errors.longitude?._errors?.[0] || null);
      return;
    }

    // Clear errors if valid
    setLatitudeError(null);
    setLongitudeError(null);
    setFormTouched(false);

    // Submit the validated coordinates
    onSubmit(parseFloat(latitude), parseFloat(longitude));
  };

  const handleLatitudeChange = (value: string) => {
    setLatitude(value);
    if (formTouched) {
      const result = coordinateSchema
        .pick({ latitude: true })
        .safeParse({ latitude: value });
      setLatitudeError(result.success ? null : result.error.errors[0].message);
    }
  };

  const handleLongitudeChange = (value: string) => {
    setLongitude(value);
    if (formTouched) {
      const result = coordinateSchema
        .pick({ longitude: true })
        .safeParse({ longitude: value });
      setLongitudeError(result.success ? null : result.error.errors[0].message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="coordinate-input"
      aria-label="Coordinate Input Form"
      data-testid="coordinate-input-form"
    >
      <div className="input-group">
        <label htmlFor="latitude">Latitude:</label>
        <input
          id="latitude"
          type="number"
          step="any"
          value={latitude}
          onChange={(e) => handleLatitudeChange(e.target.value)}
          placeholder="-90 to 90"
          aria-label="Latitude"
          min="-90"
          max="90"
          className={latitudeError ? 'error-input' : ''}
        />
        {latitudeError && (
          <p className="error-message" role="alert">
            {latitudeError}
          </p>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="longitude">Longitude:</label>
        <input
          id="longitude"
          type="number"
          step="any"
          value={longitude}
          onChange={(e) => handleLongitudeChange(e.target.value)}
          placeholder="-180 to 180"
          aria-label="Longitude"
          min="-180"
          max="180"
          className={longitudeError ? 'error-input' : ''}
        />
        {longitudeError && (
          <p className="error-message" role="alert">
            {longitudeError}
          </p>
        )}
      </div>
      <button type="submit">Get Wind Data</button>
    </form>
  );
};
