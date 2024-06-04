<?php

    include "config.php";
    
    $ip = $_POST['ip'];
    
    
    $sql = "SELECT productId, count FROM  cart WHERE ipAddress='$ip' ";
    
   
    $res = $con->query($sql);
    
   
    if($res->num_rows > 0){
        
        $response = array();
        while($row = $res->fetch_assoc()){
            $response[] = $row;
        }
        
        echo json_encode($response);
    } else {
       
        echo "No data found for the given IP address.";
    }
?>
