import { Request, Response, NextFunction } from "express";
import { handleStripeWebhook } from "../services/payment.service";


export async function stripe(req: Request, res: Response, next: NextFunction) {
    try {
        const signature = req.headers["stripe-signature"];
        if (!signature || Array.isArray(signature)) {
            return res.status(400).send("Missing signature");
        }

        await handleStripeWebhook(req.body, signature);

        res.json({ received: true });
    } catch (error) {
        next(error);
    }
}
