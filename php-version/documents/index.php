<?php
require_once '../config/session.php';
require_once '../config/database.php';

requireLogin();

// Get all documents
$documents = [];
$result = $conn->query("SELECT d.*, p.name as project_name FROM documents d
                       LEFT JOIN projects p ON d.project_id = p.id
                       ORDER BY d.uploaded_at DESC");
while ($row = $result->fetch_assoc()) {
    $documents[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documents - BuildFlow ERP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <style>
        .doc-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 100px;
            gap: 16px;
            padding: 16px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            margin-bottom: 12px;
            border-left: 4px solid #8B5CF6;
            align-items: center;
        }

        @media (prefers-color-scheme: dark) {
            .doc-row {
                background: rgba(15, 23, 42, 0.5);
            }
        }

        @media (max-width: 768px) {
            .doc-row { grid-template-columns: 1fr 1fr; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <?php include '../includes/sidebar.php'; ?>

        <div class="main-content">
            <div class="top-bar">
                <div class="top-bar-title">
                    <h2>Document Management</h2>
                </div>
            </div>

            <div class="card">
                <h3 style="margin-bottom: 20px;">📄 All Documents (<?php echo count($documents); ?>)</h3>

                <?php if (count($documents) > 0): ?>
                    <div>
                        <?php foreach ($documents as $doc): ?>
                            <div class="doc-row">
                                <div>
                                    <div style="font-weight: 600;">📄 <?php echo htmlspecialchars($doc['file_name']); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">
                                        <?php echo htmlspecialchars($doc['description'] ?? ''); ?>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: #999;">Project</div>
                                    <div style="font-weight: 600;"><?php echo htmlspecialchars($doc['project_name'] ?? 'N/A'); ?></div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: #999;">Uploaded</div>
                                    <div style="font-weight: 600;"><?php echo date('d M Y', strtotime($doc['uploaded_at'])); ?></div>
                                </div>
                                <div style="text-align: right;">
                                    <button class="btn btn-secondary btn-sm" onclick="alert('Download functionality would be here')">
                                        ⬇️ Download
                                    </button>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php else: ?>
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <p style="font-size: 3rem; margin-bottom: 20px;">📄</p>
                        <p>No documents yet. <a href="/projects/" style="color: #8B5CF6; text-decoration: none;">Upload documents to your projects</a></p>
                    </div>
                <?php endif; ?>
            </div>

            <div class="card" style="margin-top: 30px;">
                <h3 style="margin-bottom: 20px;">📋 Document Types</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="padding: 20px; background: rgba(139, 92, 246, 0.1); border-radius: 8px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">📐</div>
                        <div style="font-weight: 600;">Drawings</div>
                        <div style="font-size: 0.9rem; color: #999; margin-top: 4px;">CAD, Sketches</div>
                    </div>
                    <div style="padding: 20px; background: rgba(139, 92, 246, 0.1); border-radius: 8px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">📄</div>
                        <div style="font-weight: 600;">Invoices</div>
                        <div style="font-size: 0.9rem; color: #999; margin-top: 4px;">Bills, Receipts</div>
                    </div>
                    <div style="padding: 20px; background: rgba(139, 92, 246, 0.1); border-radius: 8px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">📋</div>
                        <div style="font-weight: 600;">Contracts</div>
                        <div style="font-size: 0.9rem; color: #999; margin-top: 4px;">Agreements</div>
                    </div>
                    <div style="padding: 20px; background: rgba(139, 92, 246, 0.1); border-radius: 8px;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">📸</div>
                        <div style="font-weight: 600;">Photos</div>
                        <div style="font-size: 0.9rem; color: #999; margin-top: 4px;">Site Images</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
