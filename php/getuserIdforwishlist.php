<?php
    include "config.php";
    $userId = $_POST["userId"];
	$sql = "SELECT userId,productName FROM wish_list WHERE userId='$userId' AND isActive='1'";
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

