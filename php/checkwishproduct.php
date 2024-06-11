<?php
include "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(isset($_POST['userid']) && isset($_POST['productname'])) {
        $id = $_POST['userid'];
        $productname = $_POST['productname'];

        // Corrected SQL query
        $checkSql = "SELECT productName, userId, isActive FROM wish_list WHERE userId = '$id' AND productName = '$productname' AND isActive = 1";
        
        // Execute the query
        $result = mysqli_query($con, $checkSql);

        // Check if the query was successful
        if ($result) {
            // Check if any rows were returned
            if (mysqli_num_rows($result) > 0) {
                echo "1"; // Combination exists
            } else {
                echo "0"; // Combination does not exist
            }
        } else {
            echo "Error: " . mysqli_error($con); // Output error message
        }
    } 
    else {
        echo "Error: Missing parameters";
    }
    
    // Close database connection
    mysqli_close($con);
}
?>
