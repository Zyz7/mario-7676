import type { PaymentStatusDto } from "../dtos/payment.dto";


export type PaymentStatus = 
    | "pending" | "processing" | "paid" 
    | "failed" | "cancelled" | "refunded";
    
export interface BalanceResponse {
  Balance: number;
}

export interface PaymentStore {
  balance: number;
  isLoading: boolean;

  initializeBalance: () => Promise<void>;
  recharge: (data: PaymentRecharge) => Promise<void>;
  status: (id: number) => Promise<PaymentStatusDto>;
}

export interface PaymentRecharge {
    amount: number;
    currency: string;
}

export interface PaymentCreate {
    paymentId: number;
    checkoutUrl: string;
}
