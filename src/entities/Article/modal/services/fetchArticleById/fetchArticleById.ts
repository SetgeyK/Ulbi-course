import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../../types/article';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
    'articleDetails/fetchArticleById',
    async (articleId, thunkApi) => {
        const {
            rejectWithValue,
            extra
        } = thunkApi
        try {
            const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                params: {
                    _expand: 'user'
                }
            })

            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue('беда')
        }
    }
)