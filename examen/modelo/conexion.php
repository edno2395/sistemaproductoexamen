<?php
// Definición de constantes para la configuración de la base de datos
define('DB_SERVER', 'localhost');
define('DB_NAME', 'prueba');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

function conectar()
{
    // Creación de una nueva instancia de mysqli para conectar a la base de datos
    $conexion = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME);

    // Verificación si hubo un error al intentar conectar
    if ($conexion->connect_error) {
        // Si hay un error, se muestra un mensaje de error y el script termina
        die("Error en la conexión: " . $conexion->connect_errno . " - " . $conexion->connect_error);
    }
    
    // Configuración del conjunto de caracteres para la conexión
    mysqli_set_charset($conexion, "utf8mb4");
    
    // Se retorna la conexión para su uso en otras partes del código
    return $conexion;
}

// Intentar conectar a la base de datos $conexion = conectar();

?>
