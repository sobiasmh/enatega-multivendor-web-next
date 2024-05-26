import React, { useEffect, useState, useCallback, useRef } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { GoogleMap, Marker } from '@react-google-maps/api';
/* @ts-ignore TODO: Refactor link to address type error */
import throttle from 'lodash/throttle';
import { restaurantList } from '../../lib/apollo/server';
import { useLocationContext } from '../../context/Location';
import useLocation from '../../hooks/useLocation';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import MarkerImage from '../../public/marker.png';
import RestMarker from '../../public/rest-map-2.png';
import { mapStyles } from '../../public/assets/mapStyles';
import 'tailwindcss/tailwind.css';

const autocompleteService = { current: null };
const RESTAURANTS = gql`${restaurantList}`;

const SearchContainer: React.FC<{ isHome: boolean, search: string, setSearch: (value: string) => void }> = ({ isHome, search: searchProp, setSearch: setSearchProp }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string[]>(['Loading ...']);
  const { getCurrentLocation } = useLocation();
  const [open, setOpen] = useState(false);
  const { location, setLocation } = useLocationContext();
  const [search, setSearch] = useState('');
  const router = useRouter();

  const [alertError, setAlertError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(false);
  const fetchRef = useRef(false);

  const [fetchRestaurants, { data }] = useLazyQuery(RESTAURANTS, {
    fetchPolicy: 'network-only',
  });

  const fetch = React.useMemo(
    () => throttle((request, callback) => {
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
    console.log("map here", map)
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
      /* @ts-ignore TODO: Refactor link to address type error */
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results: any) => {
      if (active) {
        let newOptions: string[] = [];
        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  useEffect(() => {
    if (!location) return;
    if (fetchRef.current) return;
    const variables = {
      longitude: parseFloat(location.longitude) || null,
      latitude: parseFloat(location.latitude) || null,
    };
    fetchRestaurants({ variables });
    fetchRef.current = true;
  }, [location]);

  const handleLocationButtonClick = () => {
    setLoading(true);
    getCurrentLocation(locationCallback);
  };

  useEffect(() => {
    handleLocationButtonClick();
  }, []);

  const { restaurants } = data?.nearByRestaurants ?? {};

  return (
    <div className="relative w-full h-screen">
      {/* Add FlashMessage Component if necessary */}
      <div className="w-full h-full flex flex-col items-center justify-center">
        {map && (
          <div className="w-full h-full">
            <GoogleMap
              mapContainerStyle={{ height: '100%', width: '100%', flex: 1 }}
              zoom={10}
              center={{
                lat: parseFloat(location?.latitude) || 33.6844,
                lng: parseFloat(location?.longitude) || 73.0479,
              }}
              options={{
                styles: mapStyles,
                zoomControl: true,
                /* @ts-ignore TODO: Refactor link to address type error */
                zoomControlOptions: { position: window.google.maps.ControlPosition.RIGHT_CENTER },
              }}
              onLoad={(mapInstance) => console.log('Map Loaded: ', mapInstance)}
              onUnmount={(mapInstance) => console.log('Map Unmounted: ', mapInstance)}
            >
              {location && (
                <Marker
                  position={{ lat: location?.latitude, lng: location?.longitude }}
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
                  onClick={() => { router.push(`/restaurant/${item.slug}`); }}
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
            <div className="flex flex-col mt-[20px] md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-lg px-4">
              <div className="flex-grow">
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your full address"
                  value={loading ? 'Loading ...' : search ? search : location ? location.deliveryAddress : ''}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    if (location) {
                      router.push("/restaurant-list");
                    }
                  }}
                >
                  {t('findRestaurants')}
                </button>
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
    </div>
  );
};

export default SearchContainer;
