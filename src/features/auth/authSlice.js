import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    roles: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const {email, accessToken, roles} = action.payload;

            // console.log('setting credentials\n ', 'roles: ', roles)

            state.email = email 
            state.token = accessToken 
            state.roles = roles 
        },
        userLogout: (state, action) => {
            state.email = state.token = state.roles = null;
        },
        setNewAccessToken: (state, action) => {
            const {token} = action.payload;
            state.accessToken = token;
        }
    },
})

export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRoles = (state) => state.auth.roles;

export const {setCredentials, userLogout, setNewAccessToken} = authSlice.actions;

export default authSlice.reducer