<?php
    include "config.php";
    $product_id = $_POST["productId"]; 
    $sql = "SELECT img_Path,expiretime FROM offers WHERE productId='$product_id' AND isActive='1'";
    $res = $con->query($sql);

    if($res->num_rows > 0){
        while($row = $res->fetch_assoc()){
            $response[] = $row;
        }
        echo json_encode($response);
    }
?>

