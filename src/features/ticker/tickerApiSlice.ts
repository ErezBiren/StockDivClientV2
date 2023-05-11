import { apiSlice } from "../../app/api/apiSlice.ts";
import { ITickerUserData } from "../../utils/interfaces/ITickerUserData.ts";
import { TickerPortfolioType } from "../../utils/interfaces/TickerPortfolio.ts";

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
    submitTickerUserData: builder.mutation({
      query: (tickerUserData: ITickerUserData) => ({
        url: `ticker/${tickerUserData.ticker}/${tickerUserData.portfolio}/userData`,
        method: "POST",
        body: {
          tax: tickerUserData.tax,
          notes: tickerUserData.notes,
        },
      }),
    }),
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
      query: ({ ticker, portfolio }: TickerPortfolioType) =>
        getTickerAndPortfolioQuery(ticker, portfolio, "averagePrice"),
    }),
    getWhatHappenedSince: builder.query({
      query: ({ ticker, portfolio }: TickerPortfolioType) =>
        getTickerAndPortfolioQuery(ticker, portfolio, "whatHappenedSince"),
    }),
    getTickerUserData: builder.query<any, TickerPortfolioType>({
      query: ({ ticker, portfolio }: TickerPortfolioType) =>
        getTickerAndPortfolioQuery(ticker, portfolio, "userData"),
    }),
    getTickerDividendYield: builder.query({
      query: ({ ticker, portfolio }: TickerPortfolioType) =>
        getTickerAndPortfolioQuery(ticker, portfolio, "dividendYield"),
    }),
  }),
});

export const {
  useLazyGetTickerDividendYieldQuery,
  useLazyGetTickerUserDataQuery,
  useLazyGetWhatHappenedSinceQuery,
  useGetTickerCurrencyQuery,
  useLazyGetTickerPriceQuery,
  useLazyGetTickerSearchQuery,
  useGetTickerNewsQuery,
  useLazyGetTickerNameQuery,
  useLazyGetTickerLogoQuery,
  useLazyGetTickerCurrencyQuery,
  useLazyGetTickerFrequencyQuery,
  useLazyGetTickerDailyChangeQuery,
  useLazyGetTickerAveragePriceQuery,
  useSubmitTickerUserDataMutation,
} = tickerApiSlice;
