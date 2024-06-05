<?php
include "config.php";
$userId = $_POST["userid"]; 
$sql = "SELECT COUNT(*) as count FROM cart where userId = '$userId'"; 

$res = $con->query($sql);

if($res->num_rows > 0){
  $row = $res->fetch_assoc(); 
  $response[] = $row['count']; 
}
echo json_encode($response);		
?>

