<?php
require_once '../config/session.php';
require_once '../config/database.php';

requireLogin();

$message = '';

// Handle ADD/UPDATE
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $conn->real_escape_string($_POST['name'] ?? '');
    $email = $conn->real_escape_string($_POST['email'] ?? '');
    $phone = $conn->real_escape_string($_POST['phone'] ?? '');
    $address = $conn->real_escape_string($_POST['address'] ?? '');
    $city = $conn->real_escape_string($_POST['city'] ?? '');
    $state = $conn->real_escape_string($_POST['state'] ?? '');
    $zip = $conn->real_escape_string($_POST['zip_code'] ?? '');

    if ($_POST['action'] == 'add') {
        $conn->query("INSERT INTO clients
                     (name, email, phone, address, city, state, zip_code)
                     VALUES
                     ('$name', '$email', '$phone', '$address', '$city', '$state', '$zip')");
        $message = 'Client added successfully!';
    }
}

// Get all clients
$clients = [];
$result = $conn->query("SELECT * FROM clients ORDER BY name ASC");
while ($row = $result->fetch_assoc()) {
    // Get project count for each client
    $proj_result = $conn->query("SELECT COUNT(*) as count FROM projects WHERE client_name = '".$conn->real_escape_string($row['name'])."'");
    $row['project_count'] = $proj_result->fetch_assoc()['count'];
    $clients[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clients - BuildFlow ERP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <style>
        .client-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 100px;
            gap: 16px;
            padding: 16px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            margin-bottom: 12px;
            border-left: 4px solid #06B6D4;
            align-items: center;
        }

        @media (prefers-color-scheme: dark) {
            .client-row {
                background: rgba(15, 23, 42, 0.5);
            }
        }

        .client-row:hover {
            background: rgba(6, 182, 212, 0.08);
            transform: translateX(5px);
        }

        .client-name {
            font-weight: 600;
            color: #06B6D4;
        }

        @media (max-width: 768px) {
            .client-row { grid-template-columns: 1fr 1fr; }
        }

        .modal { display: none; }
        .modal.active { display: flex; }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        @media (max-width: 768px) {
            .form-row { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <?php include '../includes/sidebar.php'; ?>

        <div class="main-content">
            <div class="top-bar">
                <div class="top-bar-title">
                    <h2>Clients</h2>
                </div>
                <button class="btn btn-primary" onclick="openModal('clientModal')">+ New Client</button>
            </div>

            <?php if ($message): ?>
                <div class="card" style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22C55E; margin-bottom: 20px;">
                    <strong style="color: #22C55E;">✅ <?php echo htmlspecialchars($message); ?></strong>
                </div>
            <?php endif; ?>

            <div class="card">
                <h3 style="margin-bottom: 20px;">All Clients (<?php echo count($clients); ?>)</h3>

                <?php if (count($clients) > 0): ?>
                    <div>
                        <?php foreach ($clients as $client): ?>
                            <div class="client-row">
                                <div>
                                    <div class="client-name"><?php echo htmlspecialchars($client['name']); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">
                                        📧 <?php echo htmlspecialchars($client['email'] ?? 'No email'); ?>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-weight: 600;"><?php echo htmlspecialchars($client['phone'] ?? 'N/A'); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">📞 Phone</div>
                                </div>
                                <div>
                                    <div style="font-weight: 600;"><?php echo htmlspecialchars($client['city'] ?? 'N/A'); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">📍 <?php echo htmlspecialchars($client['state'] ?? ''); ?></div>
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: #06B6D4;"><?php echo $client['project_count']; ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">Projects</div>
                                </div>
                                <div>
                                    <button class="btn btn-secondary btn-sm" onclick="alert('View full details for this client')">View</button>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php else: ?>
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <p style="font-size: 3rem; margin-bottom: 20px;">👥</p>
                        <p>No clients yet. <a href="#" onclick="openModal('clientModal'); return false;" style="color: #06B6D4; text-decoration: none;">Add your first client</a></p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Client Modal -->
    <div class="modal" id="clientModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add New Client</h2>
            </div>

            <form method="POST">
                <input type="hidden" name="action" value="add">

                <div class="form-group">
                    <label>Client Name *</label>
                    <input type="text" name="name" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email">
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" name="phone">
                    </div>
                </div>

                <div class="form-group">
                    <label>Address</label>
                    <textarea name="address"></textarea>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" name="city">
                    </div>
                    <div class="form-group">
                        <label>State</label>
                        <input type="text" name="state">
                    </div>
                </div>

                <div class="form-group">
                    <label>ZIP Code</label>
                    <input type="text" name="zip_code">
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('clientModal')">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Client</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        function openModal(id) {
            document.getElementById(id).classList.add('active');
        }

        function closeModal(id) {
            document.getElementById(id).classList.remove('active');
        }

        window.onclick = function(e) {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        }
    </script>
</body>
</html>
