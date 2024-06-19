<?php
include "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(isset($_POST["password"]) && isset($_POST["token"])) {
        $password = $_POST["password"];
        $token = $_POST["token"];
        $checkSql = "SELECT userPassword FROM users WHERE token='$token' AND userPassword = '$password'";
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