import { apiSlice } from "../../app/api/apiSlice.ts";

export const tickerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickerSearch: builder.query({
      
      query: (dataToSearch: string) => ({
        url: `ticker/search?searchText=${dataToSearch.replace("&", "%26")}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetTickerSearchQuery } = tickerApiSlice;
