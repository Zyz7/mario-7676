import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";


const router = Router();

router.post("/login", validateMiddleware(loginSchema), login);
router.post("/logout", logout);
router.post("/register", validateMiddleware(registerSchema), register);

export default router;
