import { Request,Response } from "express";
import { ResultSetHeader } from "mysql2";
import { pool } from "../db";
import { errorHandler,response } from "../utils";

export const getClients = async (_: Request,res: Response) => {
	try {
		const [result] = await pool.query('SELECT * FROM Cliente')
		return response(res,200,result)
	} catch (error) {
		return errorHandler(res,error)
	}
}

export const createClient = async (req: Request,res: Response) => {
	try {
		const { nombre,email,direccion } = req.body
		if (!nombre || !email || !direccion) throw new Error("Missing data")

		const [result] = await pool.query<ResultSetHeader>(
			'INSERT INTO Cliente (nombre, email, direccion) VALUES(?, ?, ?)',
			[nombre,email,direccion]
		)

		const client = { id: result.insertId,nombre,email,direccion }

		return response(res,200,client)
	}
	catch (error) {
		return errorHandler(res,error)
	}
}

export const updateClient = async (req: Request,res: Response) => {
	try {
		const { id } = req.params
		const { nombre,email,direccion } = req.body

		if (!id) throw new Error("Missing id")
		if (!nombre || !email || !direccion) throw new Error("Missing data")

		const [result] = await pool.query<ResultSetHeader>(
			'UPDATE Cliente SET nombre = ?, email = ?, direccion = ? WHERE id = ?',
			[nombre,email,direccion,id]
		)

		if (result.affectedRows === 0) throw new Error(result.info)

		const client = { ...req.body,id }

		return response(res,200,client)
	} catch (error) {
		return errorHandler(res,error)
	}
}

export const deleteClient = async (req: Request,res: Response) => {
	try {
		const { id } = req.params
		if (!id) throw new Error("Missing id")

		const [result] = await pool.query<ResultSetHeader>("DELETE FROM Cliente WHERE id = ?",[id])

		if (result.affectedRows === 0) throw new Error("Error on deletion")

		return response(res,204,null)
	} catch (error) {
		return errorHandler(res,error)
	}
}