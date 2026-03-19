import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

function RequireAuth({children}: {children: JSX.Element}) {
    const auth = useSelector(getUserAuthData)
    const location = useLocation()

    if(!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />
    }

    return children
}

export default RequireAuth