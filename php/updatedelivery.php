<?php
    include "config.php"; 

  
    $add1 = $_POST['AddressLine_1'];
    $add2 = $_POST['AddressLine_2'];
    $add3 = $_POST['AddressLine_3'];
    $pin = $_POST['pin'];
    $userId = $_POST['Id']; 
    $buyId = $_POST['buyid']; 


    $sql = "INSERT INTO deliveryaddress (id, buyid, addressLine1, addressLine2, addressLine3, pincode) 
            VALUES ('$userId', '$buyId', '$add1', '$add2', '$add3', '$pin')";
    

    $res = $con->query($sql);

   
    if ($res) {
        echo json_encode(["success" => "Address inserted successfully."]);
    } else {
        echo json_encode(["error" => "Insertion failed: " . $con->error]); 
    }

    $con->close(); 
?>
