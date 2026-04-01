import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article/modal/selectors/articleDetails';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';


export const addCommentForAtricle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForAtricle',
    async (text, thunkAPI) => {
        const { 
            extra,
            rejectWithValue,
            dispatch,
            getState
        } = thunkAPI

        const userData = getUserAuthData(getState())
        const article = getArticleDetailsData(getState())

        if (!userData || !text || !article) {
            return rejectWithValue('no data')
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text
            }, )

            if(!response.data) {
                throw new Error()
            }

            dispatch(fetchCommentsByArticleId(article.id))
            return response.data
        } catch (e) {
            return rejectWithValue('')
        }
    }
)
