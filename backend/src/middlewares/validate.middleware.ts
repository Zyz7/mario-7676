import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";


export function validateMiddleware(schema: ZodType) {

    return (req: Request, res: Response, next: NextFunction) => {
        
        const result = schema.safeParse(req.body);
        if (!result.success) {

            return res.status(400).json({
                message: "Datos inválidos",
                errors: result.error.issues,
            });
        }
        req.body = result.data;
        next();
    };
}
