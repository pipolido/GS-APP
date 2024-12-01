<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
// Database connection details
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the invoice data from the request
$data = json_decode(file_get_contents('php://input'), true);

// Update the invoice in the 'factures' table
$invoiceId = $data['id'];
$email_user = $data['email_user'];
$nomclient = $data['nomclient'];
$date = $data['date'];
$prixht = $data['prixht'];
$prixttc = $data['prixttc'];

$sql = "UPDATE factures SET nomclient = '$nomclient', date = '$date', prixht = '$prixht', prixttc = '$prixttc' WHERE id = $invoiceId";

if ($conn->query($sql) === TRUE) {
    // Update the items in the 'factures_items' table
    $deleteItemsSql = "DELETE FROM factures_items WHERE id_facture = $invoiceId";
    $conn->query($deleteItemsSql);

    $items = $data['items'];
    foreach ($items as $item) {
        $produitservice = $item['produitservice'];
        $prixu = $item['prixu'];
        $qnt = $item['qnt'];
        $prixtotal = $item['prixtotal'];

        $insertItemSql = "INSERT INTO factures_items (id_facture, produitservice, prixu, qnt, prixtotal) VALUES ($invoiceId, '$produitservice', '$prixu', '$qnt', '$prixtotal')";
        $conn->query($insertItemSql);
    }

    echo json_encode(array('status' => 'success'));
} else {
    echo json_encode(array('status' => 'error', 'message' => $conn->error));
}

$conn->close();
?>
