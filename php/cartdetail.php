<?php

include "config.php";


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT * FROM usecart1";
$result = $conn->query($sql);

$products = array();


if ($result->num_rows > 0) {
   
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close();


echo json_encode($products);
?>

