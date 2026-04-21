import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageAction } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList';

export const initAtriclesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async(_, thunkApi) => {
        const { dispatch, getState } = thunkApi
        const inited = getArticlesPageInited(getState())
        if(!inited) {
            dispatch(articlesPageAction.initState())
            dispatch(fetchArticlesList({
                page: 1
            }))
        }
    }
)