import { commenttypes } from '@/types/types';
import { FontAwesome } from '@expo/vector-icons';
import React, { useRef, useState } from 'react'
import { Pressable, TextInput, View,Text } from 'react-native';

type commentprops ={
    comment: commenttypes;
}
export const Comment= ({comment}: commentprops) =>{
  console.log('componetn',comment.content)
   if(comment.content == null){
      return <Text className='text-red-600'> be the first to comment </Text>
   } 
  
  return (
    <>
     
      <View className='bg-white'>
   <View className=' bg-white  mx-5 ml-8 my-2 rounded-md h-auto'>
    
     <Text className='text-justify tracking-normal text-base text-slat-50 text-gray-500  w-full '>{comment.content}</Text>
     <View className='items-end border-b-2 border-stone-100/50'>
     <FontAwesome  name="thumbs-o-up" size={15} color="gray" />
     </View>
      </View>
    </View>
    
   
      </>
  )
}
