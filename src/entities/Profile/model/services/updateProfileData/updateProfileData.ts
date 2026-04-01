import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile, ValidateProfileError } from '../../types/profile';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const {
            rejectWithValue,
            extra,
            getState
        } = thunkAPI
        // const token = localStorage.getItem(USER_LOCALSTORAGE_KEY)
        const formData = getProfileForm(getState())
        const errors = validateProfileData(formData)
        if(errors.length) {
            return rejectWithValue(errors)
        }
        try {
            const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData)
            // const response = await extra.api.put<Profile>('/profile', formData, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // })
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue([ValidateProfileError.SERVER_ERROR])
        }
    }
)