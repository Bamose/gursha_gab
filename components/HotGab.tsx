import { Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import "../app/global";
import { gabtypes } from '../types/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import getLocation from './userloctation';
import haversine from 'haversine';
import moment from 'moment';
import { formatDuration } from './timeduration';
import { useVoteMutation } from '@/app/store/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReportComponent from './report';

type gabprops = {
  gab: gabtypes;
};

export const HotGab = ({ gab }: gabprops) => {
  let { latitude, longitude } = getLocation();
  const [upvoteColor, setupvoteColor] = useState('#86898d');
  const [downvoteColor, setdownvoteColor] = useState('#86898d');
  const [votetype, setvotetype] = useState('');
  const [voteasync, { isError }] = useVoteMutation({});
  const [isReportVisible, setIsReportVisible] = useState(false);

  const toggleReportModal = () => {
    setIsReportVisible(!isReportVisible);
  };

  const handleReportSubmit = ( reason:string) => {


    console.log('Report submitted with reason:', reason);
  };


  useEffect(() => {
    const loadVoteStatus = async () => {
      try {
        const voteStatus = await AsyncStorage.getItem(`vote_${gab.id}`);
        if (voteStatus === 'Upvote') {
          setupvoteColor('#0BDA51');
          setdownvoteColor('#86898d');
          setvotetype('Upvote');
        } else if (voteStatus === 'Downvote') {
          setupvoteColor('#86898d');
          setdownvoteColor('#ED2B2A');
          setvotetype('Downvote');
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadVoteStatus();
  }, []);

  let userlocation = { latitude: gab.latitude, longitude: gab.longitude };
  const postlocation = { latitude: latitude, longitude: longitude };

  let distanceInKm = haversine(userlocation, postlocation, { unit: 'km' });
  let distance = distanceInKm.toFixed(1);
  const timestamp = moment(gab.createdAt);
  const now = moment();
  const duration = moment.duration(now.diff(timestamp));
  const formattedTime = formatDuration(duration);

  const upvote = () => {
    // Update the color immediately
    setupvoteColor('#0BDA51');
    setdownvoteColor('#86898d');
    setvotetype('Upvote');
  };

  const downvote = () => {
    // Update the color immediately
    setupvoteColor('#86898d');
    setdownvoteColor('#ED2B2A');
    setvotetype('Downvote');
  };

  useEffect(() => {
    const vote = async () => {
      await voteasync({ id: gab.id, voteType: votetype });
      await AsyncStorage.setItem(`vote_${gab.id}`, votetype);
    };

    vote();
  }, [votetype]);
  const report = () => {
      console.log('Report pressed');
  };
  return (
    <>
    <TouchableOpacity className="items-end p-1 pl-2 pr-3 z-10" onPress={toggleReportModal}>
      <FontAwesome name="ellipsis-v" size={17} color="#86898d" />
    </TouchableOpacity>
    {isReportVisible && (
      <ReportComponent id={gab.id} onClose={toggleReportModal} onSubmit={handleReportSubmit} />
    )}
    <Link href={{
      pathname: "/gursha/[id]",
      params: { id: gab.id }
    }} asChild>
      <Pressable>
        <View className='flex-row mt-[-2px]  pb-0 pl-3 bg-white'>
          <View>
            <View className='flex-row  z-10'>
              <View className='w-11/12'>
                <Text className='text-justify tracking-normal text-base font-medium w-11/12'>{gab.content}</Text>
              </View>
            </View>
            {gab.image && <Image className='p-2 m-3 ml-0 rounded-md h-52 w-full bg-red' source={gab.image} />}
            <View className='flex-row mb-1 mt-2'>
              <Text className='text-gray-400'>{formattedTime}</Text>
              <Text className='ml-2 text-gray-400'>{distance}km</Text>
              <Link href={{
                pathname: "/gursha/[id]",
                params: { id: gab.id }
              }} asChild>
                <Pressable>
                  <Text className='ml-2 text-gray-400'> Comments {gab.comment} </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
    <View className='border-gray-100 flex-row justify-between space-x-8 pt-2 pb-1 border-y pr-1 bg-white '>
      <View className='flex-row items-center pl-3 justify-start pl-2'>
        <TouchableOpacity onPress={upvote}>
          <FontAwesome name="angle-up" size={25} color={upvoteColor} />
        </TouchableOpacity>
        <Text className='mx-1'>{gab.impression}</Text>
        <TouchableOpacity onPress={downvote}>
          <FontAwesome name="angle-down" size={25} color={downvoteColor} />
        </TouchableOpacity>
      </View>
      <Link href={{
        pathname: "/gursha/[id]",
        params: { id: gab.id }
      }} asChild>
        
        <TouchableOpacity className=' flex-row pt-1 items-center'>
          <FontAwesome name="comment" size={16} color="#86898d" />
          <Text className='ml-1 text-sm'>Comments</Text>
        </TouchableOpacity>
      </Link>
      <View className='flex-row pt-1 pr-1'>
        <FontAwesome name="send" size={15} color="#86898d" />
        <Text> Share </Text>
      </View>
    </View>
  </>
  )
}

