import 'leaflet';

/**
 * Extending the `leaflet` module to include custom plugin support.
 *
 * 1. **Geocoder Namespace**:
 *    - Adds typing for the `leaflet-control-geocoder` plugin.
 *    - Defines the `reverse` method, which is used to perform reverse geocoding based on latitude, longitude, and zoom.
 *    - Adds support for geocoding providers like `nominatim`.
 *
 * 2. **Why is this needed?**
 *    - `leaflet-control-geocoder` is a popular plugin for geocoding and reverse geocoding in Leaflet maps,
 *      but it does not provide TypeScript typings by default.
 *    - By declaring these types, we ensure proper TypeScript support and eliminate type-related errors
 *      when using geocoding features in our map components.
 */
declare module 'leaflet' {
  namespace Control {
    interface Geocoder {
      reverse(
        latLng: L.LatLng,
        zoom: number,
        callback: (results: Array<{ name: string }>) => void
      ): void;
    }

    function Geocoder(): Geocoder;
    function Geocoder(type: string): Geocoder;

    namespace Geocoder {
      function nominatim(): Geocoder;
    }
  }
}

/**
 * Extending the `react-leaflet` module to include support for custom props.
 *
 * 1. **`fullscreenControl` Prop**:
 *    - Extends the `MapContainerProps` interface to allow the `fullscreenControl` prop.
 *    - This prop enables the `leaflet.fullscreen` plugin, which allows users to toggle fullscreen mode on the map.
 *
 * 2. **Why is this needed?**
 *    - The `react-leaflet` library does not natively support the `fullscreenControl` prop,
 *      as it focuses on Leaflet core functionality.
 *    - By extending `MapContainerProps`, we add TypeScript support for this plugin-specific feature,
 *      ensuring our code can safely use `fullscreenControl` without type errors.
 */
declare module 'react-leaflet' {
  interface MapContainerProps {
    fullscreenControl?: boolean;
  }
}
