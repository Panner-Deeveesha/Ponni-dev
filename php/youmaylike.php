<?php

include "config.php";

$token = $con->real_escape_string($_POST['token']);

$sql = "SELECT Id FROM users  WHERE token='$token' AND isActive='1'";

$res = $con->query($sql);

if($res->num_rows > 0){
   
    $row = $res->fetch_assoc();
    $userId = $row['Id'];

    
    $sql_cart = "SELECT productId, userId, count FROM cart WHERE userId='$userId' AND paid='yes' AND delivered='yes' AND isActive='0'";
    $res_cart = $con->query($sql_cart);

    if($res_cart->num_rows > 0){
        $cartData = array();
        while($cartRow = $res_cart->fetch_assoc()){
            $cartData[] = $cartRow;
        }
        echo json_encode($cartData);
    } else {
        echo "No data found in the cart for the user with specified conditions.";
    }
} else {
   
    echo "No data found for the given token.";
}

?>

