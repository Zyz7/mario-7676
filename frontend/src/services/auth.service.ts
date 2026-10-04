import { api } from "./api";
import type { LoginRequestDto, RegisterRequestDto } from "../dtos/auth.dto";
import type { LoginResponseDto, RegisterResponseDto, User } from "../types/auth.type";


export const authService = {
    async login(data: LoginRequestDto): Promise<LoginResponseDto>{
        const response = await api.post<LoginResponseDto>("/auth/login", data);
        return response.data;
    },

    async register(data: RegisterRequestDto): Promise<RegisterResponseDto> {
        const response = await api.post<RegisterResponseDto>("/auth/register", data);
        return response.data;
    },

    async getMe(): Promise<User> {
        const response = await api.get<User>("/auth/me");
        return response.data;
    },

    async logout() {
        await api.post("/auth/logout");
    }
};
