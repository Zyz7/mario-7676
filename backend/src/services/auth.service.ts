import { userRepository } from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";


export const authService = {

    async login(email: string, password: string) {

        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Credenciales inválidas");
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            throw new Error("Credenciales inválidas");
        }

        const token = generateToken({id: user.id, email: user.email});

        return { user: {
            id: user.id, name: user.name, email: user.email
        }, token};
    },

    async register(name: string, email: string, password: string) {
        
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("El usuario ya existe");
        } 

        const hashedPassword = await hashPassword(password);

        return userRepository.create({name, email, password: hashedPassword});
    }
};
