


<?php
    session_start();
    
    $otp = $_POST['otp'];

   
    $sessionotp = $_SESSION['otp']; 
    
    
    if ($otp == $sessionotp) {
       
       
        
        echo json_encode(array("status" => "success"));
    } else {
       
        
   
        echo json_encode(array("status" => "error"));
    }
?>


