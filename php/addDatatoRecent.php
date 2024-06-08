<?php
include "config.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$id = $_POST['id'];
$userId= $_POST['userId'];
$productName = $_POST['productName'];
}
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}
// Insert product details into database
$sql ="INSERT INTO `recent_view`(`id`,`userId`,`productName`)VALUES('$id','$userId','$productName')"; 
$excute= mysqli_query($con,$sql);
if($excute) {
  echo "newrecord created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $con->error;
}
$con->close();
?>
