<?php
require_once '../config/session.php';
require_once '../config/database.php';

requireLogin();

$message = '';
$error = '';

// Handle password change
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'change_password') {
    $current_pwd = $_POST['current_password'] ?? '';
    $new_pwd = $_POST['new_password'] ?? '';
    $confirm_pwd = $_POST['confirm_password'] ?? '';

    // In real app, you'd hash passwords and store in database
    // This is just a demo
    if ($new_pwd === $confirm_pwd && strlen($new_pwd) >= 6) {
        $message = 'Password changed successfully!';
    } else {
        $error = 'Passwords do not match or are too short (minimum 6 characters).';
    }
}

// Handle company settings
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'update_settings') {
    $company_name = $_POST['company_name'] ?? '';
    $company_email = $_POST['company_email'] ?? '';
    $company_phone = $_POST['company_phone'] ?? '';
    $message = 'Settings updated successfully!';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings - BuildFlow ERP</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <style>
        .settings-menu {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            border-bottom: 2px solid #E2E8F0;
        }

        @media (prefers-color-scheme: dark) {
            .settings-menu {
                border-bottom-color: #333;
            }
        }

        .settings-tab {
            padding: 12px 20px;
            cursor: pointer;
            border: none;
            background: none;
            font-size: 1rem;
            font-weight: 500;
            color: #999;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
        }

        .settings-tab:hover {
            color: #2563EB;
        }

        .settings-tab.active {
            color: #2563EB;
            border-bottom-color: #2563EB;
        }

        .settings-section {
            display: none;
        }

        .settings-section.active {
            display: block;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        @media (max-width: 768px) {
            .form-row { grid-template-columns: 1fr; }
        }

        .alert {
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid;
        }

        .alert.success {
            background: rgba(34, 197, 94, 0.1);
            border-left-color: #22C55E;
            color: #22C55E;
        }

        .alert.error {
            background: rgba(239, 68, 68, 0.1);
            border-left-color: #EF4444;
            color: #EF4444;
        }

        .setting-option {
            padding: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        @media (prefers-color-scheme: dark) {
            .setting-option {
                background: rgba(15, 23, 42, 0.5);
            }
        }

        .toggle-switch {
            position: relative;
            width: 50px;
            height: 24px;
        }

        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.4s;
            border-radius: 24px;
        }

        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }

        input:checked + .toggle-slider {
            background-color: #2563EB;
        }

        input:checked + .toggle-slider:before {
            transform: translateX(26px);
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <?php include '../includes/sidebar.php'; ?>

        <div class="main-content">
            <div class="top-bar">
                <div class="top-bar-title">
                    <h2>Settings & Configuration</h2>
                </div>
            </div>

            <?php if ($message): ?>
                <div class="alert success">✅ <?php echo htmlspecialchars($message); ?></div>
            <?php endif; ?>
            <?php if ($error): ?>
                <div class="alert error">❌ <?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>

            <!-- Settings Tabs -->
            <div class="settings-menu">
                <button class="settings-tab active" onclick="showTab('account')">👤 Account</button>
                <button class="settings-tab" onclick="showTab('company')">🏢 Company</button>
                <button class="settings-tab" onclick="showTab('appearance')">🎨 Appearance</button>
                <button class="settings-tab" onclick="showTab('notifications')">🔔 Notifications</button>
                <button class="settings-tab" onclick="showTab('security')">🔐 Security</button>
            </div>

            <!-- Account Settings -->
            <div class="settings-section active card" id="account">
                <h3 style="margin-bottom: 20px;">👤 Account Settings</h3>

                <div class="form-group">
                    <label>Username</label>
                    <input type="text" value="<?php echo htmlspecialchars($_SESSION['admin_username']); ?>" disabled style="background: #f0f0f0;">
                </div>

                <form method="POST">
                    <input type="hidden" name="action" value="change_password">

                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" name="current_password" required>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>New Password</label>
                            <input type="password" name="new_password" required>
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirm_password" required>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Update Password</button>
                </form>
            </div>

            <!-- Company Settings -->
            <div class="settings-section card" id="company">
                <h3 style="margin-bottom: 20px;">🏢 Company Information</h3>

                <form method="POST">
                    <input type="hidden" name="action" value="update_settings">

                    <div class="form-group">
                        <label>Company Name</label>
                        <input type="text" name="company_name" value="BuildFlow ERP">
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Company Email</label>
                            <input type="email" name="company_email" value="info@buildflow.com">
                        </div>
                        <div class="form-group">
                            <label>Company Phone</label>
                            <input type="tel" name="company_phone" value="+91 9876543210">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Company Address</label>
                        <textarea name="company_address">123 Construction Avenue, Tech City</textarea>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>City</label>
                            <input type="text" name="city" value="India">
                        </div>
                        <div class="form-group">
                            <label>State</label>
                            <input type="text" name="state" value="State">
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </form>
            </div>

            <!-- Appearance Settings -->
            <div class="settings-section card" id="appearance">
                <h3 style="margin-bottom: 20px;">🎨 Appearance</h3>

                <div class="setting-option">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Dark Mode</div>
                        <div style="font-size: 0.9rem; color: #999;">Enable dark theme for the application</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="darkMode" onchange="toggleDarkMode()">
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="setting-option">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Compact View</div>
                        <div style="font-size: 0.9rem; color: #999;">Use condensed sidebar and smaller fonts</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="compactView" onchange="toggleCompactView()">
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <h4 style="margin-top: 30px; margin-bottom: 20px;">Color Theme</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
                    <button class="btn btn-primary" style="background: #2563EB;">Blue (Default)</button>
                    <button class="btn btn-secondary" style="background: #06B6D4;">Cyan</button>
                    <button class="btn btn-success" style="background: #22C55E;">Green</button>
                    <button class="btn btn-warning" style="background: #F59E0B;">Orange</button>
                </div>
            </div>

            <!-- Notification Settings -->
            <div class="settings-section card" id="notifications">
                <h3 style="margin-bottom: 20px;">🔔 Notifications</h3>

                <div class="setting-option">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Project Updates</div>
                        <div style="font-size: 0.9rem; color: #999;">Get notified when project status changes</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" checked>
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="setting-option">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Expense Alerts</div>
                        <div style="font-size: 0.9rem; color: #999;">Alert when expenses exceed budget</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" checked>
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="setting-option">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Payment Reminders</div>
                        <div style="font-size: 0.9rem; color: #999;">Remind me about pending payments</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" checked>
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="setting-option">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Email Notifications</div>
                        <div style="font-size: 0.9rem; color: #999;">Receive notifications via email</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" checked>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>

            <!-- Security Settings -->
            <div class="settings-section card" id="security">
                <h3 style="margin-bottom: 20px;">🔐 Security</h3>

                <div class="setting-option">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Two-Factor Authentication</div>
                        <div style="font-size: 0.9rem; color: #999;">Add extra security with 2FA</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" onchange="alert('2FA setup would be here')">
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="setting-option">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Session Timeout</div>
                        <div style="font-size: 0.9rem; color: #999;">Automatically logout after inactivity</div>
                    </div>
                    <select style="width: 150px; padding: 8px; border: 1px solid #E2E8F0; border-radius: 6px;">
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>2 hours</option>
                        <option>Never</option>
                    </select>
                </div>

                <h4 style="margin-top: 30px; margin-bottom: 20px;">Data Management</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <button class="btn btn-secondary" onclick="alert('Backup functionality would be here')">
                        💾 Backup Database
                    </button>
                    <button class="btn btn-danger" onclick="if(confirm('This will delete all data. Are you sure?')) { alert('Reset would happen here'); }">
                        🔄 Reset Data
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        function showTab(tabName) {
            // Hide all sections
            document.querySelectorAll('.settings-section').forEach(el => {
                el.classList.remove('active');
            });

            // Remove active from all tabs
            document.querySelectorAll('.settings-tab').forEach(el => {
                el.classList.remove('active');
            });

            // Show selected section
            document.getElementById(tabName).classList.add('active');

            // Add active to clicked tab
            event.target.classList.add('active');
        }

        function toggleDarkMode() {
            const isDark = document.getElementById('darkMode').checked;
            if (isDark) {
                document.documentElement.style.colorScheme = 'dark';
                localStorage.setItem('darkMode', 'true');
            } else {
                document.documentElement.style.colorScheme = 'light';
                localStorage.setItem('darkMode', 'false');
            }
        }

        function toggleCompactView() {
            const isCompact = document.getElementById('compactView').checked;
            if (isCompact) {
                document.body.style.fontSize = '13px';
                localStorage.setItem('compactView', 'true');
            } else {
                document.body.style.fontSize = '1rem';
                localStorage.setItem('compactView', 'false');
            }
        }

        // Load preferences on page load
        window.addEventListener('load', () => {
            if (localStorage.getItem('darkMode') === 'true') {
                document.getElementById('darkMode').checked = true;
            }
            if (localStorage.getItem('compactView') === 'true') {
                document.getElementById('compactView').checked = true;
            }
        });
    </script>
</body>
</html>
