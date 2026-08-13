<?php
// Sidebar Navigation - Include this in all pages
$current_page = basename($_SERVER['PHP_SELF'], '.php');
$current_section = explode('/', $_SERVER['REQUEST_URI'])[1] ?? '';
?>
<div class="sidebar">
    <div class="sidebar-brand">
        <h1>🏗️ BuildFlow</h1>
    </div>

    <nav>
        <a href="/" class="nav-item <?php echo ($current_page == 'index') ? 'active' : ''; ?>">
            <span>📊</span>
            Dashboard
        </a>

        <a href="/projects/" class="nav-item <?php echo ($current_section == 'projects') ? 'active' : ''; ?>">
            <span>📁</span>
            Projects
        </a>

        <a href="/clients/" class="nav-item <?php echo ($current_section == 'clients') ? 'active' : ''; ?>">
            <span>👥</span>
            Clients
        </a>

        <a href="/materials/" class="nav-item <?php echo ($current_section == 'materials') ? 'active' : ''; ?>">
            <span>🏢</span>
            Materials
        </a>

        <a href="/estimation/" class="nav-item <?php echo ($current_section == 'estimation') ? 'active' : ''; ?>">
            <span>📐</span>
            Estimation
        </a>

        <a href="/finance/" class="nav-item <?php echo ($current_section == 'finance') ? 'active' : ''; ?>">
            <span>💰</span>
            Finance
        </a>

        <a href="/reports/" class="nav-item <?php echo ($current_section == 'reports') ? 'active' : ''; ?>">
            <span>📈</span>
            Reports
        </a>

        <a href="/documents/" class="nav-item <?php echo ($current_section == 'documents') ? 'active' : ''; ?>">
            <span>📄</span>
            Documents
        </a>

        <a href="/calendar/" class="nav-item <?php echo ($current_section == 'calendar') ? 'active' : ''; ?>">
            <span>📅</span>
            Calendar
        </a>

        <a href="/settings/" class="nav-item <?php echo ($current_section == 'settings') ? 'active' : ''; ?>">
            <span>⚙️</span>
            Settings
        </a>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #E2E8F0;">

        <a href="logout.php" class="nav-item" onclick="return confirm('Are you sure you want to logout?');">
            <span>🚪</span>
            Logout
        </a>
    </nav>
</div>
