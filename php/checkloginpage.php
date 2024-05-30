<?php
    include "config.php";
    $email = $_POST["email"];
    $password = $_POST["password"];
		 $sql = "SELECT id,emailId,userPassword FROM users WHERE emailId='$email' AND userPassword='$password'";
    $res = $con->query($sql);
    
     
     
    if($res->num_rows>0){
        while($row=$res->fetch_assoc()){
            date_default_timezone_set('Asia/Kolkata');
           // echo "ID: ".$row["id"];
           $currentdate= date("dmy");
           $currenttime=date("hi");
            $response[] = $row;
            $tokenid=$row["id"].strval($currentdate).strval($currenttime);
            $response["token"] =$tokenid;
           
            //echo $tokenid;
			//echo json_encode($response);
        }
        echo json_encode($response);
       
    }else{
        echo "no record";
    }
	
    
     
   // echo $tokenid;
?>