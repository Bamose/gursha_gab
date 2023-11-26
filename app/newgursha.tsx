import { ActivityIndicator, Platform, Pressable, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Link, useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState, useEffect, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCreatePostMutation } from './store/api';
import * as Location from 'expo-location';
import { useAppSelector } from './store/Store';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ModalScreen() {
  const [createPostMutationAsync, { isLoading, isError, error }] = useCreatePostMutation({});
  const navigation = useNavigation();
  const [content, setpost] = useState("");
  const textInputRef = useRef<TextInput | null>(null);
  const router = useRouter();
  const { latitude, longitude, errorMsg } = useAppSelector((state:any) => state.location);

  if(isLoading){
    <ActivityIndicator />
  }

  const gurshapost = async () => {
    try {
      if (!navigation) {
        return <ActivityIndicator />;
      }
      // Only call the mutation function if the content is not empty
      if (content.trim() !== "") {
        await createPostMutationAsync({ content, latitude, longitude });
        setpost("");
        router.back()
      }
    } catch (error) {
      console.log(error);
      // Handle any errors that occurred during the mutation
    }
  };

  if (isError) {
    console.log(error)
  }

  useEffect(() => {
    // Focus on the text input when the screen loads
    textInputRef.current?.focus();
  }, []);

  return (
    <>
      <SafeAreaView className='bg-white'>
        <View className='pl-3 bg-green-400 py-4 pt-8' style={{ shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,}} >
          <Link href='../'>
            <FontAwesome name="arrow-left" size={20} color="white" />
          </Link>
          <View className='flex-row justify-center bg-green-400'>
            <FontAwesome name="pencil" size={20} color="white" />
            <Text> New Gab </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* text */}
      <View className='flex-1 px-3'>
        <TextInput
          ref={textInputRef}
          value={content}
          placeholder='what is happening'
          onChangeText={(value) => {
            if (value.length <= 200) {
              setpost(value);
           
            }
          }}
          multiline
          numberOfLines={5}
        />
        <Text className='text-right mt-2'>
          {content.length} / 200
        </Text>
      </View>

      <View className='absolute bottom-0 right-0 p-3 pr-7 m-5 bg-green-400 rounded-full'>
        <TouchableOpacity onPress={gurshapost}>
          <Text className='items-center pl-2'> Post</Text>
        </TouchableOpacity>
        {/* {isError && <TexError: {error?.message}t></Text>} */}
      </View>
    </>
  );
}