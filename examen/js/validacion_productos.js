// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtiene el botón para listar productos
    var botonListarProducto = document.getElementById("botonlistadoproducto");
    if (botonListarProducto) {
        // Agrega un evento de clic al botón para redirigir a 'listarproducto.php'
        botonListarProducto.addEventListener("click", function() {
            window.location.href = "listarproducto.php"; 
        });
    } else {
        // Muestra un error en la consola si el botón no se encuentra
        console.error('Elemento no encontrado');
    }
});
		


// Función para cargar el select de bodega
var rutabodega = "./modelo/producto.php?accion=listarbodega"; 
var selectBodega = document.getElementById('bodega');
// Realizar una solicitud GET para obtener los datos JSON
fetch(rutabodega)
    .then(response => response.json())
    .then(json => {
        // Limpiar el contenido del select
        selectBodega.innerHTML = '';
        // Agregar la opción inicial
        var option = document.createElement('option');
        option.value = '';
        option.textContent = 'Selecciona una bodega';
        selectBodega.appendChild(option);
        // Agregar las opciones obtenidas del JSON
        json.data.forEach(function(value) {
            var option = document.createElement('option');
            option.value = value.id_bodega;
            option.textContent = value.nom_bodega;
            selectBodega.appendChild(option);
        });
    }).catch(error => console.error('Error al cargar las bodegas:', error));

// Evento de cambio para el select de sucursales
var rutaSucursales = "./modelo/producto.php?accion=listarsucursales"; 
var selectSucursal = document.getElementById('sucursal');
selectBodega.addEventListener('change', function() {
    var bodegaId = this.value;
    if (bodegaId) {
        // Cargar las sucursales para la bodega seleccionada
        fetch(`${rutaSucursales}&id_bodega=${bodegaId}`)
            .then(response => response.json())
            .then(json => {
                selectSucursal.innerHTML = '';
                var option = document.createElement('option');
                option.value = '';
                option.textContent = 'Selecciona una sucursal';
                selectSucursal.appendChild(option);
                json.data.forEach(function(value) {
                    var option = document.createElement('option');
                    option.value = value.id_sucursal;
                    option.textContent = value.nom_sucursal;
                    selectSucursal.appendChild(option);
                });
            }).catch(error => console.error('Error al cargar las sucursales:', error));
    } else {
        // Limpiar el select de sucursales si no se ha seleccionado ninguna bodega
        selectSucursal.innerHTML = '';
        var option = document.createElement('option');
        option.value = '';
        option.textContent = 'Selecciona una sucursal';
        selectSucursal.appendChild(option);
    }
});

// Función para cargar el select de moneda
var rutamoneda = "./modelo/producto.php?accion=listarmoneda"; 
var selectMoneda = document.getElementById('moneda');
// Realizar una solicitud GET para obtener los datos JSON
fetch(rutamoneda)
    .then(response => response.json())
    .then(json => {
        // Limpiar el contenido del select
        selectMoneda.innerHTML = '';
        // Agregar la opción inicial
        var option = document.createElement('option');
        option.value = '';
        option.textContent = 'Selecciona una moneda';
        selectMoneda.appendChild(option);
        // Agregar las opciones obtenidas del JSON
        json.data.forEach(function(value) {
            var option = document.createElement('option');
            option.value = value.id_moneda;
            option.textContent = "(" + value.simbolo + ") " + value.nom_moneda; 
            selectMoneda.appendChild(option);
        });
    }).catch(error => console.error('Error al cargar las monedas:', error));
	
	
// Función para validar campos obligatorios
function validarCampoObligatorio(valor, mensajeError) {
    if (valor === '') {
        alert(mensajeError);
        return false;
    }
    return true;
}

// Función para validar formato (letras y números)
function validarFormatoLetrasNumeros(valor, mensajeError) {
    var contieneLetra = /[a-zA-Z]/.test(valor);
    var contieneNumero = /[0-9]/.test(valor);
    if (!contieneLetra || !contieneNumero) {
        alert(mensajeError);
        return false;
    }
    return true;
}

// Función para validar la longitud de un campo
function validarLongitud(valor, min, max, mensajeError) {
    if (valor.length < min || valor.length > max) {
        alert(mensajeError);
        return false;
    }
    return true;
}

// Función para validar precio
function validarPrecio(valor, mensajeError) {
    // Expresión regular para validar un número positivo con hasta dos decimales
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/.test(valor);
    // Convertir el valor a número para comprobar que sea menor que 0
    const numero = parseFloat(valor);
    // Validar que cumpla con la expresión regular y sea menor que 0
    if (!regex || numero < 0) {
		  alert(mensajeError);
        return false;
    }
	  return true;
}

// Función para validar materiales
function validarChekBoxMaterial(valor, mensajeError) {
    if (valor.length < 2) {
        alert(mensajeError);
        return false;
    }
    return true;
}

function limpiarcampos(){
 // Limpiar campos de texto
document.getElementById('codproducto').value = '';
document.getElementById('nomproducto').value = '';
document.getElementById('precio').value = '';
document.getElementById('bodega').value = '';
document.getElementById('sucursal').value = '';
document.getElementById('moneda').value = '';
document.getElementById('descripcion').value = '';

// Limpiar selects
document.getElementById('bodega').selectedIndex = 0; // Restablece al primer valor
document.getElementById('sucursal').innerHTML = ''; // Restablece al primer valor
document.getElementById('moneda').selectedIndex = 0; // Restablece al primer valor

// Limpiar checkboxes
var checkboxes = document.querySelectorAll('input[name="material"]:checked');
checkboxes.forEach(function(checkbox) {
checkbox.checked = false;
});
}
	
//funcion para guardar el producto

document.getElementById('btnAgregarProducto').addEventListener('click', function(e) {
    e.preventDefault();
    
	 // Obtener Campos
    var codProducto = document.getElementById('codproducto').value;
    var nomProducto = document.getElementById('nomproducto').value;
    var PrecioProducto = document.getElementById('precio').value;
    var BodegaProducto = document.getElementById('bodega').value;
    var SucursalProducto = document.getElementById('sucursal').value;
    var MonedaProducto = document.getElementById('moneda').value;
    var MaterialesProducto = Array.from(document.querySelectorAll('input[name="material"]:checked')).map(input => input.value);
    var DescripcionProducto = document.getElementById('descripcion').value;
	

    // Validaciones
    if (!validarCampoObligatorio(codProducto, 'El código del producto no puede estar en blanco.')) return;
    if (!validarFormatoLetrasNumeros(codProducto, 'El código del producto debe contener letras y números.')) return;
    if (!validarLongitud(codProducto, 5, 15, 'El código del producto debe tener entre 5 y 15 caracteres.')) return;

    if (!validarCampoObligatorio(nomProducto, 'El nombre del producto no puede estar en blanco.')) return;
    if (!validarLongitud(nomProducto, 2, 50, 'El nombre del producto debe tener entre 2 y 50 caracteres.')) return;

    if (!validarCampoObligatorio(BodegaProducto, 'Debe seleccionar una bodega.')) return;
    if (!validarCampoObligatorio(SucursalProducto, 'Debe seleccionar una sucursal para la bodega seleccionada.')) return;
    if (!validarCampoObligatorio(MonedaProducto, 'Debe seleccionar una moneda para el producto.')) return;

    if (!validarCampoObligatorio(PrecioProducto, 'El precio del producto no puede estar en blanco.')) return;
    if (!validarPrecio(PrecioProducto, 'El precio del producto debe ser un número positivo con hasta dos decimales.')) return;

    if (!validarChekBoxMaterial(MaterialesProducto, 'Marcar por lo menos dos materiales para el producto.')) return;

    if (!validarCampoObligatorio(DescripcionProducto, 'La descripción del producto no puede estar en blanco.')) return;
    if (!validarLongitud(DescripcionProducto, 10, 1000, 'La descripción del producto debe tener entre 10 y 1000 caracteres.')) return;

		  // Crear una nueva solicitud AJAX
		var xhr = new XMLHttpRequest();
		// Configura la solicitud para enviar datos por POST al endpoint específico
		xhr.open('POST', './modelo/producto.php?accion=insertarproducto', true);
		// Establece el tipo de contenido de la solicitud como JSON
		xhr.setRequestHeader("Content-Type", "application/json");

		// Define la función a ejecutar cuando cambia el estado de la solicitud
		xhr.onreadystatechange = function() {
			// Verifica si la solicitud ha finalizado
			if (xhr.readyState === XMLHttpRequest.DONE) {
				// Verifica si la solicitud fue exitosa
				if (xhr.status === 200) {
					try {
						// Intenta parsear la respuesta JSON
						var response = JSON.parse(xhr.responseText);
						// Maneja la respuesta basada en el código de estado
						switch (response.statusCod) {
							case 200:
								alert('Producto agregado exitosamente');
								// Limpia los campos del formulario
								limpiarcampos();
								break;
							case 202:
								alert('El producto ya existe');
								limpiarcampos();
								break;
							default:
								alert('Error al agregar el producto');
								limpiarcampos();
								break;
						}
					} catch (e) {
						// Maneja errores 
						console.error("Error al parsear JSON: ", e);
						console.error("Respuesta del servidor: ", xhr.responseText);
					}
				} else {
					// Muestra un error si la solicitud falla
					console.error('Error al realizar la solicitud: ', xhr.status, xhr.statusText);
				}
			}
		};

	// Prepara los datos para enviar en la solicitud
	var data = {
		cod_producto: codProducto,
		nom_producto: nomProducto,
		id_bodega: BodegaProducto,
		id_sucursal: SucursalProducto,
		id_moneda: MonedaProducto,
		precio: parseFloat(PrecioProducto).toFixed(2),
		descripcion: DescripcionProducto,
		materiales: MaterialesProducto
	};

	// Envía la solicitud con los datos en formato JSON
	xhr.send(JSON.stringify(data));

});






