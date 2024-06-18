<?php
    include "config.php";

    $token = $_POST['token'] ;
    $pin = $_POST['pin'] ;
    $city = $_POST['city'] ;

    $district=$_POST['district'] ;
    $street=$_POST['street'] ;
    $doornum=$_POST['doornum'];
    
    $sql = "UPDATE users SET AddressLine_1='$doornum', AddressLine_2='$street,$city',AddressLine_3='$district',pincode='$pin' WHERE token='$token'";
    $res = $con->query($sql);

   
    if ($res) {
        if ($con->affected_rows > 0) {
            echo json_encode(["success" => "Address updated successfully."]);
        } else {
            echo json_encode(["error" => "No records were updated."]);
        }
    } 

    $con->close();
?>

