import Stripe from "stripe";
import type { CheckoutResult, CreateCheckoutParams, PaymentProvider } from "./provider.service";


export class StripeProvider implements PaymentProvider {
    private stripe: Stripe;

    constructor() {
        const apiKey = process.env.STRIPE_KEY;
        if (!apiKey) {
            throw new Error("stripe apikey no encontrada");
        }

        this.stripe = new Stripe(apiKey, {apiVersion: "2026-08-26.dahlia"});
    }

    async createCheckout(params: CreateCheckoutParams): Promise<CheckoutResult> {
        const session = await this.stripe.checkout.sessions.create({
            mode: "payment",

            line_items: [
                {
                    price_data: {
                        currency: params.currency.toLowerCase(),
                        product_data: {
                            name: `Payment ${params.paymentId}`
                        },
                        unit_amount: params.amount
                    },
                    quantity: 1
                }
            ],

            payment_intent_data: {
                metadata: {
                    paymentId: params.paymentId
                }
            },

            metadata: {
                paymentId: params.paymentId
            },
            success_url: params.successUrl,
            cancel_url: params.cancelUrl
        });

        if (!session.url) {
            throw new Error("Stripe did not return checkout URL");
        }

        return { providerPaymentId: session.id, checkoutUrl: session.url };
    }

    async verifyWebhook(payload: Buffer, signature: string): Promise<Stripe.Event> {

        const webhook = process.env.STRIPE_WEBHOOK;
        if (!webhook) {
            throw new Error("stripe webhook no esta configurado");
        }

        return this.stripe.webhooks.constructEvent(payload, signature, webhook);
    }
}
