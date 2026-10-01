import { Request, Response, NextFunction } from "express";
import { createPayment } from "../services/payment.service";


export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user.id;
        const result = await createPayment(userId, req.body);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
} 
