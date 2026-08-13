<?php
require_once '../config/session.php';
require_once '../config/database.php';

requireLogin();

$project_id = $_GET['id'] ?? null;

if (!$project_id) {
    header('Location: index.php');
    exit();
}

// Get project details
$result = $conn->query("SELECT * FROM projects WHERE id = $project_id");
$project = $result->fetch_assoc();

if (!$project) {
    header('Location: index.php');
    exit();
}

// Get materials
$materials = [];
$result = $conn->query("SELECT * FROM materials WHERE project_id = $project_id ORDER BY created_at DESC");
while ($row = $result->fetch_assoc()) {
    $materials[] = $row;
}

// Get expenses
$expenses = [];
$result = $conn->query("SELECT * FROM expenses WHERE project_id = $project_id ORDER BY date DESC LIMIT 10");
while ($row = $result->fetch_assoc()) {
    $expenses[] = $row;
}

// Get total expenses
$result = $conn->query("SELECT SUM(amount) as total FROM expenses WHERE project_id = $project_id");
$total_expenses = $result->fetch_assoc()['total'] ?? 0;

// Handle delete expense
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'delete_expense') {
    $expense_id = $_POST['expense_id'] ?? null;
    if ($expense_id) {
        $conn->query("DELETE FROM expenses WHERE id = $expense_id AND project_id = $project_id");
    }
    header("Location: view.php?id=$project_id");
    exit();
}

// Handle add material
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'add_material') {
    $name = $conn->real_escape_string($_POST['name'] ?? '');
    $quantity = $_POST['quantity'] ?? 0;
    $unit = $conn->real_escape_string($_POST['unit'] ?? '');
    $cost = $_POST['cost'] ?? 0;
    $supplier = $conn->real_escape_string($_POST['supplier'] ?? '');
    $purchase_date = $_POST['purchase_date'] ?? date('Y-m-d');

    $conn->query("INSERT INTO materials
                 (project_id, name, quantity, unit, cost, supplier, purchase_date)
                 VALUES
                 ($project_id, '$name', $quantity, '$unit', $cost, '$supplier', '$purchase_date')");

    header("Location: view.php?id=$project_id");
    exit();
}

// Handle add expense
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'add_expense') {
    $category = $conn->real_escape_string($_POST['category'] ?? '');
    $amount = $_POST['amount'] ?? 0;
    $date = $_POST['date'] ?? date('Y-m-d');
    $description = $conn->real_escape_string($_POST['description'] ?? '');

    $conn->query("INSERT INTO expenses
                 (project_id, category, amount, date, description)
                 VALUES
                 ($project_id, '$category', $amount, '$date', '$description')");

    header("Location: view.php?id=$project_id");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($project['name']); ?> - BuildFlow ERP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <style>
        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 30px;
        }

        .section-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin: 30px 0 20px 0;
            border-bottom: 2px solid #2563EB;
            padding-bottom: 10px;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .info-card {
            background: rgba(37, 99, 235, 0.05);
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid #2563EB;
        }

        .info-label {
            color: #999;
            font-size: 0.85rem;
            margin-bottom: 4px;
        }

        .info-value {
            font-size: 1.1rem;
            font-weight: 600;
            color: #2563EB;
        }

        .expense-row, .material-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 100px;
            gap: 16px;
            padding: 16px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            margin-bottom: 12px;
            align-items: center;
        }

        @media (prefers-color-scheme: dark) {
            .expense-row, .material-row {
                background: rgba(15, 23, 42, 0.5);
            }
        }

        .btn-sm {
            padding: 6px 12px;
            font-size: 0.85rem;
        }

        .progress-section {
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(6, 182, 212, 0.08));
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
        }

        .progress-bar-container {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-top: 15px;
        }

        .progress-bar {
            flex: 1;
            height: 12px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #2563EB, #06B6D4);
            transition: width 0.3s ease;
        }

        .progress-text {
            font-weight: 600;
            color: #2563EB;
            min-width: 50px;
            text-align: right;
        }

        .form-inline {
            display: grid;
            grid-template-columns: auto 1fr auto auto;
            gap: 12px;
            align-items: end;
            margin-bottom: 20px;
        }

        @media (max-width: 768px) {
            .form-inline { grid-template-columns: 1fr; }
            .expense-row, .material-row { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <?php include '../includes/sidebar.php'; ?>

        <div class="main-content">
            <div class="top-bar">
                <div class="top-bar-title">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <a href="index.php" style="color: #2563EB; text-decoration: none; font-size: 1.2rem;">←</a>
                        <div>
                            <h2 style="margin: 0;"><?php echo htmlspecialchars($project['name']); ?></h2>
                            <p style="font-size: 0.9rem; color: #999; margin-top: 4px;">
                                👤 <?php echo htmlspecialchars($project['client_name']); ?> |
                                📍 <?php echo htmlspecialchars($project['address'] ?? 'No address'); ?>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Progress Section -->
            <div class="card progress-section">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h3 style="margin: 0;">Project Progress</h3>
                        <p style="color: #999; margin-top: 4px;">Current completion status</p>
                    </div>
                    <span class="badge badge-<?php echo $project['status']; ?>">
                        <?php echo ucfirst($project['status']); ?>
                    </span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: <?php echo $project['progress']; ?>%;"></div>
                    </div>
                    <div class="progress-text"><?php echo $project['progress']; ?>%</div>
                </div>
            </div>

            <!-- Project Information -->
            <div class="card">
                <h3 class="section-title">📋 Project Information</h3>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-label">Status</div>
                        <div class="info-value"><?php echo ucfirst($project['status']); ?></div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Budget</div>
                        <div class="info-value">₹<?php echo number_format($project['budget'], 0); ?></div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Start Date</div>
                        <div class="info-value"><?php echo $project['start_date'] ? date('d M Y', strtotime($project['start_date'])) : 'N/A'; ?></div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">End Date</div>
                        <div class="info-value"><?php echo $project['end_date'] ? date('d M Y', strtotime($project['end_date'])) : 'N/A'; ?></div>
                    </div>
                </div>

                <h3 class="section-title">📐 Site Measurements</h3>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-label">Length</div>
                        <div class="info-value"><?php echo $project['length'] ? $project['length'] . ' m' : 'N/A'; ?></div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Width</div>
                        <div class="info-value"><?php echo $project['width'] ? $project['width'] . ' m' : 'N/A'; ?></div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Total Area</div>
                        <div class="info-value"><?php echo $project['area'] ? number_format($project['area'], 2) . ' m²' : 'N/A'; ?></div>
                    </div>
                </div>

                <h3 class="section-title">👥 Client Information</h3>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-label">Name</div>
                        <div class="info-value"><?php echo htmlspecialchars($project['client_name']); ?></div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Email</div>
                        <div class="info-value" style="font-size: 0.95rem;"><?php echo htmlspecialchars($project['client_email'] ?? 'N/A'); ?></div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Phone</div>
                        <div class="info-value"><?php echo htmlspecialchars($project['client_phone'] ?? 'N/A'); ?></div>
                    </div>
                </div>
            </div>

            <!-- Materials Section -->
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 class="section-title" style="margin: 0;">🏢 Materials (<?php echo count($materials); ?>)</h3>
                    <button class="btn btn-primary btn-sm" onclick="openModal('materialModal')">+ Add Material</button>
                </div>

                <?php if (count($materials) > 0): ?>
                    <div>
                        <?php foreach ($materials as $material): ?>
                            <div class="material-row">
                                <div>
                                    <div style="font-weight: 600;"><?php echo htmlspecialchars($material['name']); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">
                                        Supplier: <?php echo htmlspecialchars($material['supplier'] ?? 'N/A'); ?>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-weight: 600;"><?php echo $material['quantity'] . ' ' . $material['unit']; ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">Used: <?php echo $material['used'] ?? 0; ?></div>
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: #2563EB;">₹<?php echo number_format($material['cost'], 2); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;"><?php echo date('d M Y', strtotime($material['purchase_date'])); ?></div>
                                </div>
                                <div style="text-align: right;">
                                    <button class="btn btn-danger btn-sm" onclick="if(confirm('Delete this material?')) { location.href='delete-material.php?id=<?php echo $material['id']; ?>&project_id=<?php echo $project_id; ?>'; }">Delete</button>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php else: ?>
                    <p style="color: #999; text-align: center; padding: 30px;">No materials added yet.</p>
                <?php endif; ?>
            </div>

            <!-- Expenses Section -->
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 class="section-title" style="margin: 0;">💰 Expenses (₹<?php echo number_format($total_expenses, 0); ?>)</h3>
                    <button class="btn btn-primary btn-sm" onclick="openModal('expenseModal')">+ Add Expense</button>
                </div>

                <?php if (count($expenses) > 0): ?>
                    <div>
                        <?php foreach ($expenses as $expense): ?>
                            <div class="expense-row">
                                <div>
                                    <div style="font-weight: 600;"><?php echo htmlspecialchars($expense['category']); ?></div>
                                    <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">
                                        <?php echo htmlspecialchars($expense['description'] ?? ''); ?>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: #999;">Date</div>
                                    <div style="font-weight: 600;"><?php echo date('d M Y', strtotime($expense['date'])); ?></div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: #999;">Amount</div>
                                    <div style="font-weight: 600; color: #2563EB; font-size: 1.1rem;">₹<?php echo number_format($expense['amount'], 2); ?></div>
                                </div>
                                <div style="text-align: right;">
                                    <form method="POST" style="display: inline;">
                                        <input type="hidden" name="action" value="delete_expense">
                                        <input type="hidden" name="expense_id" value="<?php echo $expense['id']; ?>">
                                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Delete this expense?');">Delete</button>
                                    </form>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php else: ?>
                    <p style="color: #999; text-align: center; padding: 30px;">No expenses recorded yet.</p>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Add Material Modal -->
    <div class="modal" id="materialModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add Material</h2>
            </div>

            <form method="POST">
                <input type="hidden" name="action" value="add_material">

                <div class="form-group">
                    <label>Material Name *</label>
                    <input type="text" name="name" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Quantity *</label>
                        <input type="number" name="quantity" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label>Unit *</label>
                        <select name="unit" required>
                            <option>Ton</option>
                            <option>Kg</option>
                            <option>Piece</option>
                            <option>Bag</option>
                            <option>Liter</option>
                            <option>Meter</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Cost (₹) *</label>
                        <input type="number" name="cost" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label>Purchase Date</label>
                        <input type="date" name="purchase_date" value="<?php echo date('Y-m-d'); ?>">
                    </div>
                </div>

                <div class="form-group">
                    <label>Supplier</label>
                    <input type="text" name="supplier">
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('materialModal')">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Material</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Add Expense Modal -->
    <div class="modal" id="expenseModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add Expense</h2>
            </div>

            <form method="POST">
                <input type="hidden" name="action" value="add_expense">

                <div class="form-group">
                    <label>Category *</label>
                    <select name="category" required>
                        <option>Labour</option>
                        <option>Material</option>
                        <option>Equipment</option>
                        <option>Transport</option>
                        <option>Miscellaneous</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Amount (₹) *</label>
                    <input type="number" name="amount" step="0.01" required>
                </div>

                <div class="form-group">
                    <label>Date</label>
                    <input type="date" name="date" value="<?php echo date('Y-m-d'); ?>">
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea name="description"></textarea>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('expenseModal')">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Expense</button>
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
