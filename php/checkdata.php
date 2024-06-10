<?php
include "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(isset($_POST['idproduct']) && isset($_POST['userwithid'])) {
        $id = $_POST['idproduct'];
        $userId = $_POST['userwithid'];

        $checkSql = "SELECT * FROM recent_view WHERE productId = '$id' AND userId = '$userId'";
        $result = mysqli_query($con, $checkSql);

        if ($result = mysqli_query($con, $checkSql)) {
            //echo "1";
            $rowcount = mysqli_num_rows($result);
            //echo $rowcount;
            if ($rowcount > 0) {
                echo "true";
            } else {
                echo "false";
            }
        }else{
            echo "2";
        }
    } else {
        echo "Error: Missing parameters";
    }
    mysqli_close($con);
}
?>
