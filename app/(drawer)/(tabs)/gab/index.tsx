import {
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Gab } from "../../../../components/Gab";

import { Link, Redirect } from "expo-router";
import * as Location from "expo-location";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGetGabQuery } from "@/app/store/api";
import { setLocationData, setErrorMsg } from "@/app/store/locationSlice";
/* import { useAppDispatch } from '@/app/store/Store';
import { useAuth } from '@/context/authcontext'; */
import { useAppDispatch, useAppSelector } from "@/app/store/Store";
import { useDispatch, useSelector } from "react-redux";
import getLocation from "@/components/userloctation";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Footergab} from "../../../../components/Footergab"

export default function Gabscreen() {
  const { latitude, longitude } = getLocation();
  const { selectedlatitude, selectedlongitude } = useAppSelector((state: any) => state.selectedlocation);

  // Store the coordinates for the query
  const [queryCoordinates, setQueryCoordinates] = useState({ latitude, longitude });

  // Trigger the query based on these coordinates
  const { data, error, isLoading, refetch } = useGetGabQuery(queryCoordinates, {refetchOnMountOrArgChange:true});

  useEffect(() => {
    if (selectedlatitude && selectedlongitude) {
      setQueryCoordinates({ latitude: selectedlatitude, longitude: selectedlongitude });
    } else {
      setQueryCoordinates({ latitude, longitude });
    }
  }, [selectedlatitude, selectedlongitude, latitude, longitude]);

  useEffect(() => {
    refetch(); // This will re-trigger the query with the updated coordinates
  }, [queryCoordinates, refetch]);
  if (error) {
    console.log(error);
  }
  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }
  /*  console.log(data); */
  return (
    <>
      <FlatList data={data} renderItem={({ item }) => <Gab gab={item} />} />
      <Footergab />
    </>
  );
}
