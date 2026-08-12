<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'buildflow_user');
define('DB_PASS', 'your_password_here');
define('DB_NAME', 'buildflow_erp');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to UTF-8
$conn->set_charset("utf8mb4");

// Set timezone
date_default_timezone_set('Asia/Kolkata');
?>
