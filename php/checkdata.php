<?php
include "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['idproduct'];
    $userId = $_POST['userwithid'];    
    if ($con->connect_error) {
        die("Connection failed: " . $con->connect_error);
    }
    $sql = "SELECT * FROM recent_view WHERE productId = '$id' AND userId = '$userId'";
    $result = mysqli_query($con, $sql);
    if ($result && mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data);
    } else {
        $insertSql = "INSERT INTO recent_view (productId, userId) VALUES ('$id', '$userId')";
        if (mysqli_query($con, $insertSql)) {
            echo "productadded";
        } else {
            echo "Error: " . $insertSql . "<br>" . mysqli_error($con);
        }
    }

    // Close connection
    mysqli_close($con);
}
?>

