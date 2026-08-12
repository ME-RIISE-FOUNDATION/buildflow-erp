<?php
require_once '../config/session.php';
require_once '../config/database.php';

requireLogin();

// Get upcoming projects
$upcoming = [];
$result = $conn->query("SELECT id, name, client_name, start_date, end_date, status
                       FROM projects
                       WHERE status IN ('running', 'upcoming')
                       ORDER BY start_date ASC LIMIT 10");
while ($row = $result->fetch_assoc()) {
    $upcoming[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar - BuildFlow ERP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <style>
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
            margin: 20px 0;
        }

        .calendar-day {
            aspect-ratio: 1;
            background: rgba(37, 99, 235, 0.05);
            border: 1px solid rgba(37, 99, 235, 0.2);
            border-radius: 8px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .calendar-day:hover {
            background: rgba(37, 99, 235, 0.15);
            transform: scale(1.05);
        }

        .calendar-day.today {
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(6, 182, 212, 0.1));
            border-color: #2563EB;
            font-weight: 600;
        }

        .calendar-header {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }

        .calendar-header-day {
            text-align: center;
            font-weight: 600;
            color: #2563EB;
            padding: 10px;
        }

        .event-item {
            padding: 16px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            margin-bottom: 12px;
            border-left: 4px solid #2563EB;
        }

        @media (prefers-color-scheme: dark) {
            .event-item {
                background: rgba(15, 23, 42, 0.5);
            }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <?php include '../includes/sidebar.php'; ?>

        <div class="main-content">
            <div class="top-bar">
                <div class="top-bar-title">
                    <h2>Calendar & Tasks</h2>
                </div>
            </div>

            <div class="grid grid-2" style="margin-bottom: 30px;">
                <!-- Calendar -->
                <div class="card">
                    <h3 style="margin-bottom: 20px;">📅 <?php echo date('F Y'); ?></h3>

                    <div class="calendar-header">
                        <div class="calendar-header-day">Sun</div>
                        <div class="calendar-header-day">Mon</div>
                        <div class="calendar-header-day">Tue</div>
                        <div class="calendar-header-day">Wed</div>
                        <div class="calendar-header-day">Thu</div>
                        <div class="calendar-header-day">Fri</div>
                        <div class="calendar-header-day">Sat</div>
                    </div>

                    <div class="calendar-grid">
                        <?php
                        $month = date('m');
                        $year = date('Y');
                        $today = date('d');
                        $first_day = date('w', strtotime("$year-$month-01"));
                        $last_day = date('t', strtotime("$year-$month-01"));

                        // Empty cells before first day
                        for ($i = 0; $i < $first_day; $i++) {
                            echo '<div class="calendar-day" style="opacity: 0.5;"></div>';
                        }

                        // Days of month
                        for ($day = 1; $day <= $last_day; $day++) {
                            $class = ($day == $today) ? 'today' : '';
                            echo '<div class="calendar-day '.$class.'">'.$day.'</div>';
                        }
                        ?>
                    </div>
                </div>

                <!-- Upcoming Events -->
                <div class="card">
                    <h3 style="margin-bottom: 20px;">📌 Upcoming Projects</h3>

                    <?php if (count($upcoming) > 0): ?>
                        <div>
                            <?php foreach ($upcoming as $project): ?>
                                <div class="event-item">
                                    <div style="font-weight: 600; color: #2563EB;"><?php echo htmlspecialchars($project['name']); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">
                                        👤 <?php echo htmlspecialchars($project['client_name']); ?>
                                    </div>
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; font-size: 0.85rem;">
                                        <div>
                                            <strong>Start:</strong><br>
                                            <?php echo $project['start_date'] ? date('d M Y', strtotime($project['start_date'])) : 'N/A'; ?>
                                        </div>
                                        <div>
                                            <strong>End:</strong><br>
                                            <?php echo $project['end_date'] ? date('d M Y', strtotime($project['end_date'])) : 'N/A'; ?>
                                        </div>
                                    </div>
                                    <div style="margin-top: 8px;">
                                        <span class="badge badge-<?php echo $project['status']; ?>">
                                            <?php echo ucfirst($project['status']); ?>
                                        </span>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php else: ?>
                        <p style="color: #999; text-align: center; padding: 30px;">No upcoming projects.</p>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="card">
                <h3 style="margin-bottom: 20px;">⚡ Quick Actions</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                    <button class="btn btn-primary" onclick="location.href='/projects/'">
                        + New Project
                    </button>
                    <button class="btn btn-primary" onclick="location.href='/clients/'">
                        + New Client
                    </button>
                    <button class="btn btn-secondary" onclick="alert('Schedule meeting feature coming soon')">
                        📞 Schedule Meeting
                    </button>
                    <button class="btn btn-secondary" onclick="alert('Site visit feature coming soon')">
                        🏗️ Schedule Site Visit
                    </button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
