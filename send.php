<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
if($_POST){
    // Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/POP3.php';
    require 'PHPMailer/src/SMTP.php';
    require 'PHPMailer/src/Exception.php';

    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {
        //Server settings
        $mail->SMTPDebug = 2;                                 // Enable verbose debug output
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'zakavtopidbir@gmail.com';                 // SMTP username
        $mail->Password = 'sasha22060404';                           // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                                    // TCP port to connect to

        //Recipients
        $mail->setFrom('hrinsasha@gmail.com', 'Test');
        $mail->addAddress('info@minecash.ru', 'Владельцу ресурса MineCash.ru');     // Add a recipient


        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Новая заявка с сайта MineCash.ru';
        $mail->Body    = ' <html>
                    <head>
                        <title>Новая заявка с сайта</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['name'].'</p>
                        <p>Телефон: '.$_POST['phone'].'</p>                        
                        <p>Сообщение: '.$_POST['message'].'</p>                        
                    </body>
                </html>';

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
}