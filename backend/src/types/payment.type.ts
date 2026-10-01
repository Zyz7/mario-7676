export type PaymentStatus = 
    | "pending" | "processing" | "paid" 
    | "failed" | "cancelled" | "refunded";

export interface Payment {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    provider: string;
    providerPaymentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentCreate {
    userId: string;
    amount: number;
    currency: string;
}
