import { Router } from "express";
import bodyParser from "body-parser";

import { stripe } from "../controllers/webhook.controller";


const router = Router();

router.post("/stripe", bodyParser.raw({ type: "application/json" }), stripe);

export default router;
