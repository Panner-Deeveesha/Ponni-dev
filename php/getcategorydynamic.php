<?php
    include "config.php";
    $sql = "SELECT DISTINCT category FROM products where isActive = '1'";

    $res = $con->query($sql);

    if($res->num_rows>0){
        while($row=$res->fetch_assoc()){
            $response[] = $row;
			//echo json_encode($response);
        }
        echo json_encode($response);
		
    }
	
?>