import { Router } from "express";

import { paymentSchema } from "../schemas/payment.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { balance, recharge, status } from "../controllers/payment.controller";


const router = Router();

router.get("/balance", authMiddleware, balance);
router.get("/status/:id", authMiddleware, status);
router.post("/recharge", authMiddleware, validateMiddleware(paymentSchema), recharge);

export default router;
