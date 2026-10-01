import { Payment, PaymentStatus, PaymentCreate } from "../types/payment.type";


const payments: Payment[] = [];

export const paymentRepository = {

    async create(data: {
        userId: string;
        amount: number;
        currency: string;
    }): Promise<Payment> {
        // INSERT INTO payments ...
        const payment: Payment = {
            id: payments.length + 1,
            userId: data.userId,
            amount: data.amount,
            currency: data.currency,
            status: "pending",
            provider: "Stripe",
            providerPaymentId: "1",
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        payments.push(payment);
        return payment;
    },

    async updateStatus(
        paymentId: string,
        status: PaymentStatus,
        providerPaymentId?: string
    ): Promise<void> {
        // UPDATE payments ...
        const index = payments.findIndex(p => p.id === paymentId);
        if (index !== -1) {
            payments[index].status = status;
            if (providerPaymentId) {
                payments[index].providerPaymentId = providerPaymentId;
            }
            payments[index].updatedAt = new Date();
        }
    },

    async findById(paymentId: string): Promise<Payment | null> {
        // SELECT ...
        return payments.find(p => p.id === paymentId) || null;
    }
}
