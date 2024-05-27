<?php
include "config.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

$name = $_POST['name'];
$emailId= $_POST['emailvalue'];
$userPassword = $_POST['passvalue'];
$contactno = $_POST['contactno'];
}





if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Insert product details into database
$sql ="INSERT INTO `users`(`name`,`emailId`,`userPassword`,`contactNo`)VALUES('$name','$emailId','$userPassword','$contactno')"; 
$excute= mysqli_query($con,$sql);
if($excute) {
  echo "newrecord created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $con->error;
}


$con->close();
?>
