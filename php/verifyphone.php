

<?php
    include "config.php";
    $phonenum= $_POST['phonenum'];
  
    $sql = "SELECT contactNo  FROM users WHERE contactNo='$phonenum' AND isActive='1' ";
    $res = $con->query($sql);

    if($res->num_rows>0){
        while($row=$res->fetch_assoc()){
            $response[] = $row;
			echo("false");
        }
     	
    }
    else{
        echo("true");
    }
   
    
?>
