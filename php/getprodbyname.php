<?php
    include "config.php";
    $name = $_POST["name"];
    $sql = "SELECT productName,category,productId,unit,volume,imgPath_1 FROM products where productName LIKE '%$name%' AND isActive='1'";
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