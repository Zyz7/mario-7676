import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../../../.env");

dotenv.config({
    path: envPath
});

function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Variable de entorno requerida: ${name}`);
    }

    return value;
}

/*
export const env = {
    stripeKey: process.env.STRIPE_KEY,
    stripeWebhook: process.env.STRIPE_WEBHOOK,
    port: process.env.PORT || 3000
};
*/
