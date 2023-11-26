import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from './store/Store';
import { setselectedLocationData } from './store/selectedlocation';
import { useRouter } from 'expo-router';

type Coordinate = {
    latitude: number;
    longitude: number;
  };

export default function MapWithMarker() {
    const dispatch = useAppDispatch();
    const router = useRouter()
const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate | null>(null);
const { selectedlatitude, selectedlongitude } = useAppSelector((state: any) => state.selectedlocation);
  // Function to handle user selection of a location on the map
  const handleMapPress = (event:any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedCoordinate({ latitude, longitude });
    dispatch(setselectedLocationData({selectedlatitude: latitude, selectedlongitude: longitude}))
    console.log(selectedlatitude,selectedlongitude)
    router.back()
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
            latitude: 9.033,
            longitude: 38.7506,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          
        onPress={handleMapPress} // Add this onPress event to handle map clicks
      >
        {/* Display the selected marker if a location has been chosen */}
        {selectedCoordinate && (
          <Marker
            coordinate={selectedCoordinate}
            title={'Selected Location'}
            description={`Lat: ${selectedCoordinate.latitude}, Long: ${selectedCoordinate.longitude}`}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
