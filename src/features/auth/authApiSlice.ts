import { apiSlice } from "../../app/api/apiSlice.ts";
import { Credentials } from "../../utils/types.ts";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: Credentials) => ({
        url: "user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials: Credentials) => ({
        url: "user/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation , useRegisterMutation } = authApiSlice;
