<?php
// TEMPORARY diagnostic page. Visit https://your-domain/debug.php then DELETE this file.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h2>BuildFlow ERP - Diagnostics</h2>";
echo "PHP version: <b>" . phpversion() . "</b><br>";
echo "Testing database connection...<br>";

require_once __DIR__ . '/config/database.php';

echo "✅ <b>Database connected successfully!</b><br>";

$res = $conn->query("SHOW TABLES");
$count = $res ? $res->num_rows : 0;
echo "Tables in database: <b>$count</b> (should be 10 after importing schema.sql)<br>";

if ($res) {
    echo "<ul>";
    while ($row = $res->fetch_array()) {
        echo "<li>" . htmlspecialchars($row[0]) . "</li>";
    }
    echo "</ul>";
}

echo "<hr>If you see this, PHP + database both work. Now DELETE debug.php.";
