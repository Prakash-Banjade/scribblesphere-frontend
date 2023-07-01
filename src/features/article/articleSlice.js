import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    title: '',
    content: '',
    tags: '',
}

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setCurrentArticle: (state, action) => {
            const {title, content, tags, _id} = action.payload

            state.id = _id;
            state.title = title;
            state.content = content;
            state.tags = tags;
        },
        resetCurrentArticle: (state, action) => {
            state.title = state.content = state.tags = ''
        }
    }
})

export const {setCurrentArticle, resetCurrentArticle} = articleSlice.actions;

export const selectCurrentArticle = (state) => state.currentArticle;


export default articleSlice.reducer;