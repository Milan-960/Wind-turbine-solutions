import { z } from 'zod';

/**
 * A Zod schema for validating latitude and longitude coordinates.
 * Latitude must be a valid number between -90 and 90.
 * Longitude must be a valid number between -180 and 180.
 * @see
 * - https://zod.dev/docs/installation
 */
export const coordinateSchema = z.object({
  latitude: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= -90 && num <= 90;
    },
    { message: 'Latitude must be a valid number between -90 and 90.' }
  ),
  longitude: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= -180 && num <= 180;
    },
    { message: 'Longitude must be a valid number between -180 and 180.' }
  ),
});
