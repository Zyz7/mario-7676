import { api } from "./api";
import type { BalanceResponseDto } from "../types/payment.type";


export const paymentService = {
    async getBalance(): Promise<number> {
        const response = await api.get<BalanceResponseDto>("/payment/balance");
        return response.data.Balance;
    }
};
