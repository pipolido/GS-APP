<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "pfadb_login");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password)) {
    $email = $conn->real_escape_string($data->email);
    $password = $conn->real_escape_string($data->password);
    $hashedPassword = hash('sha256', $password);

    // Check if the account is locked
    $lockQuery = "SELECT locked FROM user_data WHERE email = '$email'";
    $lockResult = $conn->query($lockQuery);

    if ($lockResult->num_rows > 0) {
        $row = $lockResult->fetch_assoc();
        if ($row['locked'] == 1) {
            echo json_encode(["status" => "error", "message" => "Account locked"]);
            exit();
        }
    }

    // Check login credentials
    $query = "SELECT * FROM user_data WHERE email = '$email' AND password = '$hashedPassword'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}

$conn->close();
?>
