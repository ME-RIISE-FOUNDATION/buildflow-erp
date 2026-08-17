<?php
// BuildFlow ERP - shared data sync endpoint.
// Stores the whole app state (projects/materials/expenses...) as ONE JSON blob
// in MySQL, so your data is shared across all your devices.
//
// GET  /state.php            -> returns the saved JSON (or {} if none yet)
// POST /state.php (X-Auth)   -> saves the JSON body

// ---- Database credentials (must match your Hostinger MySQL) ----
$DB_HOST = 'localhost';
$DB_USER = 'u822639105_admin';
$DB_PASS = 'Kishor@2426';
$DB_NAME = 'u822639105_buildflow';

// ---- Secret required to WRITE (change this to your own random string,
//      and change the matching value in the app store) ----
$AUTH_TOKEN = 'buildflow-secret-8f3k2';

// ---- CORS (so a local dev server can talk to it too) ----
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, X-Auth');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }

header('Content-Type: application/json');

mysqli_report(MYSQLI_REPORT_OFF);
$conn = @new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed: ' . $conn->connect_error]);
    exit;
}
$conn->set_charset('utf8mb4');

// Storage table (auto-created, holds a single row id=1)
$conn->query("CREATE TABLE IF NOT EXISTS app_state (
    id INT PRIMARY KEY,
    data LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)");

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $res = $conn->query("SELECT data FROM app_state WHERE id = 1");
    if ($res && ($row = $res->fetch_assoc()) && $row['data'] !== null && $row['data'] !== '') {
        echo $row['data'];
    } else {
        echo '{}'; // no data yet -> app falls back to its defaults
    }
    exit;
}

if ($method === 'POST') {
    $token = $_SERVER['HTTP_X_AUTH'] ?? '';
    if (!hash_equals($AUTH_TOKEN, $token)) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
    $body = file_get_contents('php://input');
    if ($body === false || $body === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Empty body']);
        exit;
    }
    json_decode($body);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }
    $stmt = $conn->prepare("INSERT INTO app_state (id, data) VALUES (1, ?)
                            ON DUPLICATE KEY UPDATE data = VALUES(data)");
    $stmt->bind_param('s', $body);
    if ($stmt->execute()) {
        echo json_encode(['ok' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Save failed: ' . $conn->error]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
