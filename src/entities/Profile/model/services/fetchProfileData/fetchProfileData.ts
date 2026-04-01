import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';


export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (profileId, thunkAPI) => {
        const {
            rejectWithValue,
            extra,
            // getState
        } = thunkAPI
        // const token = getState().user?.authData?.token
        try {
            const response = await extra.api.get<Profile>(`/profile/${profileId}`)
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
