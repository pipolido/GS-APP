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
  
  // Update the 'locked' column to true for the given email
  $query = "UPDATE user_data SET locked = true WHERE email = '$email'";
  
  if ($conn->query($query) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Account locked"]);
  } else {
    echo json_encode(["status" => "error", "message" => "Failed to lock account"]);
  }
} else {
  echo json_encode(["status" => "error", "message" => "Invalid input"]);
}

$conn->close();
?>
