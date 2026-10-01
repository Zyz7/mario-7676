import { z } from "zod";


export const paymentSchema = z.object({
    amount: z.number().positive(),
    //estándar ISO4217 de tres letras
    currency: z.currencyCode(),
});

export type PaymentCreateDto = z.infer<typeof paymentSchema>;
