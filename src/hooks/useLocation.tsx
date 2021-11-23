import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>();

  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        setInitialPosition(location);
        setHasLocation(true);
      })
      .catch(err => {
        setHasLocation(true);
      });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        error => {
          reject({error});
        },
        {
          enableHighAccuracy: true,
        },
      );
    });
  };

  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
  };
};
