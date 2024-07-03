
<?php
session_start();


function generateOTP($length = 4) {
   
    $otp = "";
    for ($i = 0; $i < $length; $i++) {
        $otp .= mt_rand(0, 9);
    }
    return $otp;
}


$otp = generateOTP();

// Store OTP in session
$_SESSION['otp'] = $otp;


require __DIR__ . '/twilio-php-main/src/Twilio/autoload.php';

// Your Account SID and Auth Token from console.twilio.com
$sid = "";
$token = "";
$client = new Twilio\Rest\Client($sid, $token);
$number = $_POST['phonenum'];
// Use the Client to make requests to the Twilio REST API
if (isset($_POST['phonenum'])) {
    $number = $_POST['phonenum'];
  
    // Validate or sanitize $number as needed

    try {
        // Use the Client to send a message
        $message = $client->messages->create(
            // The number you'd like to send the message to (in E.164 format)
            '+91'.$number,
            [
                // A Twilio phone number you purchased at https://www.twilio.com/console
                'from' => '',
                // The body of the text message you'd like to send
                'body' => $otp
            ]
        );

        // Output a success message
        echo "success";
    } catch (Exception $e) {
        // Handle exceptions
        echo 'Error: ' . $e->getMessage();
    }
} 
else {
    // Handle case where $_POST['phonenum'] is not set
    echo "Phone number is required.";
    echo $number;
}
?>