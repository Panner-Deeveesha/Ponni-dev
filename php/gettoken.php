<?php
    include "config.php";
    $token = $_POST["token"];
    $sql = "SELECT token FROM users";
    $result = $con->query($sql);

	if ($result->num_rows > 0) {
        $token_exists = false;
        // Iterate through each row to check if the given token matches
        while($row = $result->fetch_assoc()) {
            $db_token = $row["token"];
            if ($db_token === $token) {
                $token_exists = true;
                break;
            }
        }
        
        if ($token_exists) {
            echo json_encode(array("status" => "success", "message" => "Token '$token' exists in the database."));
        } else {
            echo json_encode(array("status" => "error", "message" => "No tokens found in the database."));
        }
    } else {
        echo "No tokens found in the database.";
    }
    $con->close();
?>

