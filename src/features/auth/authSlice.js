import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  roles: null,
  fullname: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, roles, fullname, email } = action.payload;
    //   console.log({ accessToken, roles, fullname, email });

      state.token = accessToken;
      state.roles = roles;
      state.fullname = fullname;
      state.email = email;
    },
    userLogout: (state, action) => {
      state.token = state.roles = state.fullname = state.email = null;
    },
    setNewAccessToken: (state, action) => {
      const { token } = action.payload;
      state.accessToken = token;
    },
  },
});

export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRoles = (state) => state.auth.roles;
export const selectCurrentUser = (state) => state.auth.fullname;

export const { setCredentials, userLogout, setNewAccessToken } =
  authSlice.actions;

export default authSlice.reducer;
