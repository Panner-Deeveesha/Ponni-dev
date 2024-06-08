<?php
include "config.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$wishproduct = $_POST['wishproduct'];
$userid= $_POST['userid'];
}

if ($con->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert product details into database
$sql ="INSERT INTO `wish_list`(`userid`,`productName`,`isActive`)VALUES('$userid','$wishproduct','1')"; 
$excute= mysqli_query($con,$sql);
if($excute) {
  echo "newrecord created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $con->error;
}

$con->close();
?>