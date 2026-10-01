import { Router } from "express";

import { create } from "../controllers/payment.controller";
import { paymentSchema } from "../schemas/payment.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateMiddleware } from "../middlewares/validate.middleware";


const router = Router();

router.post("/stripe", authMiddleware, validateMiddleware(paymentSchema), create);

export default router;