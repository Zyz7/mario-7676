import type { PaymentResponseDto } from "../dtos/payment.dto";
import type { Payment, PaymentStatus, PaymentCreate } from "../types/payment.type";


const payments: Payment[] = [];
const paymentResponse: PaymentResponseDto[] = [];

export const paymentRepository = {

    async create(data: {
        userId: string;
        amount: number;
        currency: string;
    }): Promise<Payment> {
        // INSERT INTO payments ...
        const payment: Payment = {
            id: String(payments.length + 1),
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
        const payment = payments.find(p => p.id === paymentId);
        if (!payment) {
            return;
        }

        payment.status = status;
        if (providerPaymentId) {
            payment.providerPaymentId = providerPaymentId;
        }

        payment.updatedAt = new Date();
    },

    async findById(paymentId: string): Promise<Payment | null> {
        // SELECT ...
        return payments.find(p => p.id === paymentId) || null;
    },

    async createPayment(payment: PaymentResponseDto) {

        paymentResponse.push(payment);
    },

    async getPayment(id: string): Promise<PaymentResponseDto | null> {

        return paymentResponse.filter(p => p.payer_id === id).at(-1) || null;
    }
}
