import { Text, View } from "@/components/Themed";
import { gurshas } from "@/assets/data/gurshas";
import { Gab } from "@/components/Gab";
import { useGlobalSearchParams } from "expo-router"; 
import { useCreateCommentMutation, useGetGabCommentQuery, useGetGabidQuery } from "../store/api";
import { FlatList, Pressable, TextInput } from "react-native";
import { useRef, useState } from "react";
import { Comment } from "@/components/comment";
import { FontAwesome } from "@expo/vector-icons";
export default  function Gurshascreen(){

  const [content, setcomment] = useState("");
  const textInputRef = useRef<TextInput | null>(null);
  
  const { id } = useGlobalSearchParams();
  const [createCommentAsync,{isLoading:commentLoading, isError:errorcomment} ] = useCreateCommentMutation()
  const { data: gab, isLoading, isError } = useGetGabidQuery(id);
  const {data:comment, isLoading:Loading, isError:error}= useGetGabCommentQuery(id)
  
  const postcomment = async () => {
    try {
    
      
      // Only call the mutation function if the content is not empty
      if (content.trim() !== "") {
        await createCommentAsync({ id, content });
        setcomment("");
       
      }
    } catch (error) {
      console.log(error);
      // Handle any errors that occurred during the mutation
    }
  };

  if (isError || errorcomment) {
    return <Text>Error fetching data</Text>;
  }

  if (isLoading || commentLoading) {
    return <Text>Loading...</Text>;
  }
/* console.log('hello', comment) */

 /*  if (!data) {
    return <Text>No data available</Text>;
  } */
    
    return(
      <>
    <View className="bg-white">
   <Gab gab={gab} />
   </View>
   <View className='my-1 bg-white py-2 pl-5 w-full text-3xl'>
        <Text> Comments </Text>
      </View>
    <FlatList data={comment} renderItem={({index,item}) => <Comment comment={item} />} keyExtractor={(item) => item.id} />
    <View className='flex-1 flex-row px-3 absolute bottom-0 w-full h-min-16 h-auto '>
      <View className=" border border-gray-200 rounded-lg p-3 m-3 w-4/5">
        <TextInput className=" w-4/5"
          ref={textInputRef}
          value={content}
          placeholder='write a comment'
          multiline={true}
          maxLength={1000}
          onChangeText={(value) => {
            if (value.length <= 200) {
              setcomment(value);

            }
          }}
         
        />
        </View>
        <View className="justify-center items-center">
        <Pressable onPress={postcomment} >
        <FontAwesome  name="chevron-circle-right" size={25} color={"#0BDA51"} />
        </Pressable>
        </View>
      </View>

      
    </> 
    )
}
