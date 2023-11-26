import React, { useState } from 'react';
import { Modal, View, Text, Pressable, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCreatereportMutation } from '@/app/store/api';

export default function ReportComponent ({ id, onClose, onSubmit }:any)  {
  const [reason, setReason] = useState('');
    const [report, {isLoading,isError}] = useCreatereportMutation()
  const handleSubmit = () => {
    // Add your logic for handling the report submission
    onSubmit(reason);
    report({id, content:reason})
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true} // Use state to manage visibility
      onRequestClose={onClose}
    >
        
      <View className='flex-1 justify-center bg-gray-400/60 px-10'>
        <View className='bg-gray-50 p-5 rounded-lg'>
          <Text className='text-base mb-2 text-gray-500'>Report this post</Text>
          <TextInput
            placeholder="  Enter reason for report"
            onChangeText={(text) => setReason(text)}
            className='border pl-3 border-gray-300 mb-3 h-16 rounded-lg'
            multiline={true}
                 
            />
          <Pressable onPress={handleSubmit} className="bg-red-400 p-3 rounded">
            <Text className='text-white'>Submit</Text>
          </Pressable>
          <Pressable className="bg-gray-300/40 p-3 rounded" onPress={onClose} style={{ marginTop: 10 }}>
            <Text className='text-gray-500'>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};