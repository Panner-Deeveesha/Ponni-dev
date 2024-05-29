<?php
    include "config.php";

    $productslist1 = $_POST['productslist'];

    $response1 = array();

    $productIds1 = array();

 
    foreach ($productslist1 as $product1) {
        $productIds1[] = $product1['productId'];
    }

  
    $escapedProductIds1 = array();
    foreach ($productIds1 as $productId1) {
        $escapedProductIds1[] = mysqli_real_escape_string($con, $productId1);
    }
    $escapedProductIdsString1 = "'" . implode("','", $escapedProductIds1) . "'";
    $query = "SELECT productId, productName,imgPath_1,volume FROM products WHERE productId IN ($escapedProductIdsString1)";

    $res = $con->query($query);

    if ($res) {
      
        while ($row = mysqli_fetch_assoc($res)) {
           
            $response1[] = $row;
        }
    } else {
        
        $response1[] = array("error" => "Error executing query: " . mysqli_error($con));
    }

    echo json_encode($response1);
    mysqli_close($con);
?>

