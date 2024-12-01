<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Database connection
$conn = new mysqli('localhost', 'root', '', 'pfadb_fact');

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
}

$data = json_decode(file_get_contents('php://input'));

$email_user = $data->email_user;
$productId = $data->productId;
$newName = $data->name;
$newPrice = $data->Price;
$newQuantity = $data->Quantity;
$newFournisseur = $data->Fournisseur;

// Query to update the product
$sql = "UPDATE product SET name = ?, Price = ?, Quantity = ?, Fournisseur = ? WHERE ID_Product = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdisi", $newName, $newPrice, $newQuantity, $newFournisseur, $productId);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update product']);
}

$stmt->close();
$conn->close();
?>
