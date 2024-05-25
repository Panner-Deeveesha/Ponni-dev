<?php
    include "config.php";
    $category = $_POST["categroy"];
		 $sql = "SELECT productName,productId,unit,volume,imgPath_1,imgPath_2 FROM products WHERE category='$category' AND isActive='1'";
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

