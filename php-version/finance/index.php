<?php
require_once '../config/session.php';
require_once '../config/database.php';

requireLogin();

// Get financial data
$result = $conn->query("SELECT SUM(amount) as total FROM invoices WHERE status = 'paid'");
$total_income = $result->fetch_assoc()['total'] ?? 0;

$result = $conn->query("SELECT SUM(amount) as total FROM expenses");
$total_expenses = $result->fetch_assoc()['total'] ?? 0;

$result = $conn->query("SELECT SUM(material_cost) as total FROM projects");
$material_cost = $result->fetch_assoc()['total'] ?? 0;

$result = $conn->query("SELECT SUM(labour_cost) as total FROM projects");
$labour_cost = $result->fetch_assoc()['total'] ?? 0;

$profit = $total_income - $total_expenses;

// Get monthly data for chart
$monthly_data = [];
for ($i = 6; $i >= 0; $i--) {
    $date = date('Y-m-01', strtotime("-$i months"));
    $month = date('M', strtotime($date));

    $result = $conn->query("SELECT SUM(amount) as income FROM invoices WHERE status = 'paid' AND DATE_FORMAT(created_at, '%Y-%m') = '".substr($date, 0, 7)."'");
    $income = $result->fetch_assoc()['income'] ?? 0;

    $result = $conn->query("SELECT SUM(amount) as expense FROM expenses WHERE DATE_FORMAT(date, '%Y-%m') = '".substr($date, 0, 7)."'");
    $expense = $result->fetch_assoc()['expense'] ?? 0;

    $monthly_data[] = ['month' => $month, 'income' => $income, 'expense' => $expense];
}

// Get recent invoices
$invoices = [];
$result = $conn->query("SELECT * FROM invoices ORDER BY created_at DESC LIMIT 10");
while ($row = $result->fetch_assoc()) {
    $invoices[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Finance - BuildFlow ERP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <style>
        .financial-stat {
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(6, 182, 212, 0.08));
            border: 1px solid rgba(37, 99, 235, 0.2);
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .financial-stat:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.15);
        }

        .financial-stat.income {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(34, 197, 94, 0.03));
            border-color: rgba(34, 197, 94, 0.2);
        }

        .financial-stat.expense {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.03));
            border-color: rgba(239, 68, 68, 0.2);
        }

        .financial-stat.profit {
            background: linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(6, 182, 212, 0.03));
            border-color: rgba(6, 182, 212, 0.2);
        }

        .stat-icon {
            font-size: 2.5rem;
            margin-bottom: 12px;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .stat-income .stat-value { color: #22C55E; }
        .stat-expense .stat-value { color: #EF4444; }
        .stat-profit .stat-value { color: #06B6D4; }

        .stat-label {
            color: #999;
            font-size: 0.9rem;
            font-weight: 500;
        }

        .invoice-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 100px;
            gap: 16px;
            padding: 16px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            margin-bottom: 12px;
            align-items: center;
        }

        @media (prefers-color-scheme: dark) {
            .invoice-row {
                background: rgba(15, 23, 42, 0.5);
            }
        }

        @media (max-width: 768px) {
            .invoice-row { grid-template-columns: 1fr 1fr; }
        }

        .breakdown-item {
            display: grid;
            grid-template-columns: 1fr auto;
            padding: 12px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        @media (prefers-color-scheme: dark) {
            .breakdown-item {
                border-bottom-color: rgba(255, 255, 255, 0.05);
            }
        }

        .breakdown-item:last-child {
            border-bottom: none;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <?php include '../includes/sidebar.php'; ?>

        <div class="main-content">
            <div class="top-bar">
                <div class="top-bar-title">
                    <h2>Finance & Accounting</h2>
                </div>
            </div>

            <!-- Financial Summary -->
            <div class="grid grid-4" style="margin-bottom: 30px;">
                <div class="financial-stat income stat-income">
                    <div class="stat-icon">💰</div>
                    <div class="stat-value">₹<?php echo number_format($total_income, 0); ?></div>
                    <div class="stat-label">Total Income</div>
                </div>

                <div class="financial-stat expense stat-expense">
                    <div class="stat-icon">💸</div>
                    <div class="stat-value">₹<?php echo number_format($total_expenses, 0); ?></div>
                    <div class="stat-label">Total Expenses</div>
                </div>

                <div class="financial-stat profit stat-profit">
                    <div class="stat-icon">📈</div>
                    <div class="stat-value">₹<?php echo number_format($profit, 0); ?></div>
                    <div class="stat-label">Net Profit</div>
                </div>

                <div class="financial-stat">
                    <div class="stat-icon">📊</div>
                    <div class="stat-value"><?php echo $profit > 0 ? '+' : ''; ?><?php echo number_format(($profit / $total_income * 100), 1); ?>%</div>
                    <div class="stat-label">Profit Margin</div>
                </div>
            </div>

            <!-- Cost Breakdown -->
            <div class="grid grid-2" style="margin-bottom: 30px;">
                <div class="card">
                    <h3 style="margin-bottom: 20px;">💼 Expense Breakdown</h3>
                    <div class="breakdown-item">
                        <span>Material Cost</span>
                        <strong style="color: #2563EB;">₹<?php echo number_format($material_cost, 0); ?></strong>
                    </div>
                    <div class="breakdown-item">
                        <span>Labour Cost</span>
                        <strong style="color: #06B6D4;">₹<?php echo number_format($labour_cost, 0); ?></strong>
                    </div>
                    <div class="breakdown-item">
                        <span>Other Expenses</span>
                        <strong style="color: #F59E0B;">₹<?php echo number_format($total_expenses - $material_cost - $labour_cost, 0); ?></strong>
                    </div>
                    <div class="breakdown-item" style="border-bottom: 2px solid #E2E8F0; padding-top: 16px; padding-bottom: 16px; font-weight: 600;">
                        <span>Total Expenses</span>
                        <strong style="color: #EF4444;">₹<?php echo number_format($total_expenses, 0); ?></strong>
                    </div>
                </div>

                <div class="card">
                    <h3 style="margin-bottom: 20px;">📋 Income Summary</h3>
                    <div class="breakdown-item">
                        <span>Invoiced Amount</span>
                        <strong style="color: #2563EB;">₹<?php echo number_format($total_income, 0); ?></strong>
                    </div>
                    <div class="breakdown-item">
                        <span>Paid Amount</span>
                        <strong style="color: #22C55E;">₹<?php echo number_format($total_income, 0); ?></strong>
                    </div>
                    <div class="breakdown-item">
                        <span>Pending Amount</span>
                        <strong style="color: #F59E0B;">₹0</strong>
                    </div>
                    <div class="breakdown-item" style="border-bottom: 2px solid #E2E8F0; padding-top: 16px; padding-bottom: 16px; font-weight: 600;">
                        <span>Total Income</span>
                        <strong style="color: #22C55E;">₹<?php echo number_format($total_income, 0); ?></strong>
                    </div>
                </div>
            </div>

            <!-- Recent Invoices -->
            <div class="card">
                <h3 style="margin-bottom: 20px;">📄 Recent Invoices</h3>

                <?php if (count($invoices) > 0): ?>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Invoice #</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Due Date</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($invoices as $invoice): ?>
                                    <tr>
                                        <td><strong><?php echo htmlspecialchars($invoice['invoice_number']); ?></strong></td>
                                        <td>₹<?php echo number_format($invoice['amount'], 2); ?></td>
                                        <td><span class="badge badge-<?php echo $invoice['status']; ?>"><?php echo ucfirst($invoice['status']); ?></span></td>
                                        <td><?php echo date('d M Y', strtotime($invoice['due_date'])); ?></td>
                                        <td><?php echo date('d M Y', strtotime($invoice['created_at'])); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else: ?>
                    <p style="color: #999; text-align: center; padding: 30px;">No invoices yet.</p>
                <?php endif; ?>
            </div>
        </div>
    </div>
</body>
</html>
