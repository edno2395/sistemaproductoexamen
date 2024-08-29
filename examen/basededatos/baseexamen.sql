-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para prueba
CREATE DATABASE IF NOT EXISTS `prueba` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `prueba`;

-- Volcando estructura para tabla prueba.bodegas
CREATE TABLE IF NOT EXISTS `bodegas` (
  `id_bodega` int NOT NULL AUTO_INCREMENT,
  `nom_bodega` varchar(100) NOT NULL,
  PRIMARY KEY (`id_bodega`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla prueba.bodegas: ~3 rows (aproximadamente)
INSERT INTO `bodegas` (`id_bodega`, `nom_bodega`) VALUES
	(1, 'Bodega Central'),
	(2, 'Bodega Sur'),
	(3, 'Bodega Norte'),
	(4, 'Bodega Oeste');

-- Volcando estructura para tabla prueba.monedas
CREATE TABLE IF NOT EXISTS `monedas` (
  `id_moneda` int NOT NULL AUTO_INCREMENT,
  `nom_moneda` varchar(40) NOT NULL,
  `simbolo` varchar(5) NOT NULL,
  PRIMARY KEY (`id_moneda`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla prueba.monedas: ~2 rows (aproximadamente)
INSERT INTO `monedas` (`id_moneda`, `nom_moneda`, `simbolo`) VALUES
	(1, 'Sol Peruano', 'S/'),
	(2, 'Dolar', '$');

-- Volcando estructura para procedimiento prueba.proce_producto
DELIMITER //
CREATE PROCEDURE `proce_producto`(
	IN `codproducto` VARCHAR(50),
	IN `nomproducto` VARCHAR(80),
	IN `idbodega` INT,
	IN `idsucursal` INT,
	IN `idmoneda` INT,
	IN `varprecio` DECIMAL(10,2),
	IN `vardescripcion` VARCHAR(1000),
	IN `concepto` VARCHAR(200),
	OUT `resultado` INT,
	OUT `idproductoout` INT
)
BEGIN

DECLARE numfilasafectadas INT;
DECLARE varexistenciaproducto INT;
DECLARE varidproducto int;


IF concepto = 'listarbodega' THEN
SELECT * FROM bodegas;
END IF ; 


IF concepto = 'listarmonedas' THEN
SELECT * FROM monedas;
END IF ; 


IF concepto = 'listarsucursales' THEN
SELECT id_sucursal, nom_sucursal FROM sucursales  WHERE id_bodega = idbodega;
END IF ; 

IF concepto = 'insertarproducto' THEN
set varexistenciaproducto =(SELECT COUNT(1) FROM productos WHERE cod_producto=codproducto);

IF varexistenciaproducto > 0 THEN

SET resultado = 2;

ELSE
INSERT INTO productos (cod_producto, nom_producto, id_bodega, id_sucursal, id_moneda, precio, descripcion, estado) 
VALUES (codproducto, nomproducto, idbodega, idsucursal, idmoneda, varprecio, vardescripcion, 'A');
SET idproductoout = LAST_INSERT_ID();
SET numfilasafectadas = ROW_COUNT();

IF numfilasafectadas > 0 THEN
SET resultado = 1;
ELSE
SET resultado = 0;
END IF;

END IF;

END IF ; 

END//
DELIMITER ;

-- Volcando estructura para tabla prueba.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id_correlativo` int NOT NULL AUTO_INCREMENT,
  `cod_producto` varchar(50) NOT NULL,
  `nom_producto` varchar(80) NOT NULL,
  `id_bodega` int NOT NULL,
  `id_sucursal` int NOT NULL,
  `id_moneda` int NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `estado` char(1) NOT NULL,
  `fecha_adiccion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_correlativo`),
  KEY `fk_bodega` (`id_bodega`),
  KEY `fk_sucursal` (`id_sucursal`),
  KEY `fk_moneda` (`id_moneda`),
  CONSTRAINT `fk_bodega` FOREIGN KEY (`id_bodega`) REFERENCES `bodegas` (`id_bodega`),
  CONSTRAINT `fk_moneda` FOREIGN KEY (`id_moneda`) REFERENCES `monedas` (`id_moneda`),
  CONSTRAINT `fk_sucursal` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursales` (`id_sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla prueba.productos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla prueba.productos_materiales
CREATE TABLE IF NOT EXISTS `productos_materiales` (
  `codprodmaterial` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `nom_material` varchar(255) NOT NULL,
  PRIMARY KEY (`codprodmaterial`),
  KEY `fk_producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla prueba.productos_materiales: ~31 rows (aproximadamente)

-- Volcando estructura para tabla prueba.sucursales
CREATE TABLE IF NOT EXISTS `sucursales` (
  `id_sucursal` int NOT NULL AUTO_INCREMENT,
  `id_bodega` int NOT NULL,
  `nom_sucursal` varchar(100) NOT NULL,
  PRIMARY KEY (`id_sucursal`),
  KEY `id_bodega` (`id_bodega`),
  CONSTRAINT `sucursales_ibfk_1` FOREIGN KEY (`id_bodega`) REFERENCES `bodegas` (`id_bodega`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla prueba.sucursales: ~5 rows (aproximadamente)
INSERT INTO `sucursales` (`id_sucursal`, `id_bodega`, `nom_sucursal`) VALUES
	(1, 1, 'Sucursal Norte'),
	(2, 1, 'Sucursal Sur'),
	(3, 2, 'Sucursal Este'),
	(4, 3, 'Sucursal Oeste'),
	(5, 2, 'Sucursal Centro');

-- Volcando estructura para vista prueba.vista_productos
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `vista_productos` (
	`id_correlativo` INT(10) NOT NULL,
	`cod_producto` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`nom_producto` VARCHAR(80) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`nom_bodega` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`nom_sucursal` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`precio_con_moneda` VARCHAR(18) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`descripcion` VARCHAR(1000) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`materiales` TEXT NULL COLLATE 'utf8mb4_0900_ai_ci'
) ENGINE=MyISAM;

-- Volcando estructura para vista prueba.vista_productos
-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `vista_productos`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vista_productos` AS select `p`.`id_correlativo` AS `id_correlativo`,`p`.`cod_producto` AS `cod_producto`,`p`.`nom_producto` AS `nom_producto`,`bo`.`nom_bodega` AS `nom_bodega`,`s`.`nom_sucursal` AS `nom_sucursal`,concat(`mo`.`simbolo`,' ',`p`.`precio`) AS `precio_con_moneda`,`p`.`descripcion` AS `descripcion`,group_concat(`m`.`nom_material` separator ', ') AS `materiales` from ((((`productos` `p` join `bodegas` `bo` on((`bo`.`id_bodega` = `p`.`id_bodega`))) join `sucursales` `s` on((`s`.`id_sucursal` = `p`.`id_sucursal`))) join `monedas` `mo` on((`mo`.`id_moneda` = `p`.`id_moneda`))) join `productos_materiales` `m` on((`m`.`id_producto` = `p`.`id_correlativo`))) group by `p`.`id_correlativo`,`p`.`cod_producto`,`p`.`nom_producto`,`bo`.`nom_bodega`,`s`.`nom_sucursal`,`mo`.`simbolo`,`p`.`precio`,`p`.`descripcion`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
