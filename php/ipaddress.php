<?php
include "config.php";


$token = $_POST["token"];
$ipAddress = $_POST["ipAddress"];


$sql_check_cart = "SELECT COUNT(*) as count FROM cart WHERE ipAddress='$ipAddress' AND isActive='1'";
$res_check_cart = $con->query($sql_check_cart);

// Fetch the result
$row_check_cart = $res_check_cart->fetch_assoc();
$cartItemCount = $row_check_cart['count'];



$response = array(); 


if ($cartItemCount > 0) {
   
    $response['hasProducts'] = true;

  
    $sql_fetch_data = "SELECT * FROM cart WHERE ipAddress='$ipAddress'";
    $res_fetch_data = $con->query($sql_fetch_data);

    if ($res_fetch_data->num_rows > 0) {
        while ($row = $res_fetch_data->fetch_assoc()) {
            $response['data'][] = $row;
        }
    }
} else {
  
    $response['hasProducts'] = false;
}


echo json_encode($response);
?>

