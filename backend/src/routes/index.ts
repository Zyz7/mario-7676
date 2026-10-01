import { Router } from "express";

import authRoutes from "./auth.routes";
import paymentRoutes from "./payment.routes";
import dashboardRoutes from "./dashboard.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/payment", paymentRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
