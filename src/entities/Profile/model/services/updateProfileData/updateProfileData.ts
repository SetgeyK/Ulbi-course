import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/updateProfileData',
    async (__, thunkAPI) => {
        const {
            rejectWithValue,
            extra,
            getState
        } = thunkAPI
        // const token = localStorage.getItem(USER_LOCALSTORAGE_KEY)
        const formData = getProfileForm(getState())
        try {
            const response = await extra.api.put<Profile>('/profile', formData)
            // const response = await extra.api.put<Profile>('/profile', formData, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // })
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue('Не получилось :(')
        }
    }
)