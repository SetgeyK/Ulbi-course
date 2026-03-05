import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { createReduxStore } from '../config/store'
import { StateSchema } from '../config/StateSchema'
import { useNavigate } from 'react-router'
import { ReducersMapObject } from '@reduxjs/toolkit'

interface StoreProviderProps {
    children?: ReactNode,
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
        asyncReducers
    } = props

    const navigate = useNavigate()

    const store = createReduxStore(initialState, asyncReducers, navigate)
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}