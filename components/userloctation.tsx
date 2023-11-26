import { useAppDispatch, useAppSelector } from '@/app/store/Store';
import { setErrorMsg, setLocationData } from '@/app/store/locationSlice';
import * as Location from 'expo-location';
import { useEffect } from 'react';

export default function getLocation()  {
  const { latitude, longitude, errorMsg } = useAppSelector((state:any) => state.location);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        dispatch(setErrorMsg('Permission to access location was denied'));
        return;
      }

      const livelocation = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeInterval: 30000,// 30 min
        distanceInterval: 10,
      }, (location) => {
        
        dispatch(setLocationData({ latitude: location.coords.latitude, longitude: location.coords.longitude }));
      });
    })();
  }, [dispatch]);
  
  /* console.log() */
  
  return{latitude,longitude};
};
