<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario Producto</title>
    <link rel="stylesheet" href="css/estilo.css">
</head>
<body>
    <div class="form-container">
	<h1>Formulario Producto</h1>  
	<!-- Botón simple para redireccionar -->
<button id="botonlistadoproducto" class="botonlistado" >
   Listado Productos
</button>
        <form method="POST" id="formularioproducto"  autocomplete="off">
            <div class="form-row">
                <div class="form-group">
                    <label for="codproducto">Código</label>
                    <input type="text" id="codproducto" name="codproducto" required>
                </div>
                <div class="form-group">
                    <label for="nomproducto">Nombre</label>
                    <input type="text" id="nomproducto" name="nomproducto" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="bodega">Bodega</label>
                    <select id="bodega" name="bodega" required>
                     
                    </select>
                </div>
                <div class="form-group">
                    <label for="sucursal">Sucursal</label>
                    <select id="sucursal" name="sucursal" required>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="moneda">Moneda</label>
                    <select id="moneda" name="moneda" required>
                    </select>
                </div>
                <div class="form-group">
                    <label for="precio">Precio</label>
                    <input type="number" id="precio" name="precio" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Material del producto</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" name="material" value="plastico"> Plástico</label>
                        <label><input type="checkbox" name="material" value="metal"> Metal</label>
                        <label><input type="checkbox" name="material" value="madera"> Madera</label>
                        <label><input type="checkbox" name="material" value="vidrio"> Vidrio</label>
                        <label><input type="checkbox" name="material" value="textil"> Textil</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="descripcion">Descripción</label>
                <textarea id="descripcion" name="descripcion" rows="4" maxlength="1000" required></textarea>
            </div>
			
            <button type="submit" id="btnAgregarProducto">Guardar Producto</button>
        </form>
    </div>
</body>
</html>

<script src="js/validacion_productos.js"></script>