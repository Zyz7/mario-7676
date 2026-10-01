import Stripe from "stripe";
import { StripeProvider } from "../services/stripe.service";
import { PaymentCreateDto } from "../schemas/payment.schema";
import { balanceRepository } from "../repositories/balance.repository";
import { paymentRepository } from "../repositories/payment.repository";


// Instancia singleton (se crean una sola vez)
export const stripeProvider = new StripeProvider();

export async function createPayment(userId: string, dto: PaymentCreateDto) {
    
    if (dto.amount <= 0) {
            throw new Error("Amount must be greater than zero");
        }
    
    const payment = await paymentRepository.create({ userId, amount: dto.amount, currency: dto.currency });

    const checkout = await stripeProvider.createCheckout({
        paymentId: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        successUrl: "https://example.com/payment/success",
        cancelUrl: "https://example.com/payment/cancel"
    });
    
    await paymentRepository.updateStatus(
        payment.id,
        "processing",
        checkout.providerPaymentId
    );
    
    return { paymentId: payment.id, checkoutUrl: checkout.checkoutUrl };
}

export async function handleStripeWebhook(payload: Buffer, signature: string) {
    const event = await stripeProvider.verifyWebhook(payload, signature);

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const paymentId = session.metadata?.paymentId;

            if (!paymentId) {
                throw new Error("Missing paymentId");
            }

            const payment = await paymentRepository.findById(paymentId);
            if (!payment) {
                throw new Error("Payment not found");
            }

            // Evitar sumar dos veces si Stripe vuelve a enviar el webhook 
            if (payment.status === "paid") {
                break;
            }

            // Marcar el pago como pagado
            await paymentRepository.updateStatus(paymentId, "paid", session.id);
            // Agregar el monto al saldo del usuario
            await balanceRepository.addBalance(payment.userId, payment.amount);
            break;
        }

        default:
            break;
    }
}
