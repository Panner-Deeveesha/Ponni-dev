<?php
    include "config.php";
    $email = $_POST["email"];
    $password = $_POST["password"];
		 $sql = "SELECT emailId,userPassword FROM users WHERE emailId='$email' AND userPassword='$password'";
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