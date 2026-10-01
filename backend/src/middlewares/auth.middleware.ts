import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No autenticado" });
        }

        const payload = verifyToken(token);
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
}