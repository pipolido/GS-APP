<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php'; // Ensure this file sets up your database connection

// Helper function to send JSON responses
function sendResponse($data) {
    echo json_encode($data);
    exit;
}

// Decode JSON input
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    sendResponse(['status' => 'error', 'message' => 'Invalid input']);
}

$email_user = $data['email_user'];
$oldName = $data['oldName'];
$newName = $data['newName'];

if (!$email_user || !$oldName || !$newName) {
    sendResponse(['status' => 'error', 'message' => 'Email, old name, and new name are required']);
}

// Prepare and execute the SQL query
$query = "UPDATE factures SET nomclient = ? WHERE email_user = ? AND nomclient = ?";
$stmt = $conn->prepare($query);
if (!$stmt) {
    sendResponse(['status' => 'error', 'message' => 'Failed to prepare statement']);
}

$stmt->bind_param('sss', $newName, $email_user, $oldName);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    sendResponse(['status' => 'success', 'message' => 'Client name updated successfully']);
} else {
    sendResponse(['status' => 'error', 'message' => 'No rows updated']);
}

$stmt->close();
$conn->close();
?>
