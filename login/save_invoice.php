<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Turn off HTML errors and log them instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'path/to/php-error.log');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pfadb_fact";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON input"]);
    exit;
}

$email_user = $input['email_user'];
$nomclient = $input['nomclient'];
$date = $input['date'];
$prixht = $input['prixht'];
$prixttc = $input['prixttc'];
$items = $input['items'];

// Insert into factures table
$sql = "INSERT INTO factures (email_user, nomclient, date, prixht, prixttc) VALUES ('$email_user', '$nomclient', '$date', '$prixht', '$prixttc')";

if ($conn->query($sql) === TRUE) {
    $id_facture = $conn->insert_id;

    // Insert into facture_items table
    $itemInsertSuccess = true;
    foreach ($items as $item) {
        $produitservice = $conn->real_escape_string($item['produitservice']);
        $prixu = $conn->real_escape_string($item['prixu']);
        $qnt = $conn->real_escape_string($item['qnt']);
        $prixtotal = $conn->real_escape_string($item['prixtotal']);

        // Check if the requested quantity is available in stock
        $stockCheckSql = "SELECT Quantity FROM product WHERE name = '$produitservice'";
        $result = $conn->query($stockCheckSql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $availableStock = $row['Quantity'];

            if ($availableStock < $qnt) {
                echo json_encode([
                    "status" => "error",
                    "message" => "stock insuffisant pour certains produits !"
                ]);
                exit;
            }

            // Proceed with inserting item into facture_items
            $sql = "INSERT INTO facture_items (id_facture, produitservice, prixu, qnt, prixtotal) 
                    VALUES ('$id_facture', '$produitservice', '$prixu', '$qnt', '$prixtotal')";

            if (!$conn->query($sql)) {
                $itemInsertSuccess = false;
                error_log("Error inserting item: " . $conn->error);
                break;
            }

            // Update stock in the products table
            $updateStockSql = "UPDATE product SET Quantity = Quantity - $qnt WHERE name = '$produitservice'";
            if (!$conn->query($updateStockSql)) {
                $itemInsertSuccess = false;
                error_log("Error updating stock: " . $conn->error);
                break;
            }
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Product not found: $produitservice"
            ]);
            exit;
        }
    }

    if ($itemInsertSuccess) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error processing invoice items"]);
    }
} else {
    error_log("Error inserting invoice: " . $conn->error);
    echo json_encode(["status" => "error", "message" => "Error saving invoice: " . $conn->error]);
}

$conn->close();
?>
