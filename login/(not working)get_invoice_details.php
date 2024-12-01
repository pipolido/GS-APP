


<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include 'config.php';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'];
    $email_user = $input['email_user'];

    $sql = "SELECT nomclient, date, prixht as totalHT, prixttc as totalTTC FROM factures WHERE id = ? AND email_user = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $id, $email_user);
    $stmt->execute();
    $result = $stmt->get_result();
    $invoice = $result->fetch_assoc();

    if (!$invoice) {
        echo json_encode(['status' => 'error', 'message' => 'Invoice not found']);
        exit();
    }

    $sql = "SELECT produitservice as produitservice, prixu, qnt, prixtotal FROM factures_items WHERE id_facture = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $items = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode(['nomclient' => $invoice['nomclient'], 'date' => $invoice['date'], 'totalHT' => $invoice['totalHT'], 'totalTTC' => $invoice['totalTTC'], 'items' => $items]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
