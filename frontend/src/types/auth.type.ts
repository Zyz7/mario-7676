export interface User {
    id: number;
    name: string;
    email: string;
}

export interface LoginResponseDto {
    user: User;
    token: string;
}

export type RegisterResponseDto = User;

export interface ErrorResponseDto {
    message: string;
}
