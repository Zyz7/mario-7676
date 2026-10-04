export interface LoginResponseDto {
    user: {
        id: number;
        name: string;
        email: string;
    },
    token: string;
}

export interface RegisterResponseDto {
    id: number;
    name: string;
    email: string;
}

export interface ErrorResponseDto {
    message: string;
}
