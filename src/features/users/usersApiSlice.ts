import { apiSlice } from "../../app/api/apiSlice.ts";
import { Credentials } from "../../utils/types.ts";

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
    setUserSettings: builder.mutation({
      query: (editName) => ({
        url: "user/settings",
        method: "PATCH",
        body: { name: editName },
      }),
    }),
    getUserMessages: builder.query({
      query: () => ({
        url: "user/name",
        method: "messages",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials: Credentials) => ({
        url: "user/forgotPassword",
        method: "post",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetUserNameQuery,
  useLazyGetUserSettingsQuery,
  useGetUserMessagesQuery,
  useSetUserSettingsMutation,
  useForgotPasswordMutation
} = usersApiSlice;
