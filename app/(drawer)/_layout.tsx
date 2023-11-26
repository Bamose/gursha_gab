import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
/* import Gabscreen from './index'; */
import { SafeAreaView } from 'react-native';
import { Stack, withLayoutContext} from 'expo-router';

import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);
export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'gab',
  };

  function CustomDrawerContent(props:any) {
    return (
      <DrawerContentScrollView {...props}>
      <View style={{ paddingTop: 40, paddingBottom: 10, alignItems: 'center' }}>
        <Text style={{ color: '#0BDA51',fontSize: 24, fontWeight: 'bold' }}>Gursha</Text>
      </View>
      <TouchableOpacity
        className='flex flex-row p-4 border-b pt-12 border-gray-100 w-11/12'
        onPress={() => props.navigation.navigate('(tabs)')}
      >
        <MaterialCommunityIcons name="home" size={25} color="#86898d" />
         <Text className='text-base font-400 ml-3'>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
       className='flex flex-row p-4  border-b border-gray-100 w-11/12'
        onPress={() => props.navigation.navigate('gabfeatures')}
      >
         <MaterialCommunityIcons name="help-circle-outline" size={25} color="#86898d" />
         <Text className='text-base font-400 ml-3'>
          Gab features
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
       className='flex flex-row p-4 border-b border-gray-100 w-11/12'
        onPress={() => props.navigation.navigate('invitefriends')}
      >
         <MaterialCommunityIcons name="account-multiple-plus-outline" size={25} color="#86898d" />
      <Text className='text-base font-400 ml-3'>
          Invite friends
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
       className='flex flex-row p-4 border-b border-gray-100 w-11/12'
        onPress={() => props.navigation.navigate('settings')}
      >
         <MaterialCommunityIcons name="cog" size={25} color="#86898d" />
        <Text className='text-base font-400 ml-3'>
          Settings
        </Text>
      </TouchableOpacity>
      {/* Add more TouchableOpacity components for other screens */}
    </DrawerContentScrollView>
    );
  }
  
export default function DrawerLayout() {
 
  return(

    <Drawer drawerContent={(props) => <CustomDrawerContent {...props}/>}>
      <Drawer.Screen  name='(tabs)' options={{headerShown: false, title:"Home"}}></Drawer.Screen>
{/*       <Drawer.Screen name='signin' options={{ title:"sign"}}></Drawer.Screen> */}
      <Drawer.Screen name='gabfeatures' options={{headerShown: false, title:"gab features"}}></Drawer.Screen>
      <Drawer.Screen name='invitefriends' options={{headerShown: false, title:"invite friends"}}></Drawer.Screen>
      <Drawer.Screen name='settings' options={{ headerShown: false, title:"Settings"}}></Drawer.Screen>
    </Drawer>

  );
 
}