<?php
    
    include "config.php";
    

    $token = $con->real_escape_string($_POST['token']);

    $sql = "SELECT Id ,AddressLine_1 ,AddressLine_2,AddressLine_3,pincode FROM users WHERE token='$token' AND isActive='1'";
    

    $res = $con->query($sql);
    

    if($res->num_rows > 0){
     
        $response = array();
        while($row = $res->fetch_assoc()){
            $response[] = $row;
        }
     
        echo json_encode($response);
    } else {
        // No rows found, you may want to handle this case
        echo "No data found for the given IP address.";
    }
?>
