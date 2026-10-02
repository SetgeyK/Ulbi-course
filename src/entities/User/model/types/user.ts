import { UserRole } from '../consts/consts'

export interface User {
    id: string,
    username: string,
    token?: string,
    avatar?: string,
    roles?: UserRole[]
}

export interface UserSchema {
    authData?: User,

    _inited?: boolean
}