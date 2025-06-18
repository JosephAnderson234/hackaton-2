export interface RegisterRequest {
    email: string;
    passwd: string;
}
export interface LoginRequest {
    email: string;
    passwd: string;
}
export interface LoginResponse {
    status?: number;
    message?: string;
    data?: {
        token?: string;
        email?: string;
    };
    result?: {
        token?: string;
        username?: string;
        email?: string;
    };
    token?: string;
    email?: string;
}
export interface User {
    email: string;
    token: string;
}
