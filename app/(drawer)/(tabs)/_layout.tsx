import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import Gabscreen from './gab/index';
import { SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HotGabscreen from './two';
import { Footergab } from '@/components/Footergab';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TabLayout() {
  const [selectedTab, setSelectedTab] = useState('index');
  const navigation: any = useNavigation();

  function gabopner() {
    navigation.openDrawer();
  }

  return (
    <SafeAreaView className="flex-1 bg-white  ">
      <View className="flex-row w-full">
        <View className="flex-row w-full pt-8 pl-3 pr-4 bg-white justify-between">
          <Pressable className="pt-2  pr-4" onPress={() => gabopner()}>
            <MaterialCommunityIcons name="menu" size={24} color="#0BDA51" />
          </Pressable>
          <Pressable className="pt-2 pr-2">
            <MaterialCommunityIcons name="bell" size={24} color="#0BDA51" />
          </Pressable>
        </View>
      </View>
      
    <View className=' border-b border-gray-300/20 '>
      <View className="flex-row w-11/12 mt-[-10px] pl-[30%] pr-[23%] pb-1  justify-between items-center ">
        <View className="h-10 border-white border-2 rounded-full z-10">
          <TouchableOpacity
            className="w-12 items-center"
            style={{
              borderBottomWidth: selectedTab === 'index' ? 2 : 0,
              borderBottomColor: selectedTab === 'index' ? '#0BDA51' : 'transparent',
            }}
            onPress={() => setSelectedTab('index')}
          >
            <Text className="text-gray-600  text-lg font-bold">New</Text>
          </TouchableOpacity>
        </View>

        <View className="border-white border-2 rounded-full pl-1">
          <TouchableOpacity
            className="w-12 
             items-center"
            style={{
              borderBottomWidth: selectedTab === 'two' ? 2 : 0,
              borderBottomColor: selectedTab === 'two' ? '#0BDA51' : 'transparent',
            }}
            onPress={() => setSelectedTab('two')}
          >
            <Text className="text-gray-600 font-bold text-lg">Hot</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      
      <View style={{ flex: 1 }}>
        {selectedTab === 'index' && <Gabscreen />}
        {selectedTab === 'two' && <HotGabscreen />}
      </View>
    </SafeAreaView>
  );
}
