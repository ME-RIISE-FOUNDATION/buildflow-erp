<?php
require_once '../config/session.php';
require_once '../config/database.php';

requireLogin();

$action = $_GET['action'] ?? '';
$project_id = $_GET['id'] ?? null;
$message = '';
$error = '';

// Handle DELETE
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $action == 'delete') {
    $id = $_POST['id'] ?? null;
    if ($id) {
        $conn->query("DELETE FROM projects WHERE id = $id");
        $message = 'Project deleted successfully!';
    }
}

// Handle ADD/UPDATE
if ($_SERVER['REQUEST_METHOD'] == 'POST' && ($action == 'add' || $action == 'edit')) {
    $name = $conn->real_escape_string($_POST['name'] ?? '');
    $client_name = $conn->real_escape_string($_POST['client_name'] ?? '');
    $client_email = $conn->real_escape_string($_POST['client_email'] ?? '');
    $client_phone = $conn->real_escape_string($_POST['client_phone'] ?? '');
    $owner = $conn->real_escape_string($_POST['owner'] ?? '');
    $owner_phone = $conn->real_escape_string($_POST['owner_phone'] ?? '');
    $address = $conn->real_escape_string($_POST['address'] ?? '');
    $length = $_POST['length'] ?? 0;
    $width = $_POST['width'] ?? 0;
    $status = $_POST['status'] ?? 'upcoming';
    $progress = $_POST['progress'] ?? 0;
    $budget = $_POST['budget'] ?? 0;
    $start_date = $_POST['start_date'] ?? null;
    $end_date = $_POST['end_date'] ?? null;
    $description = $conn->real_escape_string($_POST['description'] ?? '');

    $area = ($length && $width) ? $length * $width : 0;

    if ($action == 'add') {
        $sql = "INSERT INTO projects
                (name, client_name, client_email, client_phone, owner, owner_phone, address,
                 length, width, area, status, progress, budget, start_date, end_date, description)
                VALUES
                ('$name', '$client_name', '$client_email', '$client_phone', '$owner', '$owner_phone',
                 '$address', $length, $width, $area, '$status', $progress, $budget,
                 '$start_date', '$end_date', '$description')";
    } else {
        $id = $_POST['id'] ?? null;
        $sql = "UPDATE projects SET
                name='$name', client_name='$client_name', client_email='$client_email',
                client_phone='$client_phone', owner='$owner', owner_phone='$owner_phone',
                address='$address', length=$length, width=$width, area=$area, status='$status',
                progress=$progress, budget=$budget, start_date='$start_date', end_date='$end_date',
                description='$description' WHERE id=$id";
    }

    if ($conn->query($sql)) {
        $message = $action == 'add' ? 'Project created successfully!' : 'Project updated successfully!';
    } else {
        $error = 'Error: ' . $conn->error;
    }
}

// Get projects
$projects = [];
$result = $conn->query("SELECT * FROM projects ORDER BY created_at DESC");
while ($row = $result->fetch_assoc()) {
    $projects[] = $row;
}

// Get single project if viewing/editing
$current_project = null;
if ($project_id && $action != 'add') {
    $result = $conn->query("SELECT * FROM projects WHERE id = $project_id");
    $current_project = $result->fetch_assoc();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projects - BuildFlow ERP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <style>
        .project-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 150px;
            gap: 16px;
            align-items: center;
            padding: 16px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            margin-bottom: 12px;
            border-left: 4px solid #2563EB;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        @media (prefers-color-scheme: dark) {
            .project-row {
                background: rgba(15, 23, 42, 0.5);
            }
        }

        .project-row:hover {
            background: rgba(37, 99, 235, 0.08);
            transform: translateX(5px);
        }

        .project-name {
            font-weight: 600;
            color: #2563EB;
        }

        .project-actions {
            display: flex;
            gap: 8px;
        }

        .action-btn {
            padding: 6px 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.85rem;
            transition: all 0.2s ease;
        }

        .action-edit {
            background: rgba(37, 99, 235, 0.2);
            color: #2563EB;
        }

        .action-edit:hover {
            background: rgba(37, 99, 235, 0.3);
        }

        .action-delete {
            background: rgba(239, 68, 68, 0.2);
            color: #EF4444;
        }

        .action-delete:hover {
            background: rgba(239, 68, 68, 0.3);
        }

        @media (max-width: 1200px) {
            .project-row {
                grid-template-columns: 1fr 1fr 1fr;
            }
        }

        @media (max-width: 768px) {
            .project-row {
                grid-template-columns: 1fr 1fr;
            }
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
                    <h2>Projects</h2>
                </div>
                <div>
                    <button class="btn btn-primary" onclick="openModal('projectModal')">
                        + New Project
                    </button>
                </div>
            </div>

            <?php if ($message): ?>
                <div class="card" style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22C55E; margin-bottom: 20px;">
                    <strong style="color: #22C55E;">✅ <?php echo htmlspecialchars($message); ?></strong>
                </div>
            <?php endif; ?>

            <?php if ($error): ?>
                <div class="card" style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; margin-bottom: 20px;">
                    <strong style="color: #EF4444;">❌ <?php echo htmlspecialchars($error); ?></strong>
                </div>
            <?php endif; ?>

            <!-- Projects List -->
            <div class="card">
                <h3 style="margin-bottom: 20px;">All Projects (<?php echo count($projects); ?>)</h3>

                <?php if (count($projects) > 0): ?>
                    <div>
                        <?php foreach ($projects as $project): ?>
                            <div class="project-row" onclick="location.href='view.php?id=<?php echo $project['id']; ?>'">
                                <div>
                                    <div class="project-name"><?php echo htmlspecialchars($project['name']); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">
                                        📍 <?php echo htmlspecialchars($project['address'] ?? 'No address'); ?>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-weight: 600;"><?php echo htmlspecialchars($project['client_name']); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">
                                        👤 <?php echo htmlspecialchars($project['owner']); ?>
                                    </div>
                                </div>
                                <div>
                                    <span class="badge badge-<?php echo $project['status']; ?>">
                                        <?php echo ucfirst($project['status']); ?>
                                    </span>
                                    <div style="font-size: 0.85rem; margin-top: 8px;">
                                        <?php echo $project['progress']; ?>% Complete
                                    </div>
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: #2563EB;">₹<?php echo number_format($project['budget'], 0); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">Budget</div>
                                </div>
                                <div class="project-actions" onclick="event.stopPropagation();">
                                    <button class="action-btn action-edit" onclick="editProject(<?php echo $project['id']; ?>)">
                                        ✏️ Edit
                                    </button>
                                    <button class="action-btn action-delete" onclick="deleteProject(<?php echo $project['id']; ?>)">
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php else: ?>
                    <div style="text-align: center; padding: 60px 20px; color: #999;">
                        <p style="font-size: 3rem; margin-bottom: 20px;">📋</p>
                        <p>No projects yet. <a href="#" onclick="openModal('projectModal'); return false;" style="color: #2563EB; text-decoration: none;">Create your first project</a></p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Project Modal -->
    <div class="modal" id="projectModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add New Project</h2>
            </div>

            <form method="POST">
                <input type="hidden" name="action" id="actionInput" value="add">
                <input type="hidden" name="id" id="projectId">

                <div class="form-row">
                    <div class="form-group">
                        <label>Project Name *</label>
                        <input type="text" name="name" id="projectName" required>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select name="status">
                            <option value="upcoming">Upcoming</option>
                            <option value="running">Running</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Client Name *</label>
                        <input type="text" name="client_name" id="clientName" required>
                    </div>
                    <div class="form-group">
                        <label>Client Email</label>
                        <input type="email" name="client_email" id="clientEmail">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Client Phone</label>
                        <input type="tel" name="client_phone" id="clientPhone">
                    </div>
                    <div class="form-group">
                        <label>Project Owner *</label>
                        <input type="text" name="owner" id="ownerName" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Owner Phone</label>
                        <input type="tel" name="owner_phone" id="ownerPhone">
                    </div>
                    <div class="form-group">
                        <label>Budget (₹)</label>
                        <input type="number" name="budget" id="budget" step="0.01">
                    </div>
                </div>

                <div class="form-group">
                    <label>Site Address</label>
                    <textarea name="address" id="address"></textarea>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Length (m)</label>
                        <input type="number" name="length" id="length" step="0.01" onchange="calculateArea()">
                    </div>
                    <div class="form-group">
                        <label>Width (m)</label>
                        <input type="number" name="width" id="width" step="0.01" onchange="calculateArea()">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="date" name="start_date" id="startDate">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="date" name="end_date" id="endDate">
                    </div>
                </div>

                <div class="form-group">
                    <label>Progress (%)</label>
                    <input type="number" name="progress" id="progress" value="0" min="0" max="100">
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea name="description" id="description"></textarea>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('projectModal')">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
            document.getElementById('actionInput').value = 'add';
            document.getElementById('projectId').value = '';
        }

        function editProject(id) {
            // Get project data and populate form
            location.href = 'edit.php?id=' + id;
        }

        function deleteProject(id) {
            if (confirm('Are you sure you want to delete this project?')) {
                const form = document.createElement('form');
                form.method = 'POST';
                form.innerHTML = `
                    <input type="hidden" name="action" value="delete">
                    <input type="hidden" name="id" value="${id}">
                `;
                document.body.appendChild(form);
                form.submit();
            }
        }

        function calculateArea() {
            const length = parseFloat(document.getElementById('length').value) || 0;
            const width = parseFloat(document.getElementById('width').value) || 0;
            if (length && width) {
                console.log('Area: ' + (length * width) + ' sq m');
            }
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.classList.remove('active');
            }
        }
    </script>
</body>
</html>
