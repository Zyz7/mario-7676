import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";


export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);

        res.json(result);
    } catch (error) {
        next(error);
    }
} 

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;
        const user = await authService.register(name, email, password);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}
