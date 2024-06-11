<?php
include "config.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$wishproduct = $_POST['wishproduct'];
$userid= $_POST['userid'];
}

if ($con->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql ="DELETE FROM wish_list WHERE userId ='$userid' AND productName ='$wishproduct'";
$excute= mysqli_query($con,$sql);
if($excute) {
  echo "deleted successfully";
} else {
  echo "Error: " . $sql . "<br>" . $con->error;
}

$con->close();
?>