import { apiSlice } from "../../app/api/apiSlice.ts";

export const tickerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickerSearch: builder.query({
      query: (dataToSearch: string) => ({
        url: `ticker/search?searchText=${dataToSearch.replace("&", "%26")}`,
        method: "GET",
      }),
    }),
    getTickerNews: builder.query({
      query: (ticker: string) => ({
        url: `ticker/${ticker}/news`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetTickerSearchQuery, useGetTickerNewsQuery } =
  tickerApiSlice;
