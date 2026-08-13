<?php
require_once '../config/session.php';
require_once '../config/database.php';

requireLogin();

// Get all materials
$materials = [];
$result = $conn->query("SELECT m.*, p.name as project_name FROM materials m
                       LEFT JOIN projects p ON m.project_id = p.id
                       ORDER BY m.created_at DESC");
while ($row = $result->fetch_assoc()) {
    $materials[] = $row;
}

// Get total material cost
$result = $conn->query("SELECT SUM(cost * quantity) as total_cost FROM materials");
$total_cost = $result->fetch_assoc()['total_cost'] ?? 0;

// Get total quantity
$result = $conn->query("SELECT SUM(quantity) as total_qty FROM materials");
$total_qty = $result->fetch_assoc()['total_qty'] ?? 0;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Materials - BuildFlow ERP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <style>
        .material-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 16px;
            padding: 16px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            margin-bottom: 12px;
            border-left: 4px solid #F59E0B;
            align-items: center;
        }

        @media (prefers-color-scheme: dark) {
            .material-row {
                background: rgba(15, 23, 42, 0.5);
            }
        }

        @media (max-width: 768px) {
            .material-row { grid-template-columns: 1fr 1fr; }
        }

        .stat-card {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
            border: 1px solid rgba(245, 158, 11, 0.2);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: #F59E0B;
            margin: 8px 0;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <?php include '../includes/sidebar.php'; ?>

        <div class="main-content">
            <div class="top-bar">
                <div class="top-bar-title">
                    <h2>Materials Management</h2>
                </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-3" style="margin-bottom: 30px;">
                <div class="stat-card">
                    <div style="font-size: 2rem; margin-bottom: 10px;">📦</div>
                    <div class="stat-value"><?php echo count($materials); ?></div>
                    <div style="color: #999; font-size: 0.9rem;">Total Materials</div>
                </div>
                <div class="stat-card">
                    <div style="font-size: 2rem; margin-bottom: 10px;">⚖️</div>
                    <div class="stat-value"><?php echo number_format($total_qty, 0); ?></div>
                    <div style="color: #999; font-size: 0.9rem;">Total Quantity</div>
                </div>
                <div class="stat-card">
                    <div style="font-size: 2rem; margin-bottom: 10px;">💰</div>
                    <div class="stat-value">₹<?php echo number_format($total_cost, 0); ?></div>
                    <div style="color: #999; font-size: 0.9rem;">Total Cost</div>
                </div>
            </div>

            <!-- Materials List -->
            <div class="card">
                <h3 style="margin-bottom: 20px;">All Materials</h3>

                <?php if (count($materials) > 0): ?>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Material Name</th>
                                    <th>Project</th>
                                    <th>Quantity</th>
                                    <th>Supplier</th>
                                    <th>Unit Cost</th>
                                    <th>Total Cost</th>
                                    <th>Purchase Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($materials as $material): ?>
                                    <tr>
                                        <td><strong><?php echo htmlspecialchars($material['name']); ?></strong></td>
                                        <td><?php echo htmlspecialchars($material['project_name'] ?? 'N/A'); ?></td>
                                        <td><?php echo $material['quantity'] . ' ' . htmlspecialchars($material['unit']); ?></td>
                                        <td><?php echo htmlspecialchars($material['supplier'] ?? 'N/A'); ?></td>
                                        <td>₹<?php echo number_format($material['cost'], 2); ?></td>
                                        <td><strong>₹<?php echo number_format($material['cost'] * $material['quantity'], 2); ?></strong></td>
                                        <td><?php echo date('d M Y', strtotime($material['purchase_date'])); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else: ?>
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <p style="font-size: 3rem; margin-bottom: 20px;">📦</p>
                        <p>No materials yet. <a href="/projects/" style="color: #F59E0B; text-decoration: none;">Add materials to your projects</a></p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</body>
</html>
