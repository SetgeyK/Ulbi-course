import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { setFeaturesFlags } from '@/shared/lib/features';
import { FeaturesFlags } from '@/shared/types/featuresFlags';

import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            setFeaturesFlags(action.payload.features as FeaturesFlags);
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                const json = JSON.parse(user) as User;
                state.authData = json;
                setFeaturesFlags(json.features as FeaturesFlags);
            }
            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveJsonSettings.fulfilled, (state, action: PayloadAction<JsonSettings>) => {
            if (state.authData) {
                state.authData.jsonSettings = action.payload;
            }
        });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
