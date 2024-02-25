import { createPool } from 'mysql2/promise'
import { DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USERNAME } from './lib/env'

export const pool = createPool({
	host: DB_HOST,
	user: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	port: DB_PORT
})