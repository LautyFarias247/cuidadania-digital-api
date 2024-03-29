CREATE DATABASE IF NOT EXISTS ciudadaniaddb

CREATE TABLE Producto (
	id INT(9) NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
	descripcion VARCHAR(255) DEFAULT NULL,
	precio DECIMAL(9,2) NOT NULL,
	cantidad INT(7) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Cliente (
    id INT(9) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Venta (
    id INT(9) NOT NULL AUTO_INCREMENT,
	fecha DATETIME NOT NULL,
	id_cliente INT(9),
	monto_total DECIMAL(20,2),
	estado VARCHAR(20) CHECK (estado IN ('entregado', 'pagado', 'en proceso')),
    PRIMARY KEY(id),
	FOREIGN KEY (id_cliente) REFERENCES Cliente(id)

);

CREATE TABLE DetalleVenta (
    id INT(9) NOT NULL AUTO_INCREMENT,
    id_venta INT(9),
    id_producto INT(9),
    cantidad INT(9),
    precio_unitario DECIMAL(20,2),
    PRIMARY KEY(id),
    FOREIGN KEY (id_venta) REFERENCES Venta(id),
    FOREIGN KEY (id_producto) REFERENCES Producto(id)
);

