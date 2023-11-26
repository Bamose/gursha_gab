
import {  View } from 'react-native';
import React from 'react';
import "../app/global";
import { Link, Redirect, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export const Footergab = () => {
  const router = useRouter()
  
 const redirect =() =>{

  router.back()

   }
  return (
    <>

    <View className="flex flex-row justify-between bg-white px-4 w-full h-11 absolute bottom-0 z-10" style={{ shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,}}>
    
      <TouchableOpacity onPress={redirect}>
      <MaterialCommunityIcons name="home-outline" size={30} color="#0BDA51" />
      </TouchableOpacity>

      <Link href={"/mapscreen"}>
      <TouchableOpacity>
      <MaterialCommunityIcons name="map-marker-outline" size={30} color="#0BDA51" />
      </TouchableOpacity>
      </Link>

      <Link href={"/newgursha"}>
      <TouchableOpacity   style={{
        width: 70,
        height: 70,
        marginTop: -35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, 
      }}>
        
      <MaterialCommunityIcons  name="plus" size={30} color="#0BDA51" />
      </TouchableOpacity>
      </Link>

   
      <TouchableOpacity>
      <MaterialCommunityIcons name="bullhorn-outline" size={30} color="#0BDA51" />
      </TouchableOpacity>
   

      <Link href={"/usergab"}>
      <TouchableOpacity>
      <MaterialCommunityIcons name="account-outline" size={30} color="#0BDA51" />
      </TouchableOpacity>
      </Link>

      </View>
  </>
  )
}

