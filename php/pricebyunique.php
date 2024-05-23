<?php
    include "config.php";
    $jsonObjects = $_POST['objects']; // Get the JSON data
    $decodedObjects = json_decode($jsonObjects, true); // Decode the JSON string
    foreach ($decodedObjects as $object) {
        $id = $object['uniqueId'];
        $sql = "SELECT * FROM price WHERE id IN ('$id')";
        $res = $con->query($sql);
        if($res->num_rows>0){
            while($row=$res->fetch_assoc()){
                $response[] = $row;
                //echo json_encode($response);
            }
        }else{
            echo "no record";
        }
    }
    echo json_encode($response);
    
?>