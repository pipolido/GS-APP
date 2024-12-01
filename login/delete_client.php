<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php';

function sendResponse($data) {
    echo json_encode($data);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    sendResponse(['status' => 'error', 'message' => 'Invalid input']);
}

$email_user = $data['email_user'];
$nomclient = $data['nomclient'];
if (!$email_user || !$nomclient) {
    sendResponse(['status' => 'error', 'message' => 'Email and client name are required']);
}

$query = "DELETE FROM facture_items WHERE id_facture IN (SELECT id FROM factures WHERE email_user = ? AND nomclient = ?)";
$stmt = $conn->prepare($query);
if (!$stmt) {
    sendResponse(['status' => 'error', 'message' => 'Failed to prepare statement for deleting items']);
}
$stmt->bind_param('ss', $email_user, $nomclient);
$stmt->execute();
$stmt->close();

$query = "DELETE FROM factures WHERE email_user = ? AND nomclient = ?";
$stmt = $conn->prepare($query);
if (!$stmt) {
    sendResponse(['status' => 'error', 'message' => 'Failed to prepare statement for deleting invoice']);
}
$stmt->bind_param('ss', $email_user, $nomclient);
$stmt->execute();
$stmt->close();

sendResponse(['status' => 'success', 'message' => 'Client and associated invoices deleted successfully']);

$conn->close();
?>
