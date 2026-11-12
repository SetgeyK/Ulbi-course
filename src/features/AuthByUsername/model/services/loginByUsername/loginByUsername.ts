import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;

        try {
            const responce = await extra.api.post<User>('/login', authData, { headers: { Authorization: '123' } });
            if (!responce.data) {
                throw new Error();
            }

            dispatch(userActions.setAuthData(responce.data));
            return responce.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Вы ввели неверный логин или пароль');
        }
    },
);
