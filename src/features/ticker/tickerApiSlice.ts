import { apiSlice } from "../../app/api/apiSlice.ts";

const getTickerQuery = (ticker: string, endpoint: string) => ({
  url: `ticker/${ticker}/${endpoint}`,
  method: "GET",
});

const getTickerAndPortfolioQuery = (
  ticker: string,
  portfolio: string,
  endpoint: string
) => ({
  url: `ticker/${ticker}/${portfolio}/${endpoint}`,
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
    getTickerPrice: builder.query({
      query: ({ ticker, when }: { ticker: string; when: string }) => ({
        url: `ticker/${ticker}/price?ofDate=${when}`,
        method: "GET",
      }),
    }),
    getTickerAveragePrice: builder.query({
      query: ({ ticker, portfolio }: { ticker: string; portfolio: string }) =>
        getTickerAndPortfolioQuery(ticker, portfolio, "averagePrice"),
    }),
    getWhatHappenedSince: builder.query({
      query: ({ ticker, portfolio }: { ticker: string; portfolio: string }) =>
        getTickerAndPortfolioQuery(ticker, portfolio, "whatHappenedSince"),
    }),
  }),
});

export const {
  
  useLazyGetWhatHappenedSinceQuery,
  useGetTickerCurrencyQuery,
  useLazyGetTickerPriceQuery,
  useLazyGetTickerSearchQuery,
  useGetTickerNewsQuery,
  useLazyGetTickerNameQuery,
  useLazyGetTickerLogoQuery,
  useLazyGetTickerCurrencyQuery,
  useGetTickerFrequencyQuery,
  useLazyGetTickerDailyChangeQuery,
  useLazyGetTickerAveragePriceQuery
} = tickerApiSlice;
