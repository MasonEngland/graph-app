export interface LoginParams {
    username: string | null;
    password: string | null;
    email: string | null;
}

export interface RegisterParams {
    username: string | null,
    email: string | null,
    password: string | null,
}

export interface quickAuthParams {
    token?: string 
}
