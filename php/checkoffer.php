<?php
    include "config.php";
    $product_id = $_POST["productId"]; 
    $sql = "SELECT expiretime FROM offers WHERE productId='$product_id' AND isActive='1'";
    $res = $con->query($sql);

    if($res->num_rows > 0){
        $expired = false; // Assume initially not expired

        while ($row = $res->fetch_assoc()) {
            $expiretime = strtotime($row['expiretime']);
            $current_date = strtotime(date('Y-m-d')); // Current date

            // Compare expiretime with current date
            if ($expiretime < $current_date) {
                $expired = true; // If any offer is expired, set $expired to true
                break; // No need to check further once we find an expired offer
            }
        }

        // Output true or false based on $expired
        echo $expired ? "true" : "false";
    } else {
        // No offers found for the given productId and isActive='1'
        echo "false";
    }
?>
