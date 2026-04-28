import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageAction } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { SortOrder } from 'shared/types';
import { ArticleSortFields, ArticleType } from 'entities/Article';

export const initAtriclesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async(searchParams, thunkApi) => {
        const { dispatch, getState } = thunkApi
        const inited = getArticlesPageInited(getState())
        if(!inited) {
            const orderFromUrl = searchParams.get('order') as SortOrder
            const sortFromUrl = searchParams.get('sort') as ArticleSortFields
            const searchFromUrl = searchParams.get('search')
            const typeFromUrl = searchParams.get('type') as ArticleType

            if (orderFromUrl) {
                dispatch(articlesPageAction.setOrder(orderFromUrl))
            }
            if (sortFromUrl) {
                dispatch(articlesPageAction.setSort(sortFromUrl))
            }
            if (searchFromUrl) {
                dispatch(articlesPageAction.setSearch(searchFromUrl))
            }
            if (typeFromUrl) {
                dispatch(articlesPageAction.setType(typeFromUrl))
            }
             
            dispatch(articlesPageAction.initState())
            dispatch(fetchArticlesList({}))
        }
    }
)