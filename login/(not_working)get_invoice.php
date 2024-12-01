<?php
// Disable error reporting and display errors
error_reporting(0);
ini_set('display_errors', 0);

// Start output buffering
ob_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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

// Get the invoice ID from the request
$invoiceId = $_POST['id'];

// Query to fetch the invoice data
$sql = "SELECT f.nomclient, f.date, f.prixht, f.prixttc, fi.produitservice, fi.prixu, fi.qnt, fi.prixtotal
        FROM factures f
        JOIN factures_items fi ON f.id = fi.invoice_id
        WHERE f.id = $invoiceId";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $invoiceData = array(
        'nomclient' => '',
        'date' => '',
        'prixht' => '',
        'prixttc' => '',
        'items' => array()
    );

    while ($row = $result->fetch_assoc()) {
        $invoiceData['nomclient'] = $row['nomclient'];
        $invoiceData['date'] = $row['date'];
        $invoiceData['prixht'] = $row['prixht'];
        $invoiceData['prixttc'] = $row['prixttc'];
        $invoiceData['items'][] = array(
            'produitService' => $row['produitservice'],
            'prixUnitaire' => $row['prixu'],
            'quantite' => $row['qnt'],
            'prixTotale' => $row['prixtotal']
        );
    }

    header('Content-Type: application/json');
    echo json_encode($invoiceData);
} else {
    header('Content-Type: application/json');
    echo json_encode(array('error' => 'No invoice found'));
}

$conn->close();

// Flush and clean output buffer
ob_end_clean();
?>
