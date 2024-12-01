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

try {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data || !isset($data['id'])) {
        throw new Exception('Invalid input');
    }

    $id_facture = $data['id'];

    // Begin transaction
    $conn->begin_transaction();

    // Delete items from facture-items table
    $queryItems = "DELETE FROM `facture_items` WHERE id_facture = ?";
    $stmtItems = $conn->prepare($queryItems);
    if (!$stmtItems) {
        throw new Exception('Failed to prepare statement for items');
    }
    $stmtItems->bind_param('i', $id_facture);
    $stmtItems->execute();
    $stmtItems->close();

    // Delete the invoice itself
    $queryInvoice = "DELETE FROM factures WHERE id = ?";
    $stmtInvoice = $conn->prepare($queryInvoice);
    if (!$stmtInvoice) {
        throw new Exception('Failed to prepare statement for invoice');
    }
    $stmtInvoice->bind_param('i', $id_facture);
    $stmtInvoice->execute();
    $stmtInvoice->close();

    // Commit transaction
    $conn->commit();

    sendResponse(['status' => 'success', 'message' => 'Invoice deleted successfully']);
} catch (Exception $e) {
    // Rollback transaction on error
    $conn->rollback();

    // Log the error
    error_log($e->getMessage());

    // Send an error response
    sendResponse(['status' => 'error', 'message' => $e->getMessage()]);
}

$conn->close();
?>
