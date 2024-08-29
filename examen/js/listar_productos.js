// Espera a que el contenido del DOM se haya cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtiene el botón de registrar producto
    var botonRegistrarProducto = document.getElementById("botonregistrarproducto");
    if (botonRegistrarProducto) {
        // Agrega un evento al clic del botón para redirigir a la página principal
        botonRegistrarProducto.addEventListener("click", function() {
            window.location.href = "./"; 
        });
    } else {
        // Muestra un error en la consola si el botón no se encuentra
        console.error('Elemento no encontrado');
    }
});

// Espera a que el contenido del DOM se haya cargado
document.addEventListener("DOMContentLoaded", function() {
    // Función para cargar y mostrar productos
    function cargarProductos() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "./modelo/producto.php?accion=listarproductos", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Parsea la respuesta JSON
                var response = JSON.parse(xhr.responseText);
                var productos = response.data;  // Accede a los datos de productos

                var tbody = document.querySelector("#listadodeproductos tbody");
                tbody.innerHTML = "";  // Limpia el contenido previo de la tabla

                if (productos.length === 0) {
                    // Muestra un mensaje si no hay productos
                    var fila = document.createElement("tr");
                    var celda = document.createElement("td");
                    celda.colSpan = 8; 
                    celda.textContent = "No hay registros disponibles";
                    fila.appendChild(celda);
                    tbody.appendChild(fila);
                } else {
                    // Agrega cada producto como una fila en la tabla
                    productos.forEach(function(producto) {
                        var fila = document.createElement("tr");
                        fila.innerHTML = `
                            <td>${producto.id_correlativo}</td>
                            <td>${producto.cod_producto}</td>
                            <td>${producto.nom_producto}</td>
                            <td>${producto.nom_bodega}</td>
                            <td>${producto.nom_sucursal}</td>
                            <td>${producto.precio_con_moneda}</td>
                            <td>${producto.descripcion}</td>
                            <td>${producto.materiales}</td>
                        `;
                        tbody.appendChild(fila);
                    });
                }
            }
        };
        xhr.send();
    }

    cargarProductos();  // Llama a la función para cargar productos
});
