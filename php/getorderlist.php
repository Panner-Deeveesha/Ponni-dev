<?php
    include "config.php";
    $userid = $_POST["userid"];
	$sql = "SELECT productId FROM cart WHERE userId='$userid' AND paid='yes'";
    $res = $con->query($sql);

    if($res->num_rows>0){
        while($row=$res->fetch_assoc()){
            $response[] = $row;
			//echo json_encode($response);
        }
        echo json_encode($response);
		
    }else{
        echo "no userId found for specific token";
    }
	
?>

