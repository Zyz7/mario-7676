import jwt from "jsonwebtoken";
import type { AuthPayload } from "../types/auth.type";


const JWT_SECRET = process.env.JWT_SECRET || "development-secret";

export function generateToken(payload: AuthPayload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h"
    });
}

export function verifyToken(token: string): AuthPayload {

    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
        throw new Error("Payload inválido");
    }

    if (
        typeof decoded.id !== "number" ||
        typeof decoded.email !== "string"
    ) {
        throw new Error("Payload inválido");
    }
    return { id: decoded.id, name: decoded.name, email: decoded.email };
}
