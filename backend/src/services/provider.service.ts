export interface CreateCheckoutParamas {
    paymentId: string;
    amount: number;
    currency: string;
    successUrl: string;
    cancelUrl: string;
}

export interface CheckoutResult {
    providerPaymentId: string;
    checkoutUrl: string;
}

export interface PaymentProvider {
    createCheckout(
        params: CreateCheckoutParams
    ): Promise<CheckoutResult>;

    verifyWebhook(
        payload: Buffer,
        signature: string
    ): Promise<unknown>;
}
