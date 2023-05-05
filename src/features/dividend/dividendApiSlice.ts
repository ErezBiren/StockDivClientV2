import { apiSlice } from "../../app/api/apiSlice.ts";

export const dividendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDividends: builder.query({
      query: (ticker) => ({
        url: `dividend/ticker/${ticker}/all`,
        method: "GET",
      }),
    }),
    getAverageIncrease: builder.query({
      query: (ticker) => ({
        url: `dividend/ticker/${ticker}/averageIncrease`,
        method: "GET",
      }),
    }),
    
  }),
});

export const {
  useLazyGetAllDividendsQuery,
  useLazyGetAverageIncreaseQuery,
} = dividendApiSlice;
