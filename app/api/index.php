<?php

$serverName = 'localhost';
$userName = 'root';
$password = '';
$dbname = 'newdb';
$dbtest = 'test';

$conn = new mysqli($serverName, $userName, $password, $dbname);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$query = mysqli_query($conn, "SELECT * FROM $dbtest");
$to_encode = array();

while($row = mysqli_fetch_assoc($query)) {
    $to_encode[] = $row;
}

$dataJSON = json_encode($to_encode);
echo $dataJSON;

?>