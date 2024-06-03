<?php
include "config.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

$token= $_POST['token'];

}

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}
$column_name = "token";
// Insert product details into database
$sql =" UPDATE users SET $column_name = NULL WHERE $column_name = '$token'";
$excute= mysqli_query($con,$sql);
if($excute) {
  echo "newrecord deleted successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}


$con->close();
?>

