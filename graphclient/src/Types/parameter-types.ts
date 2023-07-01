export interface LoginParams {
    username: string | null;
    password: string | null;
    email: string | null;
}

export interface RegisterParams {
    name: string | null,
    email: string | null,
    userIcon: string | null,
    password: string | null,
}
