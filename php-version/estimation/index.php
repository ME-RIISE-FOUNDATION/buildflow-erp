<?php
require_once '../config/session.php';
require_once '../config/database.php';

requireLogin();

// Get all estimates
$estimates = [];
$result = $conn->query("SELECT e.*, p.name as project_name FROM estimates e
                       LEFT JOIN projects p ON e.project_id = p.id
                       ORDER BY e.created_at DESC");
while ($row = $result->fetch_assoc()) {
    $estimates[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Construction Estimation - BuildFlow ERP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <div class="wrapper">
        <?php include '../includes/sidebar.php'; ?>

        <div class="main-content">
            <div class="top-bar">
                <div class="top-bar-title">
                    <h2>Construction Estimation</h2>
                </div>
            </div>

            <div class="card">
                <h3 style="margin-bottom: 20px;">📐 Project Estimations</h3>

                <?php if (count($estimates) > 0): ?>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Estimate #</th>
                                    <th>Project</th>
                                    <th>Foundation</th>
                                    <th>Brick Work</th>
                                    <th>Electrical</th>
                                    <th>Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($estimates as $est): ?>
                                    <tr>
                                        <td><strong><?php echo htmlspecialchars($est['estimate_number']); ?></strong></td>
                                        <td><?php echo htmlspecialchars($est['project_name'] ?? 'N/A'); ?></td>
                                        <td>₹<?php echo number_format($est['foundation_cost'], 2); ?></td>
                                        <td>₹<?php echo number_format($est['brick_work_cost'], 2); ?></td>
                                        <td>₹<?php echo number_format($est['electrical_cost'], 2); ?></td>
                                        <td><strong>₹<?php echo number_format($est['total_cost'], 2); ?></strong></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else: ?>
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <p style="font-size: 3rem; margin-bottom: 20px;">📐</p>
                        <p>No estimates yet. <a href="/projects/" style="color: #2563EB; text-decoration: none;">Create a project to generate estimates</a></p>
                    </div>
                <?php endif; ?>
            </div>

            <div class="card" style="margin-top: 30px;">
                <h3 style="margin-bottom: 20px;">💡 Estimation Components</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;">✓ Foundation & Excavation</li>
                    <li style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;">✓ Concrete & Flooring</li>
                    <li style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;">✓ Brick Work & Plastering</li>
                    <li style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;">✓ Electrical Installation</li>
                    <li style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;">✓ Plumbing & Sanitary</li>
                    <li style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;">✓ Painting & Finishing</li>
                    <li style="padding: 12px 0;">✓ Material & Labour Cost Calculation</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
