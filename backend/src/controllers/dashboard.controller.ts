import { Request, Response } from "express";


export function getDashboard(req: Request, res: Response) {

    res.json({ 
        message: "Bienvenido al dashboard",
        user: req.user,
        stats: {
            users: 120, sales: 48, revenue: 15420
        }
     });
}