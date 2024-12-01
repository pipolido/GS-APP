<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from your React app's origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    http_response_code(200);
    exit();
}

include 'config.php';

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'];
$email_user = $input['email_user'];

if ($id && $email_user) {
    $query = "SELECT * FROM factures WHERE id='$id' AND email_user='$email_user'";
    $result = mysqli_query($conn, $query);
    $invoice = mysqli_fetch_assoc($result); 

    if ($invoice) {
        $query_items = "SELECT * FROM facture_items WHERE id_facture='$id'";
        $result_items = mysqli_query($conn, $query_items);
        $items = [];
        while ($row = mysqli_fetch_assoc($result_items)) {
            $items[] = $row;
        }
        $invoice['items'] = $items;
        echo json_encode($invoice);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Invoice not found']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid request']);
}
?>
