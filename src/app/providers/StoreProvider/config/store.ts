import { configureStore, EnhancedStore, Reducer, ReducersMapObject, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { NavigateOptions, To } from 'react-router'

import { StateSchema, ThunkExtraArg } from './StateSchema' 
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'
import { createReducerManager } from './reducerManager'
import { $api } from 'shared/api/api'

export interface ExtendedStore extends EnhancedStore<StateSchema> {
    reducerManager: ReturnType<typeof createReducerManager>;
}


export function createReduxStore(
        initialState?: StateSchema,
        asyncReducers?: ReducersMapObject<StateSchema>, 
        navigate?: (to: To, options?: NavigateOptions) => void,
    ) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
    }

    const reducerManager = createReducerManager(rootReducers)

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<StateSchema, UnknownAction>,
        devTools: __IS_DEV__,
        preloadedState: initialState as unknown as StateSchema,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api,
                    navigate
                }
            }
        })
    }) as ExtendedStore

    store.reducerManager = reducerManager

    return store
}

// export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

export type AppDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, UnknownAction>;
