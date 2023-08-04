import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profilePicture: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload
        }
    }
})

export const selectProfilePicture = (state) => state.user.profilePicture;

export const { setProfilePicture } = userSlice.actions;

export default userSlice.reducer;
