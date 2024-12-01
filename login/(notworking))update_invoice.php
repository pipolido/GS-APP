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
    $nomclient = $input['nomclient'];
    $date = $input['date'];
    $totalHT = $input['totalHT'];
    $totalTTC = $input['totalTTC'];
    $items = $input['items'];

    $sql = "UPDATE factures SET nomclient = ?, date = ?, prixht = ?, prixttc = ? WHERE id = ? AND email_user = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdsis", $nomclient, $date, $totalHT, $totalTTC, $id, $email_user);
    if ($stmt->execute()) {
        $sql = "DELETE FROM factures_items WHERE id_facture = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        foreach ($items as $item) {
            $nameprod = $item['nameprod'];
            $prixu = $item['prixu'];
            $qnt = $item['qnt'];
            $prixtotal = $item['prixtotal'];

            $sql = "INSERT INTO factures_items (id_facture, produitservice, prixu, qnt, prixtotal) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("isdds", $id, $nameprod, $prixu, $qnt, $prixtotal);
            $stmt->execute();
        }

        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update invoice']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
