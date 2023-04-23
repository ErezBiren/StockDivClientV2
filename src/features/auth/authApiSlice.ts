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
  }),
});

export const { useLoginMutation } = authApiSlice;
