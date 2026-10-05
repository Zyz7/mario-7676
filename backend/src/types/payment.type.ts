export type PaymentStatus = 
    | "pending" | "processing" | "paid" 
    | "failed" | "cancelled" | "refunded";

export interface Payment {
    id: number;
    userId: number;
    amount: number;
    currency: string;
    status: PaymentStatus;
    provider: string;
    providerPaymentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentCreate {
    userId: number;
    amount: number;
    currency: string;
}
