<?php
    include "config.php";
    $email = $_POST["email"];
    $password = $_POST["password"];
    $sql = "SELECT id,emailId,userPassword FROM users WHERE emailId='$email' AND userPassword='$password'";
    $res = $con->query($sql);
    
    
     
    if($res->num_rows>0){
        while($row=$res->fetch_assoc()){
            date_default_timezone_set('Asia/Kolkata');
            $currentdate= date("dmy");
           $currenttime=date("his");
          $randomNumber = rand(1, 5000);
           // echo "ID: ".$row["id"];
           $arrvalue = array("g", "o", "q","t","k","l","b","c","z","h"); 
           $fullvalue = "";
           
            $numvalue=$row["id"];
            $stringlength=strlen($numvalue);
            for($i=0;$i<$stringlength;$i++){
               $singlevalue =substr($numvalue, $i, 1);
               $fullvalue .= $arrvalue[$singlevalue];
            }
            
          
            $response[] = $row;   
            
            $tokenid=$fullvalue.strval($currentdate).$randomNumber.strval($currenttime);
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