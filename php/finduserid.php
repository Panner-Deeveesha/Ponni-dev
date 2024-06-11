<?php
    include "config.php";
    $user_id = $_POST["id"]; 
    $sql = "SELECT productId, count FROM cart WHERE userId='$user_id'AND paid='no' AND delivered='no' AND isActive='1'";
    $res = $con->query($sql);

    if($res->num_rows > 0){
        while($row = $res->fetch_assoc()){
            $response[] = $row;
        }
        echo json_encode($response);
    }
?>






