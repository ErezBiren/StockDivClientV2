import { apiSlice } from "../../app/api/apiSlice.ts";

const getTickerQuery = (ticker: string, endpoint: string) => ({
  url: `ticker/${ticker}/${endpoint}`,
  method: "GET",
});

export const tickerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickerSearch: builder.query({
      query: (dataToSearch: string) => ({
        url: `ticker/search?searchText=${dataToSearch.replace("&", "%26")}`,
        method: "GET",
      }),
    }),
    getTickerNews: builder.query({
      query: (ticker: string) => getTickerQuery(ticker, "news"),
    }),
    getTickerName: builder.query({
      query: (ticker: string) => getTickerQuery(ticker, "name"),
    }),
    getTickerLogo: builder.query({
      query: (ticker: string) => getTickerQuery(ticker, "logo"),
    }),
    getTickerCurrency: builder.query({
      query: (ticker: string) => getTickerQuery(ticker, "currency"),
    }),
    getTickerFrequency: builder.query({
      query: (ticker: string) => getTickerQuery(ticker, "frequency"),
    }),
    getTickerDailyChange: builder.query({
      query: (ticker: string) => getTickerQuery(ticker, "dailyChange"),
    }),
  }),
});

export const {
  useLazyGetTickerSearchQuery,
  useGetTickerNewsQuery,
  useGetTickerNameQuery,
  useGetTickerLogoQuery,
  useGetTickerCurrencyQuery,
  useGetTickerFrequencyQuery,
  useGetTickerDailyChangeQuery
} = tickerApiSlice;
