import { apiSlice } from "../../app/api/apiSlice.ts";

export const dividendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDividends: builder.query({
      query: (ticker) => ({
        url: `dividend/ticker/${ticker}/all`,
        method: "GET",
      }),
    }),
    
  }),
});

export const {
  useLazyGetAllDividendsQuery
} = dividendApiSlice;
