import { StoreProvider } from './ui/StoreProvider'
import { createReduxStore } from './config/store'
import type { StateSchema, StateSchemaKey, ReduxStoreWithManager, ThunkExtraArg, ThunkConfig } from './config/StateSchema'
import type { AppDispatch } from './config/store'

export {
    StateSchema,
    StateSchemaKey,
    AppDispatch,
    StoreProvider,
    createReduxStore,
    ReduxStoreWithManager,
    ThunkExtraArg,
    ThunkConfig
}