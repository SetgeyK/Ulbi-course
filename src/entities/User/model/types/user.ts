export interface User {
    id: string,
    username: string,
    token?: string,
    avatar?: string
}

export interface UserSchema {
    authData?: User,

    _inited?: boolean
}