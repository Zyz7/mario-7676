import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { LoginResponseDto, RegisterResponseDto } from "../dtos/auth.dto";
import { LoginRequestDto, RegisterRequestDto } from "../schemas/auth.schema";


export async function login(
    req: Request<{}, {}, LoginRequestDto>, res: Response<LoginResponseDto>, next: NextFunction
) {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);

        res.cookie("token", result.token, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === "prod",
            secure: false,
            //sameSite: "strict",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 1
        });

        res.json({ user: { id: result.user.id, name: result.user.name, email: result.user.email } });
    } catch (error) {
        next(error);
    }
} 

export async function register(
    req: Request<{}, {}, RegisterRequestDto>, res: Response<RegisterResponseDto>, next: NextFunction
) {
    try {
        const { name, email, password, confirm } = req.body;
        if (password !== confirm) {

            return res.status(400).json({ message: "No coincide la confirmación"});
        }

        const user = await authService.register(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No autenticado" });
        }
        
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "prod",
            sameSite: "strict"
        });

        res.json({ message: "Logout exitoso" });
    } catch (error) {
        next(error);
    }
}
