<?php
require_once 'config/session.php';
require_once 'config/database.php';

requireLogin();

// Get dashboard stats
$stats = [];

// Total Projects
$result = $conn->query("SELECT COUNT(*) as count FROM projects");
$stats['total_projects'] = $result->fetch_assoc()['count'];

// Completed Projects
$result = $conn->query("SELECT COUNT(*) as count FROM projects WHERE status = 'completed'");
$stats['completed'] = $result->fetch_assoc()['count'];

// Running Projects
$result = $conn->query("SELECT COUNT(*) as count FROM projects WHERE status = 'running'");
$stats['running'] = $result->fetch_assoc()['count'];

// Upcoming Projects
$result = $conn->query("SELECT COUNT(*) as count FROM projects WHERE status = 'upcoming'");
$stats['upcoming'] = $result->fetch_assoc()['count'];

// Total Clients
$result = $conn->query("SELECT COUNT(*) as count FROM clients");
$stats['total_clients'] = $result->fetch_assoc()['count'];

// Monthly Revenue
$result = $conn->query("SELECT SUM(amount) as total FROM invoices WHERE MONTH(created_at) = MONTH(NOW()) AND status = 'paid'");
$stats['monthly_revenue'] = $result->fetch_assoc()['total'] ?? 0;

// Total Expenses
$result = $conn->query("SELECT SUM(amount) as total FROM expenses WHERE MONTH(created_at) = MONTH(NOW())");
$stats['total_expenses'] = $result->fetch_assoc()['total'] ?? 0;

// Average Project Budget
$result = $conn->query("SELECT AVG(budget) as avg FROM projects WHERE status IN ('completed', 'running')");
$stats['avg_budget'] = $result->fetch_assoc()['avg'] ?? 0;

// Recent Projects
$recent_projects = [];
$result = $conn->query("SELECT id, name, client_name, status, progress, budget FROM projects ORDER BY created_at DESC LIMIT 5");
while ($row = $result->fetch_assoc()) {
    $recent_projects[] = $row;
}

// Recent Activities
$recent_activities = [];
$result = $conn->query("SELECT action, details, created_at FROM activity_log ORDER BY created_at DESC LIMIT 8");
while ($row = $result->fetch_assoc()) {
    $recent_activities[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - BuildFlow ERP</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        .chart-container {
            height: 300px;
            margin-top: 20px;
            position: relative;
        }

        .stat-card {
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(6, 182, 212, 0.08));
            border: 1px solid rgba(37, 99, 235, 0.2);
            border-radius: 12px;
            padding: 24px;
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.15);
            border-color: rgba(37, 99, 235, 0.4);
        }

        .stat-icon {
            font-size: 2.5rem;
            margin-bottom: 12px;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: #2563EB;
            margin: 8px 0;
        }

        .stat-label {
            color: #666;
            font-size: 0.9rem;
            font-weight: 500;
        }

        @media (prefers-color-scheme: dark) {
            .stat-label { color: #999; }
        }

        .project-card {
            border-left: 4px solid #2563EB;
            padding: 16px;
            margin-bottom: 12px;
            border-radius: 8px;
            background: rgba(37, 99, 235, 0.03);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .project-card:hover {
            background: rgba(37, 99, 235, 0.08);
            padding-left: 20px;
        }

        .project-name {
            font-weight: 600;
            color: #2563EB;
            margin-bottom: 4px;
        }

        .project-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            color: #999;
            margin-top: 8px;
        }

        .progress-bar {
            width: 100%;
            height: 6px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 3px;
            overflow: hidden;
            margin-top: 8px;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #2563EB, #06B6D4);
            transition: width 0.3s ease;
        }

        .activity-item {
            display: flex;
            gap: 12px;
            padding: 12px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        @media (prefers-color-scheme: dark) {
            .activity-item {
                border-bottom-color: rgba(255, 255, 255, 0.05);
            }
        }

        .activity-item:last-child {
            border-bottom: none;
        }

        .activity-icon {
            font-size: 1.5rem;
            min-width: 30px;
            text-align: center;
        }

        .activity-text {
            flex: 1;
        }

        .activity-action {
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
        }

        @media (prefers-color-scheme: dark) {
            .activity-action {
                color: #e0e0e0;
            }
        }

        .activity-time {
            font-size: 0.85rem;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <!-- Sidebar -->
        <?php include 'includes/sidebar.php'; ?>

        <!-- Main Content -->
        <div class="main-content">
            <!-- Top Bar -->
            <div class="top-bar">
                <div class="top-bar-title">
                    <h2>Dashboard</h2>
                </div>
                <div class="top-bar-actions">
                    <button class="btn btn-secondary btn-sm" onclick="location.href='logout.php'">
                        Logout
                    </button>
                </div>
            </div>

            <!-- Welcome Section -->
            <div class="card" style="margin-bottom: 30px; background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(6, 182, 212, 0.1));">
                <h3>Welcome, <?php echo htmlspecialchars($_SESSION['admin_username']); ?>! 👋</h3>
                <p style="margin-top: 8px; color: #666;">Here's an overview of your construction projects and business metrics.</p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-4" style="margin-bottom: 40px;">
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-value"><?php echo $stats['total_projects']; ?></div>
                    <div class="stat-label">Total Projects</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value"><?php echo $stats['completed']; ?></div>
                    <div class="stat-label">Completed</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">⚙️</div>
                    <div class="stat-value"><?php echo $stats['running']; ?></div>
                    <div class="stat-label">Running</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">📅</div>
                    <div class="stat-value"><?php echo $stats['upcoming']; ?></div>
                    <div class="stat-label">Upcoming</div>
                </div>
            </div>

            <!-- Financial Stats -->
            <div class="grid grid-3" style="margin-bottom: 40px;">
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-value">₹<?php echo number_format($stats['monthly_revenue'], 0); ?></div>
                    <div class="stat-label">Monthly Revenue</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">💸</div>
                    <div class="stat-value">₹<?php echo number_format($stats['total_expenses'], 0); ?></div>
                    <div class="stat-label">Total Expenses</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-value"><?php echo $stats['total_clients']; ?></div>
                    <div class="stat-label">Total Clients</div>
                </div>
            </div>

            <!-- Recent Projects & Activities -->
            <div class="grid grid-2">
                <!-- Recent Projects -->
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3>Recent Projects</h3>
                        <a href="projects/" class="btn btn-primary btn-sm">View All</a>
                    </div>

                    <div>
                        <?php if (count($recent_projects) > 0): ?>
                            <?php foreach ($recent_projects as $project): ?>
                                <div class="project-card" onclick="location.href='projects/?id=<?php echo $project['id']; ?>'">
                                    <div class="project-name"><?php echo htmlspecialchars($project['name']); ?></div>
                                    <div class="project-meta">
                                        <span><?php echo htmlspecialchars($project['client_name']); ?></span>
                                        <span class="badge badge-<?php echo $project['status']; ?>">
                                            <?php echo ucfirst($project['status']); ?>
                                        </span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: <?php echo $project['progress']; ?>%;"></div>
                                    </div>
                                    <div class="project-meta" style="margin-top: 8px;">
                                        <span>₹<?php echo number_format($project['budget'], 0); ?></span>
                                        <span><?php echo $project['progress']; ?>% Complete</span>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <p style="color: #999; text-align: center; padding: 30px 0;">No projects yet. <a href="projects/" style="color: #2563EB; text-decoration: none;">Create one now</a></p>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Recent Activities -->
                <div class="card">
                    <h3 style="margin-bottom: 20px;">Recent Activities</h3>

                    <div>
                        <?php if (count($recent_activities) > 0): ?>
                            <?php foreach ($recent_activities as $activity): ?>
                                <div class="activity-item">
                                    <div class="activity-icon">📌</div>
                                    <div class="activity-text">
                                        <div class="activity-action"><?php echo htmlspecialchars($activity['action']); ?></div>
                                        <div class="activity-time"><?php echo date('M d, Y H:i', strtotime($activity['created_at'])); ?></div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <p style="color: #999; text-align: center; padding: 30px 0;">No recent activities</p>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/main.js"></script>
</body>
</html>
