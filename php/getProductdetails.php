<?php
    include "config.php";
    $name = $_POST['objects'];
    $response = array();
    $productname = array();
    foreach ($name as $product) {
        $productname[] = $product['productName'];
    }
    $productnamestring = "'" . implode("','", $productname) . "'";
    $query = "SELECT * FROM products WHERE productName IN ($productnamestring)";
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