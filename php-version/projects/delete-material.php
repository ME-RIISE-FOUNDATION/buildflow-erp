<?php
require_once '../config/session.php';
require_once '../config/database.php';

requireLogin();

$material_id = $_GET['id'] ?? null;
$project_id = $_GET['project_id'] ?? null;

if ($material_id && $project_id) {
    $conn->query("DELETE FROM materials WHERE id = $material_id AND project_id = $project_id");
}

header("Location: view.php?id=$project_id");
exit();
?>
