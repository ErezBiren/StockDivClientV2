import { apiSlice } from "../../app/api/apiSlice.ts";

export const portFolioApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: () => ({
        url: "portfolio/all",
        method: "GET",
      }),
    }),
    getMarketValue: builder.query({
      query: (selectedPortfolio) => ({
        url: `portfolio/${selectedPortfolio}/marketValue`,
        method: "GET",
      }),
    }),
    getInvested: builder.query({
      query: (selectedPortfolio) => ({
        url: `portfolio/${selectedPortfolio}/invested`,
        method: "GET",
      }),
    }),
    getDailyChange: builder.query({
      query: (selectedPortfolio) => ({
        url: `portfolio/${selectedPortfolio}/dailyChange`,
        method: "GET",
      }),
    }),
    getLastTotalDividend: builder.query({
      query: (selectedPortfolio) => ({
        url: `portfolio/${selectedPortfolio}/lastTotalDividend`,
        method: "GET",
      }),
    }),
    getCurrency: builder.query({
      query: (selectedPortfolio) => ({
        url: `portfolio/${selectedPortfolio}/currency`,
        method: "GET",
      }),
    }),
    getRoiMeter: builder.query({
      query: (selectedPortfolio) => ({
        url: `portfolio/${selectedPortfolio}/roiMeter`,
        method: "GET",
      }),
    }),
    getDiversity: builder.query({
      query: (selectedPortfolio) => ({
        url: `portfolio/${selectedPortfolio}/diversity`,
        method: "GET",
      }),
    }),
    getPerformance: builder.query({
      query: (selectedPortfolio) => ({
        url: `portfolio/${selectedPortfolio}/performance`,
        method: "GET",
      }),
    }),
    getTimeline: builder.query({
      query: (selectedPortfolio) => ({
        url: `portfolio/${selectedPortfolio}/timeline`,
        method: "GET",
      }),
    }),
    getHighestIncome: builder.query({
      query: (selectedPortfolio) => ({
        url: `portfolio/${selectedPortfolio}/highestIncome`,
        method: "GET",
      }),
    }),
    getNews: builder.query({
      query: (selectedPortfolio) => ({
        url: `portfolio/${selectedPortfolio}/news`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPortfoliosQuery } = portFolioApiSlice;
