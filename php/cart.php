<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$productName = $_POST['productName'];
$productPrice= $_POST['productPrice'];
$productcount = $_POST['productcount'];
$Total = $_POST['Total'];
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
$sql ="INSERT INTO `usecart1`(`productName`,`productprice`,`count`,`total`)VALUES('$productName','$productPrice','$productcount','$Total')"; 
$excute= mysqli_query($conn,$sql);
if($excute) {
  echo "newrecord created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();
?>