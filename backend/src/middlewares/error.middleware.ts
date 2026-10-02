import type { Request, Response, NextFunction } from "express";


export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {

    console.error("ERROR:", error);
    res.status(500).json({ message: error.message });
}