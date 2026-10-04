import { create } from "zustand";
import { storage } from "../utils/storage";
import type { User } from "../types/auth.type";
import { authService } from "../services/auth.service";
import type { LoginRequestDto } from "../dtos/auth.dto";


interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    login: (data: LoginRequestDto) => Promise<void>;
    logout: () => Promise<void>;
    initialize: () => Promise<void>;
}

export const authStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    login: async (data) => {
        try {
            const response = await authService.login(data);
            storage.setAccess(response.token);
            set({user: response.user, isAuthenticated: true, isLoading: false});
        } catch (error) {
            set({user: null, isAuthenticated: false, isLoading: false,});
            throw error;
        }
    },

    logout: async () => {
        try {
            await authService.logout();
        } finally {
            storage.removeAccess();
            set({user: null, isAuthenticated: false, isLoading: false,});
        }
    },

    initialize: async () => {
        const token = storage.getAccess();
        if (!token) {
            set({user: null, isAuthenticated: false, isLoading: false,});
            return;
        }

        try {
            const user = await authService.getMe();
            set({user, isAuthenticated: true, isLoading: false,});
        } catch {
            storage.removeAccess();
            set({user: null, isAuthenticated: false, isLoading: false,});
        }
    },

}));
