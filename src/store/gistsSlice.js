import { createSlice } from "@reduxjs/toolkit";

const gistsSlice = createSlice({
  name: "gists",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchGistsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGistsSuccess: (state, action) => {
        state.list = action.payload; 
        state.loading = false;
      },
      
    fetchGistsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchGistsStart, fetchGistsSuccess, fetchGistsFailure } = gistsSlice.actions;
export default gistsSlice.reducer;
