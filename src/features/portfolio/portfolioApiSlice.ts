import { apiSlice } from "../../app/api/apiSlice.ts";

const getPortfolioQuery = (selectedPortfolio: string, endpoint: string) => ({
  url: `portfolio/${selectedPortfolio}/${endpoint}`,
  method: "GET",
});

const getDividendQuery = (selectedPortfolio: string, endpoint: string) => ({
  url: `dividend/portfolio/${selectedPortfolio}/${endpoint}`,
  method: "GET",
});

export const portfolioApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: () => ({
        url: "portfolio/all",
        method: "GET",
      }),
    }),
    getAssets: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "assets"),
    }),
    getMarketValue: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "marketValue"),
    }),
    getInvested: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "invested"),
    }),
    getDailyChange: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "dailyChange"),
    }),
    getLastTotalDividend: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "lastTotalDividend"),
    }),
    getCurrency: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "currency"),
    }),
    getRoiMeter: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "roiMeter"),
    }),
    getDiversity: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "diversity"),
    }),
    getPerformance: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "performance"),
    }),
    getTimeline: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "timeline"),
    }),
    getHighestIncome: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "highestIncome"),
    }),
    getNews: builder.query({
      query: (selectedPortfolio) =>
        getPortfolioQuery(selectedPortfolio, "news"),
    }),
    getSoFar: builder.query({
      query: (selectedPortfolio) =>
        getDividendQuery(selectedPortfolio, "soFar"),
    }),

    getNext: builder.query({
      query: (selectedPortfolio) => getDividendQuery(selectedPortfolio, "next"),
    }),
    getPeriods: builder.query({
      query: (selectedPortfolio) =>
        getDividendQuery(selectedPortfolio, "periods"),
    }),
    getAlerts: builder.query({
      query: (selectedPortfolio) =>
        getDividendQuery(selectedPortfolio, "alerts"),
    }),
    getMonthsProjection: builder.query({
      query: (selectedPortfolio) =>
        getDividendQuery(selectedPortfolio, "monthsProjection"),
    }),
    getIncomeLastYear: builder.query({
      query: (selectedPortfolio) =>
        getDividendQuery(selectedPortfolio, "incomeLastYear"),
    }),
    getAverageIncrease: builder.query({
      query: (selectedPortfolio) =>
        getDividendQuery(selectedPortfolio, "averageIncrease"),
    }),
    getTickerTimeline: builder.query({
      query: ({
        portfolio,
        ticker,
      }: {
        portfolio: string;
        ticker: string;
      }) => ({
        url: `portfolio/${portfolio}/ticker/${ticker}/timeline`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetTickerTimelineQuery,
  useGetAverageIncreaseQuery,
  useGetIncomeLastYearQuery,
  useGetPortfoliosQuery,
  useGetMarketValueQuery,
  useGetRoiMeterQuery,
  useGetCurrencyQuery,
  useGetDiversityQuery,
  useGetDailyChangeQuery,
  useGetInvestedQuery,
  useGetHighestIncomeQuery,
  useGetSoFarQuery,
  useGetNextQuery,
  useGetPeriodsQuery,
  useGetAlertsQuery,
  useGetMonthsProjectionQuery,
  useGetPerformanceQuery,
  useGetNewsQuery,
  useGetLastTotalDividendQuery,
  useGetAssetsQuery,
} = portfolioApiSlice;
