<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "pfadb_login");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email)) {
    $email = $conn->real_escape_string($data->email);
    $query = "SELECT email FROM user_data WHERE email = '$email'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "success", "email" => $email]);
    } else {
        echo json_encode(["status" => "error", "message" => "utilisateur non trouvé ❗"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}

$conn->close();
?>
