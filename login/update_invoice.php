<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow requests from your React app's origin
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
$nomclient = $input['nomclient'];
$date = $input['date'];
$prixht = $input['prixht'];
$prixttc = $input['prixttc'];
$items = $input['items'];

if ($id && $nomclient && $date && $prixht && $prixttc && $items) {
    $query = "UPDATE factures SET nomclient='$nomclient', date='$date', prixht='$prixht', prixttc='$prixttc' WHERE id='$id'";
    if (mysqli_query($conn, $query)) {
        $query_delete_items = "DELETE FROM facture_items WHERE id_facture='$id'";
        if (mysqli_query($conn, $query_delete_items)) {
            foreach ($items as $item) {
                $produitservice = $item['produitservice'];
                $prixu = $item['prixu'];
                $qnt = $item['qnt'];
                $prixtotal = $item['prixtotal'];
                $query_insert_item = "INSERT INTO facture_items (id_facture, produitservice, prixu, qnt, prixtotal) VALUES ('$id', '$produitservice', '$prixu', '$qnt', '$prixtotal')";
                if (!mysqli_query($conn, $query_insert_item)) {
                    http_response_code(500);
                    echo json_encode(['status' => 'error', 'message' => 'Failed to insert item']);
                    exit();
                }
            }
            echo json_encode(['status' => 'success']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete existing items']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to update invoice']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid input']);
}
?>
