import { JSX, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
    children: JSX.Element,
    roles?: UserRole[] 
}

function RequireAuth({children, roles}: RequireAuthProps) {
    const auth = useSelector(getUserAuthData)
    const location = useLocation()

    const userRoles = useSelector(getUserRoles)
    const hasRequiredRole = useMemo(() => {
        if(!roles) {
            return true
        }
        return roles.some(requiredRole => {
            const hasRole = userRoles?.includes(requiredRole)
            return hasRole
        })
    }, [roles, userRoles])

    if(!auth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />
    }

    if(!hasRequiredRole) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />
    }

    return children
}

export default RequireAuth