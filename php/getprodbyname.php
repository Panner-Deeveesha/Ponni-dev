<?php
    include "config.php";
    $name = $_POST["name"];
    $sql = "SELECT name,category,uniqueId,unit,volume FROM products WHERE name LIKE '%$name%' AND isActive='1'";
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