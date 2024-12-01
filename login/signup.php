<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pfadb_login"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    die(json_encode(["status" => "error", "message" => "Invalid input"]));
}

$nom = $data['nom'];
$prenom = $data['prenom'];
$email = $data['email'];
$code = $data['code'];
$password = hash('sha256', $data['password']);

$sql = "SELECT * FROM codes WHERE Logcode = '$code'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $stmt = $conn->prepare("INSERT INTO user_data (nom, prenom, email, code, password, locked) VALUES (?, ?, ?, ?, ?, 0)");
    $stmt->bind_param("sssss", $nom, $prenom, $email, $code, $password);
    
    if ($stmt->execute()) {
        // Delete the code from the codes table
        $deleteCodeSql = "DELETE FROM codes WHERE Logcode = '$code'";
        if ($conn->query($deleteCodeSql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "New record created successfully and code deleted"]);
        } else {
            echo json_encode(["status" => "success", "message" => "New record created successfully, but failed to delete the code"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Code invalide ou déjà utilisé"]);
}

$conn->close();
?>
