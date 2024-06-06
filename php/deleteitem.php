<?php
include "config.php";

$uniqueId = $_POST["productId"];

$sql = "UPDATE cart SET isActive ='0' WHERE ProductId='$uniqueId'";

$res = $con->query($sql);

if ($res === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $con->error;
}
?>


