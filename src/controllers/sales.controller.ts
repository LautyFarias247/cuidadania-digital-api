import { Request,Response } from "express"
import { pool } from "../db"
import { errorHandler,response } from "../utils"
import { ResultSetHeader,RowDataPacket } from "mysql2"

export const getSales = async (_: Request,res: Response) => {
	try {
		const [ventas] = await pool.query(
			'SELECT Venta.*, Cliente.nombre AS nombre_cliente FROM Venta JOIN Cliente ON Venta.id_cliente = Cliente.id WHERE fecha >= DATE_SUB(NOW(), INTERVAL 24 HOUR)'
		)

		const [estadosVentas] = await pool.query('SELECT estado, COUNT(*) AS total FROM Venta GROUP BY estado')

		const [ventasTotales] = await pool.query('SELECT COUNT(*) AS conteo FROM Venta')

		return response(res,200,{ ventas,estadosVentas,ventasTotales })
	} catch (error) {
		return errorHandler(res,error)
	}
}

export const getClientSales = async (req: Request,res: Response) => {
	try {
		const { email,monto } = req.params
		console.log(email,monto)
		const [cliente] = await pool.query<RowDataPacket[]>('SELECT * FROM Cliente WHERE email = ?',[email])

		if (cliente.length === 0) throw new Error("Inexistent client")

		const id_cliente = cliente[0].id

		const [ventas] = await pool.query<RowDataPacket[]>(
			'SELECT * FROM Venta WHERE id_cliente = ? AND monto_total > ?',
			[id_cliente,monto]
		)

		if (ventas.length === 0) throw new Error("Does not exists sales with this amount")

		return response(res,200,ventas)
	} catch (error) {
		console.error(error)
		return errorHandler(res,error)
	}
}

export const createSale = async (req: Request,res: Response) => {
	try {
		const { id_producto,cantidad,id_cliente,estado } = req.body
		if (!id_producto || !cantidad || !id_cliente || !estado) throw new Error("Missing data")


		const [result] = await pool.query<RowDataPacket[]>('SELECT * FROM Producto WHERE id = ?',[id_producto])

		if (result.length === 0) throw new Error("Invalid id_producto")

		const product = result[0]

		const [resultVenta] = await pool.query<ResultSetHeader>(
			"INSERT INTO Venta (fecha, id_cliente, monto_total, estado) VALUES(CONVERT_TZ(NOW(), '+00:00', '-03:00'), ?, ?, ?)",
			[id_cliente,cantidad * product.precio,estado]
		);


		const id_venta = resultVenta.insertId

		const [resultDetalleVenta] = await pool.query<ResultSetHeader>(
			"INSERT INTO DetalleVenta (id_venta, id_producto, cantidad, precio_unitario) VALUES(?, ?, ?, ?)",
			[id_venta,id_producto,cantidad,product.precio]
		)


		return response(res,200,resultDetalleVenta)
	} catch (error) {
		console.error(error)
		return errorHandler(res,error)
	}
}