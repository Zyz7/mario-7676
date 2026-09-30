import { z } from "zod";


const emailSchema = z.string().trim().email("El email no es válido");
const passwordSchema = z.string().min(6, "Mínimo 6 caracteres para la contraseña");

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export type LoginRequestDto = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    name: z.string().trim().min(4, "Mínimo 4 caracteres para el nombre").max(50, "Máximo 50 caracteres para el nombre"),
    email: emailSchema,
    password: passwordSchema,
    confirm: passwordSchema,
});

export type RegisterRequestDto = z.infer<typeof registerSchema>;
