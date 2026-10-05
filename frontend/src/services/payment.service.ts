import { api } from "./api";
import type { PaymentStatusDto } from "../dtos/payment.dto";
import type { BalanceResponse, PaymentRecharge, PaymentCreate } from "../types/payment.type";


export const paymentService = {
    async getBalance(): Promise<number> {
        const response = await api.get<BalanceResponse>("/payment/balance");
        return response.data.Balance;
    },

    async recharge(data: PaymentRecharge): Promise<PaymentCreate>{
        const response = await api.post<PaymentCreate>("/payment/recharge", data);
        return response.data;
    },

    async status(id: number): Promise<PaymentStatusDto>{
        const response = await api.get<PaymentStatusDto>(`/payment/status/${id}`);
        return response.data;
    }
};
