// AuthApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from './config';

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ( sms: string) => ({
        url: '/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({ sms }),
      }),
    }),
    Authenticate: builder.mutation({
      query: ({ sms, smsToken }) => ({
        url: '/auth/authenticate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({ sms, smsToken }),
      }),
    }),
  }),
});

export const { useLoginMutation, useAuthenticateMutation } = AuthApi;
