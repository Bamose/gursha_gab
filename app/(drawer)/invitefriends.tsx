import { Text, View } from "@/components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function(){
  const router = useRouter()
  
    const redirect =() =>{
      router.back()
      }
    return(

        <View className="flex-row w-full pb-5 border border-b-gray-100 bg-white">
        <View className="flex-row w-full pt-8 pl-3 pr-4 bg-white items-center">
          <Pressable className="  pr-4" onPress={redirect}>
            <MaterialCommunityIcons name="arrow-left" size={30} color="#0BDA51" />
          </Pressable>
         <Text className="text-xl font-bold"> Invite Friends</Text>
        </View>
      </View>
    );
}
