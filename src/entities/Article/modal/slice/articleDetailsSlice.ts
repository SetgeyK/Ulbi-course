import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';

const initialState: ArticleDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
}

export const articleDetaisSlice = createSlice({
    name: 'articleDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
                state.data = action.payload
                state.isLoading = false
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { actions: articleDetailsActions } = articleDetaisSlice
export const { reducer: articleDetailsReducer } = articleDetaisSlice