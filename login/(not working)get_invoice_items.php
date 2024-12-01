<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database connection details
$host = 'localhost';
$db = 'pfadb_fact';
$user = 'root';
$pass = '';

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit;
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the posted data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (isset($data['id_facture'])) {
        $id_facture = $data['id_facture'];

        // Prepare and execute the SQL query
        $stmt = $conn->prepare("SELECT * FROM facture_items WHERE id_facture = ?");
        $stmt->bind_param("i", $id_facture);
        $stmt->execute();
        $result = $stmt->get_result();

        // Fetch all results
        $items = $result->fetch_all(MYSQLI_ASSOC);

        // Return the items as JSON
        echo json_encode($items);

        // Close statement
        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}

// Close connection
$conn->close();
?>
