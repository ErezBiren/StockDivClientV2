import { apiSlice } from "../../app/api/apiSlice.ts";

export const portFolioApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: () => ({
        url: "portfolio/all",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPortfoliosQuery } = portFolioApiSlice;
