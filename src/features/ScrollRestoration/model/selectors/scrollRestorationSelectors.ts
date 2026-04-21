import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getScrolRestoration = (state: StateSchema) => state.scrollRestoration.scroll

export const getScrolRestorationByPath = createSelector(
    getScrolRestoration,
    (state: StateSchema, path: string) =>  path,
    (scroll, path) => scroll[path] || 0
)