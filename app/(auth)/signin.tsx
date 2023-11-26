import { Text,View,  } from "@/components/Themed";
import React,{ useState } from "react";
import { Pressable,TextInput } from "react-native";
import { useRouter
 } from "expo-router";
import { useLoginMutation } from "@/lib/api/auth";
import { useAppDispatch } from "../store/Store";
import { useAuth } from "@/context/authcontext";



export default function Signin(){

    const router = useRouter();
    const [sms, setsms] = useState('');
    type sms ={
        sms:string;
    }
    const [login, { data, error, isLoading }] = useLoginMutation();
    const onsignin = async () => {
        if(error) {
            console.log(error);
          }
        console.warn('sign in: ', sms);
        try {
            await login( sms );
            // Handle success, maybe navigate to a different screen or update some state
          } catch (error) {
            //Handle error
            console.error('Login Error:', error);
          }
        router.push({pathname: '/authenticate', params: {sms}})

    }
   
    return(
    <View className="h-screen flex-1 justify-center items-center ">
        
        <Text className="text-2xl text-gray-500"> Sign in or create new account</Text>
        <TextInput className="mt-5 pl-3 border border-gray-300 h-10  rounded-md  w-4/5"
            placeholder="+25198760102"
            value={sms} onChangeText={setsms}
        />
        <Pressable onPress= {onsignin} className="rounded-md h-12 mt-7 w-4/5 justify-center items-center bg-green-400/75" >
            <Text className="text-white"> Sign in</Text>
        </Pressable>

        </View>
    );
}