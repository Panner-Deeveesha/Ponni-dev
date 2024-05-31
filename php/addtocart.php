<?php
include "config.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$productId = $_POST['productId'];
$userid= $_POST['userid'];
$productcount = $_POST['productcount'];
$isActive = $_POST['isActive'];
}

if ($con->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert product details into database
$sql ="INSERT INTO `cart`(`userid`,`productId`,`count`,`isActive`)VALUES('$userid','$productId','$productcount','$isActive')"; 
$excute= mysqli_query($con,$sql);
if($excute) {
  echo "newrecord created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $con->error;
}

$con->close();
?>