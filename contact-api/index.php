<?php
require 'flight/Flight.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: OLDTOKEN, ConsumerKey, ConsumerSecret, Content-Type, Content-Range, Content-Disposition, Content-Description, Auth, X-Requested-With');

$dbName = 'contact_db';
$dbUsername = 'root';
$dbPass = '';

global $db;

try{
    $db = new PDO("mysql:host=localhost; dbname=contact_db", $dbUsername, $dbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
}
catch(PDOException $e){
    die("Contact with system administrator.");
}

Flight::route('/', function(){
   global $db;

   $sql = $db->query('SELECT * FROM contacts ORDER BY created_at DESC');

   $data = $sql->rowCount() > 0 ? $sql->fetchAll(PDO::FETCH_ASSOC) : [];

   Flight::json($data);
});
Flight::route('/search/@keyword', function($keyword){
    global $db;

    $keyword = '%'.$keyword.'%';

    $sql = $db->prepare("SELECT * FROM contacts WHERE name LIKE ? OR phone LIKE ? ORDER BY created_at DESC");
    $sql->execute([$keyword, $keyword]);

    $data = $sql->rowCount() > 0 ? $sql->fetchAll(PDO::FETCH_ASSOC) : [];

    Flight::json($data);
});

Flight::route('POST /create', function(){
    global $db;

    $response = [
        'success' => false,
        'errors' => [],
    ];

    $arg = Flight::request()->data;

    $name = isset($arg['name']) ? strip_tags($arg['name']) : '';
    $phone = isset($arg['phone']) ? strip_tags($arg['phone']) : '';

    if(empty($name))
        $response['errors'][] = 'Ad Soyad alanı boş geçilemez.';
    elseif(mb_strlen($name) < 3)
        $response['errors'][] = 'Ad Soyad en az 3 karakter uzunluğunda olmalıdır.';

    if(empty($phone))
        $response['errors'][] = 'Telefon numarası alanı boş geçilemez.';
    elseif(mb_strlen($phone) != 10)
        $response['errors'][] = 'Telefon numarası geçersiz. (5XX XXX XX XX)';

    if(count($response['errors']) <= 0){
        $sql = $db->prepare("INSERT INTO contacts(name, phone, created_at) VALUES(?,?,NOW())");
        $sql->execute([$name, $phone]);

        $response['success'] = true;
        $response['message'] = 'Başarıyla eklendi. 🥰';
        $response['data'] = [
            'id' => $db->lastInsertId(),
            'name' => $name,
            'phone' => $phone,
            'created_at' => date('Y-m-d H:i:s')
        ];
    }

    Flight::json($response);
});
Flight::route('POST /update', function(){
    global $db;

    $response = [
        'success' => false,
        'errors' => [],
    ];

    $arg = Flight::request()->data;

    $id = isset($arg['id']) ? strip_tags($arg['id']) : '';
    $name = isset($arg['name']) ? strip_tags($arg['name']) : '';
    $phone = isset($arg['phone']) ? strip_tags($arg['phone']) : '';

    if(empty($id))
        $response['errors'][] = '"id" değeri gönderilmedi.';
    else{
        $check = $db->prepare("SELECT id FROM contacts WHERE id = ? LIMIT 1");
        $check->execute([$id]);
        if($check->rowCount() == 0)
            $response['errors'][] = 'Böyle bir kayıt bulunamadı.';
    }

    if(empty($name))
        $response['errors'][] = 'Ad Soyad alanı boş geçilemez.';
    elseif(mb_strlen($name) < 3)
        $response['errors'][] = 'Ad Soyad en az 3 karakter uzunluğunda olmalıdır.';

    if(count($response['errors']) <= 0){
        $sql = $db->prepare("UPDATE contacts SET name = ?, phone = ? WHERE id = ? LIMIT 1");
        $sql->execute([$name, $phone, $id]);

        $response['success'] = true;
        $response['message'] = 'Kayıt başarıyla güncellendi.';
        $response['data'] = [
            'id' => $id,
            'name' => $name,
            'phone' => $phone
        ];
    }

    Flight::json($response);
});
Flight::route('POST /delete', function(){
    global $db;

    $response = [
        'success' => false,
        'errors' => [],
    ];

    $arg = Flight::request()->data;

    $id = isset($arg['id']) ? strip_tags($arg['id']) : 0;

    if(empty($id))
        $response['errors'][] = '"id" değeri gönderilmedi.';
    else{
        $check = $db->prepare("SELECT id FROM contacts WHERE id = ? LIMIT 1");
        $check->execute([$id]);
        if($check->rowCount() == 0)
            $response['errors'][] = 'Böyle bir kayıt bulunamadı.';
    }

    if(count($response['errors']) <= 0){
        $delete = $db->prepare("DELETE FROM contacts WHERE id = ? LIMIT 1");
        $delete->execute([$id]);

        $response['success'] = true;
        $response['message'] = 'Kayıt başarıyla silindi.';

        $sql = $db->query('SELECT * FROM contacts ORDER BY created_at DESC');
        $response['data'] = $sql->rowCount() > 0 ? $sql->fetchAll(PDO::FETCH_ASSOC) : [];
    }

    Flight::json($response);
});
Flight::route('POST /delete-all', function(){
   global $db;

   $response = [
       'success' => false,
       'errors' => [],
   ];

   $checkSql = $db->query("SELECT id FROM contacts LIMIT 1");
   if($checkSql->rowCount() == 0)
       $response['errors'][] = 'Silinecek herhangi bir kayıt bulunamadı. 😡';

   if(count($response['errors']) <= 0){
       $db->query("DELETE FROM contacts");

       $response['success'] = true;
       $response['message'] = 'Tüm kayıtlar silindi. 🥰';
   }

   Flight::json($response);
});

Flight::start();
