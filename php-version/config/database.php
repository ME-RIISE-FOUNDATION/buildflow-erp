<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'u822639105_admin');
define('DB_PASS', 'Kishor@2426');
define('DB_NAME', 'u822639105_buildflow');

// PHP 8 throws an exception on a failed connection (which shows as a blank 500).
// Turn that off so we can show a readable message instead.
mysqli_report(MYSQLI_REPORT_OFF);

// Create connection
$conn = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error
        . "<br>Check DB_USER / DB_PASS / DB_NAME in config/database.php.");
}

// Set charset to UTF-8
$conn->set_charset("utf8mb4");

// Set timezone
date_default_timezone_set('Asia/Kolkata');
?>
