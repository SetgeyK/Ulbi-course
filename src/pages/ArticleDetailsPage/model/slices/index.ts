import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleDetailsRecomendationReducer } from './articleDetailsRecomendationSlice';

export const articleDetaisPageReducer: Reducer<ArticleDetailsPageSchema> = combineReducers({
    comments: articleDetailsCommentsReducer,
    recomendations: articleDetailsRecomendationReducer
})