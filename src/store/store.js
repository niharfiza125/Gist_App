import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import gistsReducer from './gistsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gists: gistsReducer,
  },
});
