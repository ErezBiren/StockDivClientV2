import { apiSlice } from "../../app/api/apiSlice.ts";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserName: builder.query({
      query: () => ({
        url: "user/name",
        method: "GET",
      }),
    }),
    getUserSettings: builder.query({
      query: () => ({
        url: "user/settings",
        method: "GET",
      }),
    }),
    getUserMessages: builder.query({
      query: () => ({
        url: "user/name",
        method: "messages",
      }),
    }),
  }),
});

export const {
  useGetUserNameQuery,
  useLazyGetUserSettingsQuery,
  useGetUserMessagesQuery,
} = usersApiSlice;
