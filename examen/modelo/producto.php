<?php
// Llamar archivo conexion
require_once "conexion.php";
$conexion = conectar();


if (isset($_GET['accion'])) {
	
switch ($_GET["accion"]) {
	
case 'listarproductos':
$sql= "SELECT * FROM vista_productos";
$stmt = $conexion->prepare($sql);
$stmt->execute();
$result = $stmt->get_result(); 
$arreglos["data"] = [];
if ($stmt == true){
while ($datos = $result->fetch_assoc()) {
 $arreglos["data"][]=  $datos ;
}
  echo json_encode($arreglos);			
}
break;
	
case 'listarbodega':
$sql= "CALL proce_producto ('', '', 0, 0, 0, 0, '', 'listarbodega', @resultado, @idproductoout)";
$stmt = $conexion->prepare($sql);
$stmt->execute();
$result = $stmt->get_result(); 
$arreglos["data"] = [];
if ($stmt == true){
while ($datos = $result->fetch_assoc()) {
 $arreglos["data"][]=  $datos ;
}
  echo json_encode($arreglos);			
}
break;


case 'listarmoneda':
$sql= "CALL proce_producto ('', '', 0, 0, 0, 0, '',  'listarmonedas', @resultado, @idproductoout)";
$stmt = $conexion->prepare($sql);
$stmt->execute();
$result = $stmt->get_result(); 
$arreglos["data"] = [];
if ($stmt == true){
while ($datos = $result->fetch_assoc()) {
 $arreglos["data"][]=  $datos ;
}
  echo json_encode($arreglos);			
}
break;

case 'listarsucursales':
$idbodega = $_GET['id_bodega'];
$sql= "CALL proce_producto ('', '', ?, 0, 0, 0, '',  'listarsucursales', @resultado, @idproductoout)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $idbodega);
$stmt->execute();
$result = $stmt->get_result(); 
$arreglos["data"] = [];
if ($stmt == true){
while ($datos = $result->fetch_assoc()) {
 $arreglos["data"][]=  $datos ;
}
  echo json_encode($arreglos);			
}
break;


case 'insertarproducto':
header('Content-Type: application/json');
// Obtener los datos enviados por AJAX
$data = json_decode(file_get_contents('php://input'), true);
if ($data) {
    $codProducto = $data['cod_producto'];
    $nomProducto = $data['nom_producto'];
    $idBodega = $data['id_bodega'];
    $idSucursal = $data['id_sucursal'];
    $idMoneda = $data['id_moneda'];
    $precio = $data['precio'];
    $descripcion = $data['descripcion'];
    $materiales = $data['materiales']; // Este es un array

    // Llamar al procedimiento almacenado
    $sql = "CALL proce_producto (?, ?, ?, ?, ?, ?, ?, 'insertarproducto', @resultado, @idproductoout)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("sssiiss", $codProducto, $nomProducto, $idBodega, $idSucursal, $idMoneda, $precio, $descripcion);
    $stmt->execute();

    // Obtener el resultado del procedimiento almacenado
    $result = $conexion->query("SELECT @resultado AS resultado, @idproductoout as idproductoout");
    $row = $result->fetch_assoc();
    $varlogica = $row["resultado"];
	$varidproductoinsertado = $row["idproductoout"]; 

    // Cerrar la consulta y la conexión
    $stmt->close();
    
    // Insertar los materiales asociados al producto
    if ($varlogica == 1) {
        
        if (!empty($materiales)) {
            $stmtMaterial = $conexion->prepare("INSERT INTO productos_materiales (id_producto, nom_material) VALUES (?, ?)");
            foreach ($materiales as $material) {
                $stmtMaterial->bind_param("is", $varidproductoinsertado, $material);
                $stmtMaterial->execute();
            }
            $stmtMaterial->close();
        }
        echo json_encode(array("statusCod" => 200)); // Éxito
    } else if ($varlogica == 2) {
        echo json_encode(array("statusCod" => 202)); // Producto ya existe
    } else {
        echo json_encode(array("statusCod" => 201)); // Error
    }

    $conexion->close();
} else {
    echo json_encode(array("statusCod" => 201)); // Error en los datos recibidos
}
break;




}

}
?>
