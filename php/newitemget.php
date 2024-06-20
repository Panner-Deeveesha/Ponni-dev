<?php
include "config.php"; // Assuming this file contains database connection details and $con (mysqli connection)

// Calculate the date 7 days ago from today
$sevenDaysAgo = date('Y-m-d', strtotime('-7 days'));

// Sanitize the date (optional, but good practice)
$sevenDaysAgo = $con->real_escape_string($sevenDaysAgo);

// Initialize an empty array to store response
$response = array();

// SQL query to fetch dates of products inserted in the last 7 days
$sql = "SELECT productName,unit,volume,productId,imgPath_1,imgPath_2,date FROM products WHERE date >= '$sevenDaysAgo'";

// Execute the query
$result = $con->query($sql);

if ($result === false) {
    die('Error executing query: ' . $con->error);
}

// Check if there are rows in the result set
if ($result->num_rows > 0) {
    // Fetch dates and add them to $response array
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
} else {
    $response = "null";
}

// Close connection
$con->close();

// Output JSON response
echo json_encode($response);
?>
