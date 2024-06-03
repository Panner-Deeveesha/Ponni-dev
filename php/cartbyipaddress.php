<?php
include "config.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$productId = $_POST['productId'];
$ipAddress= $_POST['ipAddress'];
$productcount = $_POST['productcount'];

}

if ($con->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert product details into database
$sql ="INSERT INTO `cart`(`ipAddress`,`productId`,`count`,`isActive`)VALUES('$ipAddress','$productId','$productcount','1')"; 
$excute= mysqli_query($con,$sql);
if($excute) {
  echo "newrecord created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $con->error;
}

$con->close();
?>