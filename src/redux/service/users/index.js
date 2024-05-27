import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gproductsAPI = createApi({
    reducerPath: 'gproductsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://665430221c6af63f4676bee4.mockapi.io/gproducts/api/v1/' }),
    endpoints: (builder) => ({
      //get all student list
  
      GetLoginUserDetails: builder.query({
          query: () => ({ url: '/users'})
      }),
  
      createAccount: builder.mutation({
        query: (payload) => ({ url: '/users', method: 'POST', body: payload})
      })
    }),
})

export const { useGetLoginUserDetailsQuery, useCreateAccountMutation } = gproductsAPI;