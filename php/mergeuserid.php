
<?php
include "config.php";


$token = $_POST["token"];
$ipAddress = $_POST["ipAddress"];


$sql_check_cart = "SELECT COUNT(*) as count FROM cart WHERE ipAddress='$ipAddress'";
$res_check_cart = $con->query($sql_check_cart);
$row_check_cart = $res_check_cart->fetch_assoc();
$cartItemCount = $row_check_cart['count'];


if ($cartItemCount > 0) {

    $sql_user = "SELECT Id FROM users WHERE token='$token' AND isActive='1'";
    $res_user = $con->query($sql_user);

    if ($res_user->num_rows > 0) {
        $row_user = $res_user->fetch_assoc();
        $user_id = $row_user['Id'];

        
        $sql_update_cart = "UPDATE cart SET userId='$user_id' WHERE ipAddress='$ipAddress' AND isActive='1'";
        if($con->query($sql_update_cart) === TRUE){
          
            $sql_cart = "SELECT productId,userId,count FROM cart WHERE userId='$user_id'AND paid='no' AND delivered='no' AND isActive='1'";
            $res_cart = $con->query($sql_cart);

            if($res_cart->num_rows > 0){
                $response = array();
                while($row_cart = $res_cart->fetch_assoc()){
                    $response[] = $row_cart;
                }
                echo json_encode($response);
            } else {
                echo "No items in the cart for this user.";
            }
        } else {
            echo "Error updating user ID in cart table: " . $con->error;
        }
    } else {
        echo "User not found or inactive.";
    }
} else {
  
    header("Location: ./checkuser.php?token=$token");
    exit();
}
?>


