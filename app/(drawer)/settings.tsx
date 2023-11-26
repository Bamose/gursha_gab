// SettingsScreen.js

import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import {  useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, Pressable, Modal } from "react-native";
import { useAuth } from "@/context/authcontext";
import { useDeleteuserMutation } from "../store/api";
import { Buffer } from "buffer"
import ConfirmationModal from "@/components/confirmationmodals";


const SettingsScreen = ({ navigation }: any) => {
  // Handle navigation to various settings options

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [logout, setlogout] = useState('delete')
  const [deleteAccount] = useDeleteuserMutation();
  //@ts-ignore
  const { removeAuthToken, authtoken } = useAuth();
const router = useRouter();

  const showDeleteConfirmation = () => {
    setDeleteModalVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setDeleteModalVisible(false);
  };

  const performactiontoAccount = async () => {
    try {
      if(logout === 'logout' ){
        removeAuthToken();
       hideDeleteConfirmation();
      }else{
      //@ts-ignore
      const parts = authtoken.split('.').map(part => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
      const payload = JSON.parse(parts[1]);
      const userid = payload.userid;

      await deleteAccount({ id: userid });
      removeAuthToken();
      hideDeleteConfirmation();
      router.back();
      }
    } catch (error) {
      console.error('Error decoding the JWT token:', error);
    }
  };
  
  const navigateToOption = (option: any) => {
    // Implement the navigation logic here, e.g., using React Navigation
    switch (option) {
      case "Notifications":
        // Navigate to the Notifications screen
        // navigation.navigate('Notifications');
        break;
      case "AboutUs":
        // Navigate to the About Us screen
        // navigation.navigate('AboutUs');
        break;
      case "AskQuestion":
        // Navigate to the Ask Question screen
        // navigation.navigate('AskQuestion');
        break;
      case "DeleteAccount":
        showDeleteConfirmation();
        break;
      case "Logout":
        showDeleteConfirmation();
        setlogout('logout');
        break;
      case "PrivacyPolicy":
        // Navigate to the Privacy Policy screen
        // navigation.navigate('PrivacyPolicy');
        break;
      case "FAQ":
        // Navigate to the FAQ screen
        // navigation.navigate('FAQ');
        break;
      default:
        break;
    }
  };

  const redirect =() =>{
   router.back()
   }
  return (
    <>
    <View className="flex-row w-full pb-5 border border-b-gray-100 bg-white">
    <View className="flex-row w-full pt-8 pl-3 pr-4 bg-white items-center">
      <Pressable className="  pr-4" onPress={redirect}>
        <MaterialCommunityIcons name="arrow-left" size={30} color="#0BDA51" />
      </Pressable>
     <Text className="text-xl font-bold"> Settings</Text>
    </View>
  </View>
    <View className="h-screen bg-white">
      <Text className="ml-2 pt-2">Notifications</Text>

      <TouchableOpacity
        className="bg-gray-100 flex flex-row m-2 p-2 py-4 w-full  rounded"
        onPress={() => navigateToOption("Notifications")}
      >
        <MaterialCommunityIcons name="bell" size={20} color="#86898d" />

        <Text className="text-base w-32 ml-2 mr-[48%]">Notifications</Text>

        <MaterialCommunityIcons name="chevron-right" size={25} color="#86898d" />
      </TouchableOpacity>

      <Text className="ml-2">About</Text>
      <TouchableOpacity
      className="bg-gray-100 flex flex-row mx-2 mt-2 p-2 py-4 w-full  rounded"
        onPress={() => navigateToOption("AboutUs")}
      >
        <MaterialCommunityIcons  name="information-variant" size={20} color="#86898d" />
        <Text className="text-base ml-2 w-32 mr-[48%]">About Us</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#86898d" />
      </TouchableOpacity>
      <TouchableOpacity
     className="bg-gray-100 flex flex-row m-2 p-2 py-4 w-full  rounded"
        onPress={() => navigateToOption("contentpolicy")}
      >
          <MaterialCommunityIcons  name="clipboard-text-outline" size={20} color="#86898d" />
        <Text className="text-base ml-2 w-32 mr-[48%]">Content policy</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#86898d" />
      </TouchableOpacity>

      <Text className="ml-2"> Account Setting</Text>

      <TouchableOpacity
       className="bg-gray-100 flex flex-row m-2 p-2 py-4 w-full  rounded"
        onPress={() => navigateToOption("DeleteAccount")}
      >
          <MaterialCommunityIcons  name="delete-outline" size={20} color="#86898d" />
        <Text className="text-base ml-2 w-32 mr-[48%]">Delete Account</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#86898d" />
      </TouchableOpacity>
      <ConfirmationModal
          isVisible={deleteModalVisible}
          onCancel={hideDeleteConfirmation}
          onConfirm={performactiontoAccount}
          action={logout}
        />  
      <TouchableOpacity
        className="bg-gray-100 flex flex-row m-2 p-2 py-4 w-full  rounded"
        onPress={() => navigateToOption("Logout")}
      >
        <MaterialCommunityIcons  name="exit-to-app" size={20} color="#86898d" />
        <Text className="text-base ml-2 w-32 mr-[48%]">Logout</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#86898d" />
      </TouchableOpacity>
      <Text className="ml-2">Help</Text>
      <TouchableOpacity
         className="bg-gray-100 flex flex-row m-2 p-2 py-4 w-full  rounded"
        onPress={() => navigateToOption("AskQuestion")}
      >
        <MaterialCommunityIcons  name="chat-processing-outline" size={20} color="#86898d" />
        <Text className="text-base ml-2 w-32 mr-[48%]">Ask Question</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#86898d" />
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-gray-100 flex flex-row m-2 p-2 py-4 w-full  rounded"
        onPress={() => navigateToOption("FAQ")}
      >
        <MaterialCommunityIcons  name="help-circle-outline" size={20} color="#86898d" />
        <Text className="text-base ml-2 w-32 mr-[48%]">FAQ</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#86898d" />
      </TouchableOpacity>
      <TouchableOpacity
      className="bg-gray-100 flex flex-row m-2 p-2 py-4 w-full  rounded"
        onPress={() => navigateToOption("PrivacyPolicy")}
      >
         <MaterialCommunityIcons  name="shield-account-outline" size={20} color="#86898d" />
        <Text  className="text-base ml-2 w-32 mr-[48%]">Privacy Policy</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#86898d" />
      </TouchableOpacity>
    </View>
    
    </>
  );
};

export default SettingsScreen;
