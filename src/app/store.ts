import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import { tickerApiSlice } from "../features/ticker/tickerApiSlice";
import { portFolioApiSlice } from "../features/portfolio/portfolioApiSlice";
import stockdivReducer from "../features/stockdivSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    [portFolioApiSlice.reducerPath]: portFolioApiSlice.reducer,
    stockdiv: stockdivReducer,
    [tickerApiSlice.reducerPath]: tickerApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // todo: turn off in production
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
