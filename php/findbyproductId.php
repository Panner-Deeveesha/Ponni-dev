
<?php
include "config.php";




$sql = "SELECT productName,productId,unit,volume,imgPath_1 FROM products WHERE isActive=1";

$res = $con->query($sql);

if($res->num_rows>0){
    while($row=$res->fetch_assoc()){
        $response[] = $row;
        //echo json_encode($response);
    }
    echo json_encode($response);
    
}

?>




