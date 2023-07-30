import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      console.log(token)
      state.token = token;
    },
    userLogout: (state, action) => {
      state.token = null;
    }
  },
});

export const selectCurrentToken = (state) => state.auth.token;

export const { setCredentials, userLogout } = authSlice.actions;

export default authSlice.reducer;
