export interface LoginResponseDto {
    user: {
        id: string;
        name: string;
        email: string;
    },
    token: string;
}

export interface RegisterResponseDto {
    id: string;
    name: string;
    email: string;
}

export interface ErrorResponseDto {
    message: string;
}
