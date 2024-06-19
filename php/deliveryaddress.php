<?php
    include "config.php"; 

    $pin = $_POST['pin'] ;
    $city = $_POST['city'] ;

    $district=$_POST['district'] ;
    $street=$_POST['street'] ;
    $doornum=$_POST['doornum'];
    $userId = $_POST['Id']; 
    $buyId = $_POST['buyid']; 

    $sql = "INSERT INTO deliveryaddress (id, buyid, addressLine1, addressLine2, addressLine3, pincode) 
        VALUES ('$userId', '$buyId', '$doornum', '$street', '$city', '$pin')";

    $res = $con->query($sql);

   
    if ($res) {
        echo json_encode(["success" => "Address inserted successfully."]);
    } else {
        echo json_encode(["error" => "Insertion failed: " . $con->error]); 
    }

    $con->close(); 
?>
