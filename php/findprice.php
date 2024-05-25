<?php
    include "config.php";
   
    $uniqueId = $_POST["productId"];
		 $sql = "SELECT price,id FROM price WHERE id='$uniqueId' AND isActive='1'";
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
