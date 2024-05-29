<?php
    include "config.php";
    $productslist = $_POST['objects'];
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
    $query = "SELECT * FROM price WHERE productId IN ($escapedProductIdsString)";
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


    /*include "config.php";
    $jsonObjects = $_POST['objects']; // Get the JSON data
    $decodedObjects = json_decode($jsonObjects, true); // Decode the JSON string
    foreach ($decodedObjects as $object) {
        $id = $object['productId'];
        $sql = "SELECT * FROM price WHERE productId IN ('$id')";
        $res = $con->query($sql);
        if($res->num_rows>0){
            while($row=$res->fetch_assoc()){
                $response[] = $row;
                //echo json_encode($response);
            }
        }else{
            echo "no record";
        }
    }
    echo json_encode($response);*/
?>