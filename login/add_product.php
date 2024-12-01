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

$name = $data->name;
$price = $data->Price;
$quantity = $data->Quantity;
$fournisseur = $data->Fournisseur;

// Query to insert a new product
$sql = "INSERT INTO product (name, price, quantity, fournisseur) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdis", $name, $price, $quantity, $fournisseur);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add product']);
}

$stmt->close();
$conn->close();
?>
