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
  }),
});

export const { useGetPortfoliosQuery } = portFolioApiSlice;
