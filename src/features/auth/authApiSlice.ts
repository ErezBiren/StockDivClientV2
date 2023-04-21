import { apiSlice } from "../../app/api/apiSlice.ts";

export interface Credentials {
  email: string;
  password: string;
  confirmationCode: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: Credentials) => ({
        url: "user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
