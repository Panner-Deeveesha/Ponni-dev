<?php
    include "config.php";
    $productName = $_POST["name"];
		 $sql = "SELECT productName,category,productId,unit,volume,imgPath_3,imgPath_4,imgPath_5,imgPath_6,productDescription,ingredients,shelfLife,packing,sourcedFrom,Highlight1,Highlight2,Highlight3,Highlight4 FROM products WHERE productName='$productName' AND isActive='1'";
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
