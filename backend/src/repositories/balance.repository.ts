type Balance = {
    userId: string;
    amount: number;
};

const balances: Balance[] = [];

export const balanceRepository = {

    async getBalance(userId: string): Promise<number> {
        const balance = balances.find(
            b => b.userId === userId
        );

        return balance?.amount ?? 0;
    },

    async addBalance(userId: string, amount: number): Promise<number> {
        let balance = balances.find(
            b => b.userId === userId
        );

        if (!balance) {
            balance = {userId, amount: 0};
            balances.push(balance);
        }

        balance.amount += amount;
        return balance.amount;
    }
};
