<?php
    include "config.php";
    $token = $_POST["token"];
		 $sql = "SELECT id FROM users WHERE token='$token' AND isActive='1'";
    $res = $con->query($sql);

    if($res->num_rows>0){
        while($row=$res->fetch_assoc()){
            $response[] = $row;
			//echo json_encode($response);
        }
        echo json_encode($response);
		
    }else{
        echo "no record";
    }
	
?>

