export interface User {
    id: number,
    username: string,
    token?: string
}

export interface UserSchema {
    authData?: User,
}