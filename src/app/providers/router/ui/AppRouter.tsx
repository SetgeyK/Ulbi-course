import { memo, Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router'
import { PageLoader } from '@/widgets/PageLoader'
import RequireAuth from './RequireAuth'
import { AppRouteProps } from '@/shared/types/router'
import { routeConfig } from '../config/routeConfig'

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        const element = (
            <>{route.element}</>
        )
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly
                            ? <RequireAuth roles={route.roles}>{element}</RequireAuth>
                            : element
                        }
            />
        )}, [])

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(routeConfig).map(renderWithWrapper)}
            </Routes>
        </Suspense>
    )
})

AppRouter.displayName = 'AppRouter'