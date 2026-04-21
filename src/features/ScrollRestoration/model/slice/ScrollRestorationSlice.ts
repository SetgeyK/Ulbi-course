import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollRestorationSchema } from '../type/ScrollRestorationSchema';

const initialState: ScrollRestorationSchema = {
    scroll: {}
}

export const scrollRestorationSlice = createSlice({
    name: 'scroolRestoration',
    initialState,
    reducers: {
        setScroolPosition: (state, { payload }: PayloadAction<{ path: string, position: number}>) => {
            state.scroll[payload.path] = payload.position 
        }
    }
})

export const { actions: scrollRestorationActions } = scrollRestorationSlice
export const { reducer: scrollRestorationReducer } = scrollRestorationSlice