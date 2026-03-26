export interface User {
    id: number,
    username: string,
    token?: string,
    avatar?: string
}

export interface UserSchema {
    authData?: User,

    _inited?: boolean
}