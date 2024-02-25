import { Request,Response } from "express"
import { pool } from "../db"
import { ResultSetHeader } from "mysql2"
import { errorHandler,response } from "../utils"

//lista todos los productos
export const getProducts = async (_: Request,res: Response) => {
	try {
		const [result] = await pool.query('SELECT * FROM Producto')
		return response(res,200,result)
	} catch (error) {
		return errorHandler(res,error)
	}
}

//crea un producto
export const createProduct = async (req: Request,res: Response) => {
	try {
		const { nombre,descripcion,precio,cantidad } = req.body
		if (!nombre || !precio || !cantidad) throw new Error("Missing data")

		const [result] = await pool.query<ResultSetHeader>(
			'INSERT INTO Producto (nombre, descripcion, precio, cantidad) VALUES(?, ?, ?, ?)',
			[nombre,descripcion,precio,cantidad]
		)

		const product = { id: result.insertId,nombre,descripcion,precio,cantidad }

		return response(res,200,product)
	}
	catch (error) {
		return errorHandler(res,error)
	}
}

//actualiza un producto
export const updateProduct = async (req: Request,res: Response) => {
	try {

		const { id } = req.params
		const { nombre,descripcion = "",precio,cantidad } = req.body

		if (!id) throw new Error("Missing id")
		if (!nombre || !precio || !cantidad) throw new Error("Missing data")

		const [result] = await pool.query<ResultSetHeader>(
			'UPDATE Producto SET nombre = ?, descripcion = ?, precio = ?, cantidad = ? WHERE id = ?',
			[nombre,descripcion,precio,cantidad,id]
		)

		if (result.affectedRows === 0) throw new Error(result.info)

		const product = { ...req.body,id }

		return response(res,200,product)
	} catch (error) {
		return errorHandler(res,error)
	}
}

//elimina un producto
export const deleteProduct = async (req: Request,res: Response) => {
	try {
		const { id } = req.params
		if (!id) throw new Error("Missing id")

		const [result] = await pool.query<ResultSetHeader>("DELETE FROM Producto WHERE id = ?",[id])

		if (result.affectedRows === 0) throw new Error("Error on deletion")

		return response(res,204,null)
	} catch (error) {
		return errorHandler(res,error)
	}
}

//lista los productos sin descripcion
export const getProductsWithoutDescription = async (_: Request,res: Response) => {
	try {
		const [result] = await pool.query('SELECT * FROM Producto WHERE descripcion IS NULL OR descripcion = ""')
		return response(res,200,result)
	} catch (error) {
		return errorHandler(res,error)
	}
}