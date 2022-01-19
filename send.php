<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 
require_once '/PHPMailer/src/Exception.php';
require_once '/PHPMailer/src/PHPMailer.php';
require_once '/PHPMailer/src/SMTP.php';
 
// Для более ранних версий PHPMailer
//require_once '/PHPMailer/PHPMailerAutoload.php';
 
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
 
// Настройки SMTP
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
 
$mail->Host = 'ssl://smtp.gmail.com';
$mail->Port = 465;
$mail->Username = 'zakavtopidbir@gmail.com';
$mail->Password = 'sasha22060404';
 
// От кого
$mail->setFrom('zakavtopidbir@gmail.com', 'ALEX');		
 
// Кому
$mail->addAddress('hrinsasha@hotmail.com', 'Sasha');
 
// Тема письма
$mail->Subject = $subject;
 
// Тело письма
$body = '<p><strong>«Hello, world!» </strong></p>';
$mail->msgHTML($body);
 
// Приложение
$mail->addAttachment(__DIR__ . '/image.jpg');
 
$mail->send();