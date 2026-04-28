import { FC, ReactNode, useEffect } from 'react'
import { ReduxStoreWithManager } from 'app/providers/StoreProvider'
import { useDispatch, useStore } from 'react-redux'
import { StateSchema, StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'
import { Reducer } from '@reduxjs/toolkit'

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>
}

interface DynamicModuleLoaderProps {
    children: ReactNode,
    reducers: ReducersList,
    removeAfterUnmount?: boolean
} 


export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        reducers,
        children,
        removeAfterUnmount
    } = props
    const store = useStore() as ReduxStoreWithManager
    const dispatch = useDispatch()

    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers()
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey]
            // добавляем редюсер, если его еще нет
            if(!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer)
                dispatch({type: `@INIT ${name} reducer`})
            }
        })
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey)
                    dispatch({type: `@DESTROY ${name} reducer`})
                })
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            {children}
        </>
    )
}