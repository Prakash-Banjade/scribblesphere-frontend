import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = action.payload
        }
    }
})

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user

export default userSlice.reducer;
