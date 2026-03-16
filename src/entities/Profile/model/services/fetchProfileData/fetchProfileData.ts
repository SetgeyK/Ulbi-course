import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';


export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkAPI) => {
        const {
            rejectWithValue,
            extra,
            // getState
        } = thunkAPI
        // const token = getState().user?.authData?.token
        try {
            const response = await extra.api.get<Profile>('/profile')
            // const response = await extra.api.get<Profile>('/profile', {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // })
            
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue('Вы ввели неверный логин или пароль')
        }
    }
)
