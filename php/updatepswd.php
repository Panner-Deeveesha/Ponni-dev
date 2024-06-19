<?php
    include "config.php";

    $token = $_POST['token'] ;
    $password=$_POST['password'];
    $sql = "UPDATE users SET userPassword = '$password' WHERE token='$token'";
    $res = $con->query($sql);
    if ($res) {
        if ($con->affected_rows > 0) {
            echo json_encode(["success" => "Password updated successfully."]);
        } else {
            echo json_encode(["error" => "No records were updated."]);
        }
    } 

    $con->close();
?>
