import type { PaymentStatus } from "../types/payment.type";

export interface PaymentStatusDto {
    id: string;
    status: PaymentStatus;
    status_detail: string;
    transaction_amount: string;
    date_created: Date;
    authorization_code: string | null;
    reference: string;
    payer_id: number;
    payer_email: string;
}
