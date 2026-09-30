import express from "express";
import cors from "cors";
import morgan from 'morgan';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
//app.use(morgan('combined'));
app.use(express.json());

/*
app.get("/", (req, res) => {
  res.send("¡Hola desde Express + TypeScript!");
});
*/

app.use("/api/v1", routes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}/api/v1`);
});
