import "leaflet";

declare module "leaflet" {
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
