<?php
require_once '../config/session.php';
require_once '../config/database.php';

requireLogin();

// Get date range from query params
$start_date = $_GET['start_date'] ?? date('Y-m-d', strtotime('-30 days'));
$end_date = $_GET['end_date'] ?? date('Y-m-d');

// Get report data
$result = $conn->query("SELECT COUNT(*) as count FROM projects WHERE DATE(created_at) BETWEEN '$start_date' AND '$end_date'");
$projects_created = $result->fetch_assoc()['count'];

$result = $conn->query("SELECT COUNT(*) as count FROM projects WHERE status = 'completed' AND DATE(updated_at) BETWEEN '$start_date' AND '$end_date'");
$projects_completed = $result->fetch_assoc()['count'];

$result = $conn->query("SELECT SUM(amount) as total FROM invoices WHERE DATE(created_at) BETWEEN '$start_date' AND '$end_date' AND status = 'paid'");
$revenue_period = $result->fetch_assoc()['total'] ?? 0;

$result = $conn->query("SELECT SUM(amount) as total FROM expenses WHERE DATE(date) BETWEEN '$start_date' AND '$end_date'");
$expenses_period = $result->fetch_assoc()['total'] ?? 0;

// Get monthly data
$monthly_stats = [];
$sql = "SELECT DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total
        FROM expenses
        WHERE DATE(date) BETWEEN '$start_date' AND '$end_date'
        GROUP BY DATE_FORMAT(date, '%Y-%m')
        ORDER BY month ASC";
$result = $conn->query($sql);
while ($row = $result->fetch_assoc()) {
    $monthly_stats[] = $row;
}

// Get top projects
$top_projects = [];
$sql = "SELECT id, name, client_name, budget, progress, status
        FROM projects
        WHERE DATE(created_at) BETWEEN '$start_date' AND '$end_date'
        ORDER BY budget DESC LIMIT 5";
$result = $conn->query($sql);
while ($row = $result->fetch_assoc()) {
    $top_projects[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reports - BuildFlow ERP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <style>
        .report-stat {
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(6, 182, 212, 0.08));
            border: 1px solid rgba(37, 99, 235, 0.2);
            border-radius: 12px;
            padding: 24px;
            text-align: center;
        }

        .report-stat:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.15);
        }

        .report-stat.completed {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(34, 197, 94, 0.03));
            border-color: rgba(34, 197, 94, 0.2);
        }

        .report-stat.revenue {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(34, 197, 94, 0.03));
            border-color: rgba(34, 197, 94, 0.2);
        }

        .report-stat.expense {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.03));
            border-color: rgba(239, 68, 68, 0.2);
        }

        .stat-icon { font-size: 2.5rem; margin-bottom: 12px; }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .completed .stat-value { color: #22C55E; }
        .revenue .stat-value { color: #22C55E; }
        .expense .stat-value { color: #EF4444; }

        .stat-label {
            color: #999;
            font-size: 0.9rem;
        }

        .date-filter {
            display: grid;
            grid-template-columns: auto auto auto auto;
            gap: 12px;
            align-items: end;
            margin-bottom: 20px;
        }

        @media (max-width: 768px) {
            .date-filter { grid-template-columns: 1fr; }
        }

        .project-item {
            padding: 16px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            margin-bottom: 12px;
            border-left: 4px solid #2563EB;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 16px;
            align-items: center;
        }

        @media (prefers-color-scheme: dark) {
            .project-item {
                background: rgba(15, 23, 42, 0.5);
            }
        }

        @media (max-width: 768px) {
            .project-item { grid-template-columns: 1fr 1fr; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <?php include '../includes/sidebar.php'; ?>

        <div class="main-content">
            <div class="top-bar">
                <div class="top-bar-title">
                    <h2>Reports & Analytics</h2>
                </div>
            </div>

            <!-- Date Filter -->
            <div class="card" style="margin-bottom: 30px;">
                <form method="GET" class="date-filter">
                    <div class="form-group" style="margin: 0;">
                        <label style="margin-bottom: 4px;">From</label>
                        <input type="date" name="start_date" value="<?php echo $start_date; ?>">
                    </div>
                    <div class="form-group" style="margin: 0;">
                        <label style="margin-bottom: 4px;">To</label>
                        <input type="date" name="end_date" value="<?php echo $end_date; ?>">
                    </div>
                    <button type="submit" class="btn btn-primary">Filter</button>
                    <a href="?" class="btn btn-secondary">Reset</a>
                </form>
            </div>

            <!-- Report Period -->
            <div class="card" style="margin-bottom: 20px; padding: 12px 20px; background: rgba(6, 182, 212, 0.1); border-left: 4px solid #06B6D4;">
                <strong style="color: #06B6D4;">📅 Report Period:</strong> <?php echo date('d M Y', strtotime($start_date)); ?> to <?php echo date('d M Y', strtotime($end_date)); ?>
            </div>

            <!-- Stats -->
            <div class="grid grid-4" style="margin-bottom: 30px;">
                <div class="report-stat completed">
                    <div class="stat-icon">📊</div>
                    <div class="stat-value"><?php echo $projects_created; ?></div>
                    <div class="stat-label">Projects Created</div>
                </div>

                <div class="report-stat completed">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value"><?php echo $projects_completed; ?></div>
                    <div class="stat-label">Projects Completed</div>
                </div>

                <div class="report-stat revenue">
                    <div class="stat-icon">💰</div>
                    <div class="stat-value">₹<?php echo number_format($revenue_period, 0); ?></div>
                    <div class="stat-label">Revenue</div>
                </div>

                <div class="report-stat expense">
                    <div class="stat-icon">💸</div>
                    <div class="stat-value">₹<?php echo number_format($expenses_period, 0); ?></div>
                    <div class="stat-label">Expenses</div>
                </div>
            </div>

            <!-- Top Projects -->
            <div class="card" style="margin-bottom: 30px;">
                <h3 style="margin-bottom: 20px;">🏆 Top Projects (By Budget)</h3>

                <?php if (count($top_projects) > 0): ?>
                    <div>
                        <?php foreach ($top_projects as $project): ?>
                            <div class="project-item">
                                <div>
                                    <div style="font-weight: 600; color: #2563EB;"><?php echo htmlspecialchars($project['name']); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">
                                        👤 <?php echo htmlspecialchars($project['client_name']); ?>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: #999;">Budget</div>
                                    <div style="font-weight: 600;">₹<?php echo number_format($project['budget'], 0); ?></div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: #999;">Progress</div>
                                    <div style="font-weight: 600;"><?php echo $project['progress']; ?>%</div>
                                </div>
                                <div>
                                    <span class="badge badge-<?php echo $project['status']; ?>">
                                        <?php echo ucfirst($project['status']); ?>
                                    </span>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php else: ?>
                    <p style="color: #999; text-align: center; padding: 30px;">No projects in this period.</p>
                <?php endif; ?>
            </div>

            <!-- Export Options -->
            <div class="card">
                <h3 style="margin-bottom: 20px;">📥 Export Report</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                    <button class="btn btn-primary" onclick="alert('PDF export would generate here')">
                        📄 Download PDF
                    </button>
                    <button class="btn btn-primary" onclick="alert('Excel export would generate here')">
                        📊 Download Excel
                    </button>
                    <button class="btn btn-secondary" onclick="window.print()">
                        🖨️ Print Report
                    </button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
