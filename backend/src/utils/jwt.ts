import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "development-secret";

export function generateToken(payload: {
    id: number; email: string;
}) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h"
    });
}

export function verifyToken(token: string) {

    return jwt.verify(token, JWT_SECRET);
}
