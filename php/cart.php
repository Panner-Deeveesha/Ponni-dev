<?php
include "config.php";
$sql = "SELECT COUNT(*) as count FROM cart"; 

$res = $con->query($sql);

if($res->num_rows > 0){
  $row = $res->fetch_assoc(); 
  $response[] = $row['count']; 
}
echo json_encode($response);		
?>

