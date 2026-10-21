import { RouteProps } from 'react-router'
// eslint-disable-next-line @sj_lk/sj-plugin/layer-imports
import { UserRole } from '@/entities/User'

export type AppRouteProps = RouteProps & {
    authOnly?: boolean,
    roles?: UserRole[]
}