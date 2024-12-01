<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php'; // Ensure this file sets up your database connection

// Enable error logging
ini_set('log_errors', 1);
ini_set('error_log', 'errors.log'); // Ensure this file is writable by the server

// Helper function to send JSON responses
function sendResponse($data) {
    echo json_encode($data);
    exit;
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        throw new Exception('Invalid input');
    }

    $email_user = $data['email_user'];
    if (!$email_user) {
        throw new Exception('Email is required');
    }

    // Prepare and execute the SQL query
    $query = "SELECT id, email_user, nomclient, date, prixht, prixttc, status FROM factures WHERE email_user = ?";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        throw new Exception('Failed to prepare statement');
    }

    $stmt->bind_param('s', $email_user);
    $stmt->execute();
    $result = $stmt->get_result();

    $invoices = [];
    while ($row = $result->fetch_assoc()) {
        $invoices[] = $row;
    }

    sendResponse($invoices);

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    // Log the error
    error_log($e->getMessage());
    // Send an error response
    sendResponse(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
