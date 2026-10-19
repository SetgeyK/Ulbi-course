import { RouteProps } from 'react-router'
import { UserRole } from '@/entities/User'

export type AppRouteProps = RouteProps & {
    authOnly?: boolean,
    roles?: UserRole[]
}