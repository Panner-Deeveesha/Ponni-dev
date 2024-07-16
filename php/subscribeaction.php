<?php
if( ! $_POST ) exit;


if ( ! defined( "PHP_EOL" ) ) define( "PHP_EOL", "\r\n" );

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
$emailInput     = $_POST['emailInput']; 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'phpmailer\Exception.php';
require 'phpmailer\PHPMailer.php';
require 'phpmailer\SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'amarajk27@gmail.com';                     //SMTP username
    $mail->Password   = 'ofgnfthytusmrnys';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
	
    //Recipients
    $mail->setFrom('amarajk27@gmail.com', 'Contact form');
    $mail->addAddress('amaradharanisss@gmail.com', 'dharani amara');     //Add a recipient
    

   // $e_body = "You have been contacted by $name with regards, their additional message is as follows." . PHP_EOL . PHP_EOL;
   // $e_content = "\"$description\"" . PHP_EOL . PHP_EOL;
   // $e_reply = "You can contact $name via phone, $phone";
    
  

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = "$emailInput has contacted you via Your Website.".PHP_EOL;
    //$mail->Body    = $name. PHP_EOL. $phone. PHP_EOL.$description. PHP_EOL;
    $mail->Body    = "<br>Email : $emailInput".PHP_EOL;
    

    $mail->send();
    $message = "Email Sent Successfully, your message has been submitted to us.";
    echo "<script type='text/javascript'>alert('$message');window.location.href='contact.html';</script>";
} catch (Exception $e) {
    $message = "ERROR! Email Sent Unsuccessfull.";
    echo "<script type='text/javascript'>alert('$message');window.location.href='contact.html';</script>";
}
?>