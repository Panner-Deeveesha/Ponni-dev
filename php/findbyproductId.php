
<?php
    include "config.php";
    $productslist = $_POST['products'];
    $response = array();
    $productIds = array();
    foreach ($productslist as $product) {
        $productIds[] = $product['productId'];
    }
    $escapedProductIds = array();
    foreach ($productIds as $productId) {
        $escapedProductIds[] = mysqli_real_escape_string($con, $productId);
    }
    $escapedProductIdsString = "'" . implode("','", $escapedProductIds) . "'";
    $query = "SELECT productName,productId,volume,unit,imgPath_1,imgPath_2 FROM products WHERE productId IN ($escapedProductIdsString) AND isActive='1'";
    $res = $con->query($query);
    if ($res) {
        while ($row = mysqli_fetch_assoc($res)) {
            $response[] = $row;
        }
    } else {
        $response[] = array("error" => "Error executing query: " . mysqli_error($con));
    }
    echo json_encode($response);
    mysqli_close($con);


?>








