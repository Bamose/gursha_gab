import { Text,View,  } from "@/components/Themed";
import React,{ useEffect, useState } from "react";
import { Pressable,TextInput } from "react-native";
import { useGlobalSearchParams } from "expo-router"; 
import { useAuthenticateMutation } from "@/lib/api/auth";
import { useAuth } from "@/context/authcontext";
import { useAppDispatch } from "@/lib/api/hooks";
/* import { setCredentials } from "@/lib/api/authslice"; */

export default function Authenticate(){
    const dispatch = useAppDispatch();
    const [code, setcode] = useState('')
    const{sms} = useGlobalSearchParams();
    const [authenticate, { data, error, isLoading,isSuccess }] = useAuthenticateMutation();


  //@ts-ignore  
    const {updateAuthToken} = useAuth()

    if(error) {
        console.log(error);
      }
      const onverify = async () => {
        console.warn('sign in: ', sms, code);
        try {
         const res =  await authenticate({ sms, smsToken: code });
            const authToken = data.authToken;
              console.log('hello',authToken);
                 await updateAuthToken(data.authToken)
          
            
        
            // Store the JWT token or perform any necessary actions
        
      
            // Handle success, maybe navigate to a different screen or update some state
        
        } catch (error) {
          // Handle network or other errors
          console.error('Login Error:', error);
        }
      };
     

      useEffect (() => {
        (async () => {
          if (isSuccess && data) {
            const authToken = data.authToken;
            console.log('hello',authToken);
            // Store the JWT token or perform any necessary actions
            await updateAuthToken(data.authToken)
          }
        })
      }, [isSuccess, data, updateAuthToken])
    return(
    <View className="h-screen flex-1 justify-center items-center ">
        
        <Text className="text-2xl text-gray-500"> Verify your number </Text>
        <TextInput className="mt-5 pl-3 border border-gray-300 h-10  rounded-md  w-4/5"
            placeholder="code"
            value={code} onChangeText={setcode}
        />
        <Pressable onPress= {onverify} className="rounded-md h-12 mt-7 w-4/5 justify-center items-center bg-green-400/75" >
            <Text className="text-white"> Verify </Text>
        </Pressable>

        </View>
    );
}
