import type { Balance } from "../types/balance.type";


const balances: Balance[] = [];

export const balanceRepository = {

    async getBalance(userId: number): Promise<number> {
        const balance = balances.find(b => b.userId === userId);

        return balance?.amount ?? 0;
    },

    async addBalance(userId: number, amount: number): Promise<number> {
        let balance = balances.find(b => b.userId === userId);

        if (!balance) {
            balance = {userId, amount: 0};
            balances.push(balance);
        }

        //balance.amount = (balance.amount ?? 0) + amount;
        balance.amount += amount;
        return balance.amount;
    }
};
