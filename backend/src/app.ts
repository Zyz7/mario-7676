import "./config/env.config";

import express from "express";
import cors from "cors";
import morgan from 'morgan';
//import dotenv from "dotenv";
//import cookieParser from "cookie-parser";

import routes from "./routes";
import webhookRoutes from "./routes/webhook.routes";
import { errorMiddleware } from "./middlewares/error.middleware";


const app = express();
//const PORT = process.env.PORT || 3000;
app.use(cors());
//app.use(morgan('combined'));
app.use(morgan('dev'));
//app.use(cookieParser());
app.use("/api/v1/webhook", webhookRoutes)

app.use(express.json());
app.use("/api/v1", routes);
app.use(errorMiddleware);

//app.listen(PORT, () => {console.log(`running on http://localhost:${PORT}/api/v1`);});
export default app;
