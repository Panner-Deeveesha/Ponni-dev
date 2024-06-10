<?php
    include "config.php";
    $prodid = $_POST['objects'];
    $response = array();
    $productId = array();
    foreach ($prodid as $product) {
        $productId[] = $product['productId'];
    }
    $productidstring = "'" . implode("','", $productId) . "'";
    $query = "SELECT * FROM products WHERE productId IN ($productidstring)";
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