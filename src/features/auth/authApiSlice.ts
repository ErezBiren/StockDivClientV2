import { apiSlice } from "../../app/api/apiSlice.ts";

export interface Credentials {
  email: string;
  password: string;
  confirmationCode: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    // todo: fix any
    login: builder.mutation({
      query: (credentials: Credentials) => ({
        url: "user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getUserName: builder.query({
      query: () => ({
        url: "user/name",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserNameQuery } = authApiSlice;
