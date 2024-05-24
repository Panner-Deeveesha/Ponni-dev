<?php
    include "config.php";
    $name = $_POST["productName"];
    $sql = "SELECT productName,productId,unit,volume FROM products WHERE productName='$name' AND isActive='1'";
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
