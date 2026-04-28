import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleDetailsRecomendationSchema } from '../types/ArticleDetailsRecomendationSchema';
import { Article } from 'entities/Article';
import { fetchArticlesRecomendations } from '../services/fetchArticleRecomendations.ts/fetchArticleRecomendations.ts';


const initialState = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined
}

const recomendationAdapter = createEntityAdapter<Article>({})

export const getArticleRecomendations = recomendationAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recomendations || recomendationAdapter.getInitialState()
)

const articleDetailsRecomendationSlice = createSlice({
    name: 'articleDetailsRecomendationSlice',
    initialState: recomendationAdapter.getInitialState<ArticleDetailsRecomendationSchema>(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesRecomendations.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchArticlesRecomendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.error = undefined
                state.isLoading = false
                recomendationAdapter.setAll(state, action.payload)
            })
            .addCase(fetchArticlesRecomendations.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { actions: articleDetailsRecomendationActions } = articleDetailsRecomendationSlice
export const { reducer: articleDetailsRecomendationReducer } = articleDetailsRecomendationSlice