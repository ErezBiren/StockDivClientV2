import { apiSlice } from "../../app/api/apiSlice.ts";
import { IAnnouncement } from "../../utils/interfaces/IAnnouncement.ts";
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
    getUserMessages: builder.query<IAnnouncement[], void>({
      query: () => ({
        url: "user/messages",
        method: "GET",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials: Credentials) => ({
        url: "user/forgotPassword",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    contact: builder.mutation({
      query: (message: string) => ({
        url: "user/contact",
        method: "POST",
        body: { feedback: message },
      }),
    }),
    lastReadMessages: builder.mutation({
      query: () => ({
        url: "user/lastReadMessages",
        method: "PATCH",
      }),
    }),
    getExportTransactions: builder.query({
      query: () => ({
        url: "user/exportTransactions",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetExportTransactionsQuery,
  useGetUserNameQuery,
  useLazyGetUserSettingsQuery,
  useGetUserMessagesQuery,
  useSetUserSettingsMutation,
  useForgotPasswordMutation,
  useLastReadMessagesMutation,
  useContactMutation,
} = usersApiSlice;
