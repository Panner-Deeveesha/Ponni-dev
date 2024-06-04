
<?php
    include "config.php";
    $ip = $con->real_escape_string($_POST['ip']);
    $sql = "SELECT count ,productId FROM cart  WHERE ipAddress='$ip' AND isActive=1";

    $res = $con->query($sql);

    if($res->num_rows>0){
        while($row=$res->fetch_assoc()){
            $response[] = $row;
			//echo json_encode($response);
        }
        echo json_encode($response);
		
    }
   
    
?>