import { API_URL } from '@/lib/api/config';
import { gabtypes } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './Store';
import * as SecureStore from "expo-secure-store";


const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: async (headers) => {
    const authtoken = await SecureStore.getItemAsync("authtoken");
    // const authtoken = (getState() as RootState).auth.authtoken

    // If we have a token set in state, let's assume that we should be passing it.
    if (authtoken) {
      headers.set('authorization', `Bearer ${authtoken}`);
    }
    
   
    return headers;
  },
});


export const Gabapi = createApi({
    reducerPath: 'gabapi',
    baseQuery,
    tagTypes: [ "posts","comment","vote","report"],
  endpoints: (builder) => ({

    GetGab: builder.query<gabtypes[], any>({
      query: (options) => ({  
        url: 'gab',
      method: 'Get',
      params: {
        latitude: options.latitude,
        longitude: options.longitude,
       },
  
    }),
    providesTags: (result) =>
    result
      ? [
          ...result.map(({ id }) => ({ type: 'posts' as const, id })),
          { type: 'posts', id: 'LIST' },
        ]
      : [{ type: 'posts', id: 'LIST' }],
   
 
}),
GetviralGab: builder.query<gabtypes[], any>({
  query: (options) => ({  
    url: 'gab/viral',
  method: 'Get',
  params: {
    latitude: options.latitude,
    longitude: options.longitude,
   },

}),
providesTags: (result) =>
result
  ? [
      ...result.map(({ id }) => ({ type: 'posts' as const, id })),
      { type: 'posts', id: 'LIST' },
    ]
  : [{ type: 'posts', id: 'LIST' }],


}),

    GetGabid: builder.query({
      query: (id) => ({
        url: `gab/${id}`,
        method: 'GET',
       
      
      }),
      providesTags: (_result, _error, id) => [{ type: 'posts', id }],
  
    }),

    CreatePost: builder.mutation({
      query: ({content, latitude, longitude}) => ({
        url: 'gab', 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({content, latitude, longitude}) , // Send the content as a string
      }),
      invalidatesTags: [{ type: "posts", id: "LIST" }],
     
          
    }),
    CreateComment: builder.mutation({
      query: ({id,content}) => ({
        url: `gab/${id}/comment`, 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({id, content}) , // Send the content as a string
      }),
      invalidatesTags: ["comment"],
      
    }),
    Createreport: builder.mutation({
      query: ({id,content}) => ({
        url: `gab/${id}/report`, 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({id, content}) , // Send the content as a string
      }),
      invalidatesTags:["report"]
   
      
    }),

    Vote: builder.mutation({
      query: ({id,voteType}) => ({
        url: `gab/${id}/vote`, 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({id, voteType}) , // Send the content as a string
      }),
      invalidatesTags: ["vote"],
      
    }),

    deleteuser: builder.mutation({
      query: ({id}) => ({
        url: `user/${id}/delete`, 
        method: 'DELETE',
       headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({id}) ,
      }),
      invalidatesTags: ["vote"],
      
    }),
  /*   GetVote: builder.query({
      query: (id) => ({
        url: `gab/${id}/vote`,
        method: 'GET',
       
          }),
      providesTags:["vote"],
  
    }), */

    GetGabComment: builder.query({
      query: (id) => ({
        url: `gab/${id}/comments`,
        method: 'GET',
       
          }),
      providesTags:["comment"],
  
    }),

    GetUserGab:builder.query<gabtypes[], any>({
      query: () => ({
        url: 'gab/user/gabs',
        method: 'GET',
       
          }),
          providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'posts' as const, id })),
                { type: 'posts', id: 'LIST' },
              ]
            : [{ type: 'posts', id: 'LIST' }],
  
    }),
  }),
});




export const {
  useGetGabQuery,
  useGetGabidQuery,
  useCreatePostMutation,
  useGetGabCommentQuery,
  useCreateCommentMutation,
  useVoteMutation,
  useGetviralGabQuery,
  useDeleteuserMutation,
  useCreatereportMutation,
  useGetUserGabQuery
   } = Gabapi;