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
if (!$email_user) {
    sendResponse(['status' => 'error', 'message' => 'Email is required']);
}

$query = "SELECT nomclient, MIN(date) as datePremiereFacture, COUNT(*) as nombreFactures 
          FROM factures 
          WHERE email_user = ?
          GROUP BY nomclient";
$stmt = $conn->prepare($query);
if (!$stmt) {
    sendResponse(['status' => 'error', 'message' => 'Failed to prepare statement']);
}

$stmt->bind_param('s', $email_user);
$stmt->execute();
$result = $stmt->get_result();

$clients = [];
while ($row = $result->fetch_assoc()) {
    $clients[] = $row;
}

sendResponse($clients);

$stmt->close();
$conn->close();
?>
