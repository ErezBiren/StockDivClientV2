import { apiSlice } from "../../app/api/apiSlice.ts";

const GetPortfolioQuery = (selectedPortfolio: string, endpoint: string) => ({
  url: `portfolio/${selectedPortfolio}/${endpoint}`,
  method: "GET",
});

export const portFolioApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: () => GetPortfolioQuery("all", ""),
    }),
    getMarketValue: builder.query({
      query: (selectedPortfolio) =>
        GetPortfolioQuery(selectedPortfolio, "marketValue"),
    }),
    getInvested: builder.query({
      query: (selectedPortfolio) =>
        GetPortfolioQuery(selectedPortfolio, "invested"),
    }),
    getDailyChange: builder.query({
      query: (selectedPortfolio) =>
        GetPortfolioQuery(selectedPortfolio, "dailyChange"),
    }),
    getLastTotalDividend: builder.query({
      query: (selectedPortfolio) =>
        GetPortfolioQuery(selectedPortfolio, "lastTotalDividend"),
    }),
    getCurrency: builder.query({
      query: (selectedPortfolio) =>
        GetPortfolioQuery(selectedPortfolio, "currency"),
    }),
    getRoiMeter: builder.query({
      query: (selectedPortfolio) =>
        GetPortfolioQuery(selectedPortfolio, "roiMeter"),
    }),
    getDiversity: builder.query({
      query: (selectedPortfolio) =>
        GetPortfolioQuery(selectedPortfolio, "diversity"),
    }),
    getPerformance: builder.query({
      query: (selectedPortfolio) =>
        GetPortfolioQuery(selectedPortfolio, "performance"),
    }),
    getTimeline: builder.query({
      query: (selectedPortfolio) =>
        GetPortfolioQuery(selectedPortfolio, "timeline"),
    }),
    getHighestIncome: builder.query({
      query: (selectedPortfolio) =>
        GetPortfolioQuery(selectedPortfolio, "highestIncome"),
    }),
    getNews: builder.query({
      query: (selectedPortfolio) =>
        GetPortfolioQuery(selectedPortfolio, "news"),
    }),

    getSoFar: builder.query({
      query: (selectedPortfolio) => ({
        url: `dividend/portfolio/${selectedPortfolio}/soFar`,
        method: "GET",
      }),
    }),
    getNext: builder.query({
      query: (selectedPortfolio) => ({
        url: `dividend/portfolio/${selectedPortfolio}/next`,
        method: "GET",
      }),
    }),
    getPeriods: builder.query({
      query: (selectedPortfolio) => ({
        url: `dividend/portfolio/${selectedPortfolio}/periods`,
        method: "GET",
      }),
    }),
    getAlerts: builder.query({
      query: (selectedPortfolio) => ({
        url: `dividend/portfolio/${selectedPortfolio}/alerts`,
        method: "GET",
      }),
    }),
    getMonthsProjection: builder.query({
        query: (selectedPortfolio) => ({
          url: `dividend/portfolio/${selectedPortfolio}/monthsProjection`,
          method: "GET",
        }),
      }),
  }),
});

export const {
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
  useGetMonthsProjectionQuery
} = portFolioApiSlice;
