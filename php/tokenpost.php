<?php
include "config.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$userid = $_POST['id'];
$token= $_POST['token'];

}

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Insert product details into database
$sql ="UPDATE users SET token='$token' WHERE id='$userid' AND isActive='1'"; 
$excute= mysqli_query($con,$sql);
if($excute) {
  echo "newrecord created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}


$con->close();
?>