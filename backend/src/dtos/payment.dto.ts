export type PaymentResponseDto = {
    id: string;
    status: string;
    status_detail: string;
    transaction_amount: string;
    date_created: Date;
    authorization_code: string | null;
    reference: string;
    payer_id: string;
    payer_email: string;
}