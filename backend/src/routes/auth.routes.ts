import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { login, logout, register, me } from "../controllers/auth.controller";


const router = Router();

router.post("/login", validateMiddleware(loginSchema), login);
router.post("/logout", logout);
router.get("/me", authMiddleware, me);
router.post("/register", validateMiddleware(registerSchema), register);

export default router;
