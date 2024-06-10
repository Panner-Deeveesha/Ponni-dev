<?php
include "config.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$id = $_POST['productid'];
$userId= $_POST['userid'];
}
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}
// Insert product details into database
$sql ="INSERT INTO `recent_view`(`productId`,`userId`)VALUES('$id','$userId')"; 
$excute= mysqli_query($con,$sql);
if($excute) {
  echo "newrecord created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $con->error;
}
$con->close();
?>
