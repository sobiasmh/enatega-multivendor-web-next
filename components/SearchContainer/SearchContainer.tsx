import React, { useEffect, useState, useCallback, useRef } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { GoogleMap, Marker } from "@react-google-maps/api";
/* @ts-ignore TODO: Refactor link to address type error */
import throttle from "lodash/throttle";
import { restaurantList } from "../../lib/apollo/server";
import { useLocationContext } from "../../context/Location";
import useLocation from "../../hooks/useLocation";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import MarkerImage from "../../public/marker.png";
import RestMarker from "../../public/rest-map-2.png";
import { mapStyles } from "../../public/assets/mapStyles";
import "tailwindcss/tailwind.css";
import Buttons from "../Button/Button";
import LocationIcon from "../../public/Icons/LocationIcon";
import RestaurantCards from "../RestaurantCard/RestaurantCard";

const autocompleteService = { current: null };
const RESTAURANTS = gql`
  ${restaurantList}
`;

const SearchContainer: React.FC<{
  isHome: boolean;
  search: string;
  setSearch: (value: string) => void;
}> = ({ isHome, search: searchProp, setSearch: setSearchProp }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(["Loading ..."]);
  const { getCurrentLocation } = useLocation();
  const [open, setOpen] = useState(false);
  const { location, setLocation } = useLocationContext();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const [alertError, setAlertError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(false);
  const fetchRef = useRef(false);

  const [fetchRestaurants, { data }] = useLazyQuery(RESTAURANTS, {
    fetchPolicy: "network-only",
  });

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        /* @ts-ignore TODO: Refactor link to address type error */
        autocompleteService.current?.getPlacePredictions(request, callback);
        
      }, 200),
    []
  );

  const locationCallback = (error: any, data: any) => {
    setLoading(false);
    if (error) {
      setAlertError(error);
      setOpen(true);
      return;
    }
    setSearch(data.deliveryAddress);
    setLocation(data);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    console.log("map here", map);
  }, [map]);

  useEffect(() => {
    loadMap();
    return () => {
      setMap(false);
    };
  }, []);

  const loadMap = async () => {
    setTimeout(() => {
      setMap(true);
    }, 100);
  };

  useEffect(() => {
    let active = true;
    /* @ts-ignore TODO: Refactor link to address type error */
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        /* @ts-ignore TODO: Refactor link to address type error */
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results: any) => {
      console.log("location valueeeeeeeeee", value, active)

      if (active) {
        let newOptions: string[] = [];
        if (value) {
          console.log("location valueeeeeeeeee", value, active)
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }

      console.log("location", location, "options",options, "inputValue",inputValue,"results", results)
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  useEffect(() => {
    if (loading) {
      setInputValue("Loading ...");
    } else if (search) {
      setInputValue(search);
    } else if (location) {
      setInputValue(location.deliveryAddress);
    } else {
      setInputValue("");
    }
  }, [loading, search, location]);

  useEffect(() => {
    if (!location) return;
    if (fetchRef.current) return;
    const variables = {
      longitude: parseFloat(location.longitude) || null,
      latitude: parseFloat(location.latitude) || null,
    };
    fetchRestaurants({ variables });
    console.log("fetchRestaurants", fetchRestaurants, data);
    fetchRef.current = true;
  }, [location]);

  const findResClick = () => {
    console.log("fetchRestaurants");

    const variables = {
      longitude: parseFloat(location.longitude) || null,
      latitude: parseFloat(location.latitude) || null,
    };
    console.log("fetchRestaurants 2");

    fetchRestaurants({ variables });
    console.log("fetchRestaurants 3");

    console.log("fetchRestaurants334", fetchRestaurants, data);
    // fetchRef.current = true;
  };

  const handleLocationButtonClick = () => {
    setLoading(true);
    getCurrentLocation(locationCallback);
    console.log("location here", location);
  };

  useEffect(() => {
    handleLocationButtonClick();
  }, []);

  const { restaurants } = data?.nearByRestaurants ?? {};

  return (
    <div className="relative w-full h-screen">
    <div className="w-full h-full flex flex-col items-center justify-center">
      {map && (
        <div className="w-full h-full">
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%", flex: 1 }}
            zoom={10}
            center={{
              lat: parseFloat(location?.latitude) || 33.6844,
              lng: parseFloat(location?.longitude) || 73.0479,
            }}
            options={{
              styles: mapStyles,
              zoomControl: true,
              zoomControlOptions: {
                /* @ts-ignore TODO: Refactor link to address type error */
                position: window.google.maps.ControlPosition.RIGHT_CENTER,
              },
            }}
            onLoad={(mapInstance) => console.log("Map Loaded: ", mapInstance)}
            onUnmount={(mapInstance) =>
              console.log("Map Unmounted: ", mapInstance)
            }
          >
            {location && (
              <Marker
                position={{
                  lat: location?.latitude,
                  lng: location?.longitude,
                }}
                /* @ts-ignore TODO: Refactor link to address type error */
                icon={MarkerImage}
              />
            )}
            {restaurants?.map((item: any) => (
              <Marker
                key={item._id}
                position={{
                  lat: parseFloat(item.location.coordinates[1]),
                  lng: parseFloat(item.location.coordinates[0]),
                }}
                onClick={() => {
                  router.push(`/restaurant/${item.slug}`);
                }}
                title={item.name}
                /* @ts-ignore TODO: Refactor link to address type error */
                icon={RestMarker}
              />
            ))}
          </GoogleMap>
        </div>
      )}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-6 w-full flex flex-col items-center">
        {isHome ? (
          <div className="bg-black p-6 rounded-lg md:flex lg:flex 2xl:flex items-center justify-between mt-20 md:flex-row w-[350px] md:w-[900px] lg:w-[900px] 2xl:w-[900px]">
            <div className="flex-grow flex items-center rounded-lg">
              <span className="p-2 bg-white rounded-l-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.5 17.5l2.5 2.5"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="flex-grow px-4 py-2 border-none focus:outline-none focus:ring focus:border-blue-300 bg-white text-gray-600"
                placeholder="Enter Delivery Address"
                value={loading ? "Loading ..." : inputValue}
                onChange={(event) => {
                  const newValue = event.target.value;
                    /* @ts-ignore TODO: Refactor link to address type error */
                  if (newValue && newValue.place_id && res && res.length > 0) {
                    /* @ts-ignore TODO: Refactor link to address type error */
                    const b = new window.google.maps.Geocoder();
                    /* @ts-ignore TODO: Refactor link to address type error */
                    b.geocode({ placeId: newValue.place_id }, (res) => {
                      const location = res[0]?.geometry?.location;
                      setLocation({
                        label: "Home",
                        /* @ts-ignore TODO: Refactor link to address type error */
                        deliveryAddress: newValue.description,
                        latitude: location.lat(),
                        longitude: location.lng(),
                      });
                    });
                  }
                  setInputValue(newValue);
                  setOptions(newValue ? [...options] : options);
                  setValue(newValue);

                }}
              />
              <span className="h-[40px] p-1 bg-white rounded-r-lg">
                <LocationIcon
                  onClick={(e: any) => {
                    setLoading(true);
                    getCurrentLocation(locationCallback);
                  }}
                />
              </span>
            </div>
            <div className="ml-4 mt-4 md:mt-0 lg:mt-0 2xl:mt-0 flex justify-center">
              <Buttons
                bgcolor="#5bc32c"
                color="black"
                text="Find Restaurants"
                height="44px"
                width="172px"
                radius="30px"
                onClick={(e: any) => {
                  console.log("heloooooooooooooooooooooooooooo");
                  findResClick();
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-4 w-full max-w-lg px-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Search Restaurants"
              value={searchProp}
              onChange={(e) => setSearchProp(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
    {restaurants && (
      <div className="bg-white absolute bottom-0 left-0 w-full h-[30%] md:h-[20%] overflow-y-auto py-8 px-8  scrollbar-thin">
        <RestaurantCards restaurants={restaurants} />
      </div>
    )}
  </div>
  
  );
};

export default SearchContainer;
