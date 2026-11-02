import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react'
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line @sj_lk/sj-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line @sj_lk/sj-plugin/layer-imports
import '@/app/styles/variables/index.scss'

export interface componentRenderOptions {
    route?: string,
    initialState?: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
    theme?: Theme
}

interface TestProviderProps {
    children: ReactNode,
    options?: componentRenderOptions
}

export function TestProvider(props:TestProviderProps) {
    const { children, options = {} } = props
    const {
        route= '/',
        initialState,
        asyncReducers,
        theme
    } = options
    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
                <ThemeProvider initialTheme={theme}>
                    <div className={`app ${theme}`}>
                        {children}
                    </div>
                </ThemeProvider>
            </StoreProvider>
        </MemoryRouter>
    )
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
    return render (
        <TestProvider options={options}>
            {component}
        </TestProvider>
    )
}
