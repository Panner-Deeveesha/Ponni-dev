<?php
    
    include "config.php";
    

    $imgpath =$_POST['path'];
    $userId=$_POST['userid'];

    $sql = "UPDATE users SET profileImage='$imgpath' WHERE id='$userId'" ;
    

    $res = $con->query($sql);
    

    if ($res) {
        if ($con->affected_rows > 0) {
            echo json_encode(["success" => "profile Image updated successfully."]);
        } else {
            echo json_encode(["error" => "No records were updated."]);
        }
    } 

    $con->close();
?>
