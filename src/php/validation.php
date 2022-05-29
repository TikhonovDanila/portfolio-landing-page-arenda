<?php
$server = $_SERVER;

if ($server['REQUEST_METHOD'] === "POST"){
    $post = $_POST;
}
$name = $post['name'];
$email = $post['email'];
$tel = $post['tel'];
$msg = $post['msg'];
function clean($value = ""){
    // использовали ф-ию trim для удаления пробелов из начала и конца строки.
    $value = trim($value);
    // stripcslashes нужна для удаления экранированных символов
    $value = stripcslashes($value);
    // Ф-ия strip_tags нужна для удаления HTML и PHP тегов
    $value = strip_tags($value);
    // htmlspecialchars преобразует специальные символы в
    // HTML-сущности ('&' преобразуется в '&amp;' и т.д.)
    $value = htmlspecialchars($value);

    return $value;
}
$name = clean($name);
$email = clean($email);
$tel = clean($tel);
$msg = clean($msg);
$adress = "arendahoover@yandex.ru";
$msg = "Сообщение : $msg,\r\nИмя пользователя: $name\r\nКонтактный телефон: $tel";
$subject = "=?utf-8?B?".base64_encode("Сообщение с сайта ArendaHoover")."?=";

$success = mail($adress, $subject, $msg);

?>
