<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$productId = $_POST['productId'];
$userid= $_POST['userid'];
$productcount = $_POST['productcount'];
$isActive = $_POST['isActive'];
}
$servername = "localhost";
$username = "root";
 $password="";
$dbname ="ponnidb";

$conn =mysqli_connect($servername,$username,$password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert product details into database
$sql ="INSERT INTO `cart`(`userid`,`productId`,`count`,`isActive`)VALUES('$userid','$productId','$productcount','$isActive')"; 
$excute= mysqli_query($conn,$sql);
if($excute) {
  echo "newrecord created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();
?>