<?php
    include "config.php";
		 $sql = "SELECT productName,productId,unit,volume FROM products WHERE isActive=1 ORDER BY productId DESC LIMIT 10";
		//$sql = "SELECT name,address,gender,dob,mobile_number,whatsapp_number,email_address,school_name,hsc_passedout,district FROM //applicants";
    $res = $con->query($sql);

    if($res->num_rows>0){
        while($row=$res->fetch_assoc()){
            $response[] = $row;
			//echo json_encode($response);
        }
        echo json_encode($response);
		
    }
	
?>

