import Geocode from "react-geocode";
import ConfigurableValues from "../config/constants";

export default function useLocation() {
  const { GOOGLE_MAPS_KEY } = ConfigurableValues();

  // Check if GOOGLE_MAPS_KEY is defined before calling setApiKey
  if (GOOGLE_MAPS_KEY) {
    Geocode.setApiKey(GOOGLE_MAPS_KEY);
    Geocode.setLanguage("en");
    Geocode.enableDebug(false);
  } else {
    console.error("Google Maps API key is not defined.");
  }

  const latLngToGeoString = async ({ latitude, longitude }) => {
    try {
      const location = await Geocode.fromLatLng(latitude, longitude);
      return location.results[0].formatted_address;
    } catch (error) {
      console.error("Error converting coordinates to address:", error);
      return null;
    }
  };

  const getCurrentLocation = (callback) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const location = await Geocode.fromLatLng(latitude, longitude);
          callback(null, {
            label: "Home",
            latitude,
            longitude,
            deliveryAddress: location.results[0].formatted_address,
          });
        } catch (error) {
          console.error("Error fetching current location:", error);
          callback(error);
        }
      },
      (error) => {
        console.error("Error accessing geolocation:", error);
        callback(error.message);
      }
    );
  };

  return {
    getCurrentLocation,
    latLngToGeoString,
  };
}
