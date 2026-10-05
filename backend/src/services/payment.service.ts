import Stripe from "stripe";
import { StripeProvider } from "../services/stripe.service";
import type { PaymentCreateDto } from "../schemas/payment.schema";
import { balanceRepository } from "../repositories/balance.repository";
import { paymentRepository } from "../repositories/payment.repository";
import type { PaymentResponseDto } from "../dtos/payment.dto";


// Instancia singleton (se crean una sola vez)
export const stripeProvider = new StripeProvider();

export async function createPayment(userId: number, dto: PaymentCreateDto) {
    
    if (dto.amount <= 0) {
            throw new Error("Amount must be greater than zero");
        }
    
    const payment = await paymentRepository.create({ userId, amount: dto.amount, currency: dto.currency });
    const checkout = await stripeProvider.createCheckout({
        paymentId: String(payment.id),
        amount: payment.amount,
        currency: payment.currency,
        successUrl: `http://localhost:5173/payment/success?id=${payment.id}`,
        cancelUrl: `http://localhost:5173/payment/failed?id=${payment.id}`
    });
    
    await paymentRepository.updateStatus(
        payment.id,
        "processing",
        checkout.providerPaymentId
    );
    
    return { paymentId: payment.id, checkoutUrl: checkout.checkoutUrl };
}

export async function handleStripeWebhook(payload: Buffer, signature: string): Promise<PaymentResponseDto | null> {
    const event = await stripeProvider.verifyWebhook(payload, signature);
    //console.log("event: ", event.type);

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const paymentId = session.metadata?.paymentId;

            if (!paymentId) {
                throw new Error("Missing paymentId");
            }
            
            const payment = await paymentRepository.findById(Number(paymentId));
            if (!payment) {
                throw new Error("Payment not found");
            }
            
            // Evitar sumar dos veces si Stripe vuelve a enviar el webhook 
            if (payment.status !== "paid") {
                await balanceRepository.addBalance(payment.userId, payment.amount);
                await paymentRepository.updateStatus(Number(paymentId), "paid", session.id);
            }

            const paymentResponse: PaymentResponseDto = {
                id: String(session.id),
                status: session.payment_status,
                status_detail: "Payment completed successfully",
                transaction_amount: String((session.amount_total ?? 0) / 100),
                date_created: new Date(session.created * 1000),
                authorization_code: String(session.payment_intent),
                reference: String(session.payment_method_configuration_details?.id),
                payer_id: Number(paymentId),
                payer_email: String(session.customer_details?.email),
            };
            await paymentRepository.createPayment(paymentResponse);

            return paymentResponse;
        }

        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            const paymentId = paymentIntent.metadata?.paymentId;

            if (!paymentId) {
                throw new Error("Missing paymentId");
            }

            await paymentRepository.updateStatus(Number(paymentId), "failed");
            const paymentResponse: PaymentResponseDto = {
                id: paymentIntent.id,
                status: "failed",
                status_detail: paymentIntent.last_payment_error?.message ?? "Payment failed",
                transaction_amount: String(paymentIntent.amount / 100),
                date_created: new Date(paymentIntent.created * 1000),
                authorization_code: null,
                reference: String(paymentIntent.payment_details?.order_reference),
                payer_id: Number(paymentId),
                payer_email: paymentIntent.receipt_email ?? "",
            };
            await paymentRepository.createPayment(paymentResponse);

            return paymentResponse;
        }

        default:
            return null;
    }
}

export async function getBalance(userId: number) {
    
    const saldo = await balanceRepository.getBalance(userId);
    return saldo;
}

export async function getStatus(userId: number): Promise<PaymentResponseDto | null> {
    
    const payment = await paymentRepository.getPayment(userId);
    return payment;
}
