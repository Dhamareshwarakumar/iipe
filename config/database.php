<?php

// $DB_HOST = "localhost";
// $DB_USER = "root";
// $DB_PASSWORD = "password";
// $DB_NAME = "iipe";

$DB_HOST = "gmritw.hosting.acm.org";
$DB_USER = "gmritwhosting_iipe";
$DB_PASSWORD = "Iipe@123";
$DB_NAME = "gmritwhosting_iipe";

$conn = mysqli_connect($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME);

if (!$conn) {
    die("DB Connection failed: " . mysqli_connect_error());
}