import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        //const token = req.cookies.token;
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No autenticado" });
        }

        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Token inválido",
            });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
}
