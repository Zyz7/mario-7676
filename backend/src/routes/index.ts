import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger.config";

import authRoutes from "./auth.routes";
import paymentRoutes from "./payment.routes";
import dashboardRoutes from "./dashboard.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/payment", paymentRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
