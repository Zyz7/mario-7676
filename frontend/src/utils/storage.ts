import type { User } from "../types/auth.type";


const USERS = "users";
const BALANCE = "blanace";
const ACCESS_TOKEN = "accessToken";

export const storage = {
    // token
    getAccess(): string | null {
        return localStorage.getItem(ACCESS_TOKEN);
    },

    setAccess(token: string): void {
        localStorage.setItem(ACCESS_TOKEN, token);
    },
    
    removeAccess(): void {
        localStorage.removeItem(ACCESS_TOKEN);
    },

    // user
    getUsers(): User[] {
        const users = localStorage.getItem(USERS);
        if (!users) {
            return[];
        }

        try {
            return JSON.parse(users);
        } catch {
            return [];
        }
    },

    setUsers(users: User[]) {
        localStorage.setItem(USERS, JSON.stringify(users));
    },
    
    addUser(user: User) {
        const users = this.getUsers();

        users.push(user);
        this.setUsers(users);
    },

    // balance
    getBalance(): number {
        const balance = localStorage.getItem(BALANCE);
        if (!balance) {
            return 0;
        }

        const parsed = Number(balance);
        return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    },

    setBalance(balance: number) {
        localStorage.setItem(BALANCE, String(balance));
    },

    removeBalance() {
        localStorage.removeItem(BALANCE);
    },
}
