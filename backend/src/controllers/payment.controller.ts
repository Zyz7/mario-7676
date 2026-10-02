import type { Request, Response, NextFunction } from "express";
import { getBalance, createPayment, getStatus } from "../services/payment.service";


export async function recharge(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user.id;
        const result = await createPayment(userId, req.body);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
} 

export async function balance(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user.id;
        const result = await getBalance(userId);

        res.status(200).json({ Balance: result / 100 });
    } catch (error) {
        next(error);
    }
} 

export async function status(req: Request<{ id: string}>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const result = await getStatus(id);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
} 
