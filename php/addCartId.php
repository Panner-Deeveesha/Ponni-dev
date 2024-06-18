<?php
    
    include "config.php";
    

    $cartid =$_POST['cartid'];
    $userId=$_POST['userId'];

    $sql = "UPDATE cart SET buyId='$cartid' WHERE userId='$userId'" ;
    

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
