import authService from '../appwrite/authService'; 
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  userData: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.error = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});


export const restoreSession = () => async (dispatch) => {
  try {
    const userSession = await authService.getCurrentUser(); 
    if (userSession) {
      dispatch(loginSuccess({ userData: userSession }));
    }
  } catch (error) {
    dispatch(loginFailure({ error: error.message }));
  }
};

export const { loginStart, loginSuccess, loginFailure, logout, resetError } = authSlice.actions;
export default authSlice.reducer;

