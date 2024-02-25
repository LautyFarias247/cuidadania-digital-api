import dotenv from "dotenv"
dotenv.config()

export const DB_USERNAME = process.env.DB_USERNAME || "root"

export const DB_PASSWORD = process.env.DB_PASSWORD || "password"

export const DB_PORT = Number(process.env.DB_PORT || '5000');

export const DB_HOST = process.env.DB_HOST || "localhost"

export const DB_NAME = process.env.DB_NAME || "ciudadaniaddb"

export const PORT = process.env.PORT || 3001