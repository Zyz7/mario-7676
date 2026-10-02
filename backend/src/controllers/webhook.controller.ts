import type { Request, Response, NextFunction } from "express";
import { handleStripeWebhook } from "../services/payment.service";


export async function stripe(req: Request, res: Response, next: NextFunction) {
    try {
        const signature = req.headers["stripe-signature"];
        if (!signature || Array.isArray(signature)) {
            return res.status(400).send("Missing signature");
        }

        const paymentResponse =  await handleStripeWebhook(req.body, signature);

        res.status(200).json(paymentResponse);
    } catch (error) {
        next(error);
    }
}
