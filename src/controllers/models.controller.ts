import { Request,Response } from "express"
import { pool } from "../db"

export const createProduct = async (_: Request,res: Response) => {
	try {

		await pool.query(`CREATE TABLE Producto (
			id INT(9) NOT NULL AUTO_INCREMENT,
			nombre VARCHAR(255) NOT NULL,
			descripcion VARCHAR(255) DEFAULT NULL,
			precio DECIMAL(9,2) NOT NULL,
			cantidad INT(7) NOT NULL,
			PRIMARY KEY(id))`
		)
		return res.status(200).send("ok")
	} catch (error) {
		return res.status(400).send("error!")
	}

}

export const createClient = async (_: Request,res: Response) => {
	try {
		await pool.query(`CREATE TABLE Cliente (
			id INT(9) NOT NULL AUTO_INCREMENT,
			nombre VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL,
			direccion VARCHAR(255) NOT NULL,
			PRIMARY KEY(id)
		)`)
		return res.status(200).send("ok")
	} catch (error) {
		return res.status(400).send("error!")
	}
}

export const createSale = async (_: Request,res: Response) => {
	try {

		await pool.query(`CREATE TABLE Venta (
		id INT(9) NOT NULL AUTO_INCREMENT,
		fecha DATETIME NOT NULL,
		id_cliente INT(9),
		monto_total DECIMAL(20,2),
		estado VARCHAR(20) CHECK (estado IN ('entregado', 'pagado', 'en proceso')),
		PRIMARY KEY(id),
		FOREIGN KEY (id_cliente) REFERENCES Cliente(id)
		
		)`)
		return res.status(200).send("ok")

	} catch (error) {
		return res.status(400).json(error)
	}
}

export const createSaleDetail = async (_: Request,res: Response) => {
	try {

		await pool.query(`CREATE TABLE DetalleVenta (
		id INT(9) NOT NULL AUTO_INCREMENT,
		id_venta INT(9),
		id_producto INT(9),
		cantidad INT(9),
		precio_unitario DECIMAL(20,2),
		PRIMARY KEY(id),
		FOREIGN KEY (id_venta) REFERENCES Venta(id),
		FOREIGN KEY (id_producto) REFERENCES Producto(id)
		)`)
		return res.status(200).send("ok")

	} catch (error) {
		return res.status(400).json(error)
	}
}

export const drop = async (_: Request,res: Response) => {
	try {
		await pool.query(`DROP TABLE DetalleVenta`)

		await pool.query(`DROP TABLE Venta`)

		await pool.query(`DROP TABLE Producto`)

		await pool.query(`DROP TABLE Cliente`)
		return res.status(200).send("ok")
	} catch (error) {
		return res.status(400).json(error)

	}
}