# BuildFlow ERP - PHP/HTML Version

A complete enterprise-grade Construction Management & Project Estimation System built with vanilla PHP and HTML/CSS.

## 🚀 Features

- **Projects Module** - Create, manage, and track construction projects
- **Clients Management** - Maintain client database with contact info
- **Materials Management** - Track materials, suppliers, and costs
- **Expense Tracking** - Monitor project-wise expenses
- **Finance Dashboard** - Income, expenses, and profit analysis
- **Reports & Analytics** - Custom date-range reports
- **Single Admin Login** - Super Admin authentication
- **Beautiful UI** - Modern glassmorphism design with CSS animations
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Professional Components** - Cards, tables, modals, and forms

## 📋 Project Structure

```
php-version/
├── config/
│   ├── database.php          # Database connection
│   └── session.php           # Session & auth management
├── database/
│   └── schema.sql            # MySQL database schema
├── assets/
│   ├── css/
│   │   └── style.css         # Global styles
│   └── js/
│       └── main.js           # Global scripts
├── includes/
│   └── sidebar.php           # Navigation sidebar
├── projects/
│   ├── index.php             # Projects list
│   └── view.php              # Project details
├── clients/
│   └── index.php             # Clients list
├── materials/
│   └── index.php             # Materials inventory
├── finance/
│   └── index.php             # Finance dashboard
├── reports/
│   └── index.php             # Reports & analytics
├── estimation/
│   └── index.php             # Project estimation
├── documents/
│   └── index.php             # Document management
├── calendar/
│   └── index.php             # Calendar & tasks
├── settings/
│   └── index.php             # Settings & configuration
├── login.php                 # Login page
├── index.php                 # Dashboard
├── logout.php                # Logout handler
└── README.md                 # This file
```

## 🛠️ Installation

### 1. Create Database

```bash
mysql -u root -p < database/schema.sql
```

Or manually create database and tables using the SQL schema.

### 2. Update Database Configuration

Edit `config/database.php`:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');
define('DB_NAME', 'buildflow_erp');
```

### 3. Update Login Credentials

Edit `config/session.php` to change admin password:

```php
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'your_secure_password');
```

### 4. Set File Permissions

```bash
chmod 755 -R php-version/
chmod 644 -R php-version/*.php php-version/**/*.php
```

### 5. Upload to Hosting

Upload all files to your Hostinger via File Manager or FTP:

```
/public_html/
├── All PHP files and folders
```

## 🌐 Hosting Setup (Hostinger)

### For Shared Hosting:

1. **Create Database**
   - Login to Hostinger cPanel
   - Go to Databases → MySQL
   - Create database with name: `buildflow_erp`
   - Create user with full privileges
   - Add user to database

2. **Upload Files**
   - Via File Manager or FTP
   - Upload entire `php-version` folder
   - Or upload files to `/public_html`

3. **Configure Database**
   - Update `config/database.php` with cPanel database credentials

4. **Run Database Schema**
   - Import `database/schema.sql` using phpMyAdmin

5. **Access Application**
   - Visit: `https://konvix.shop`
   - Login: `admin` / `Admin@123`

## 📱 Features Overview

### Dashboard
- Project statistics overview
- Recent projects list
- Financial summary
- Activity log
- Quick access to all modules

### Projects
- Create new projects
- Edit project details
- Delete projects
- Track materials per project
- Monitor expenses
- View project progress
- Access site measurements
- Manage construction phases

### Clients
- Add new clients
- View client details
- Track projects per client
- Manage contact information

### Materials
- Track material inventory
- Monitor material costs
- View suppliers
- Purchase date tracking
- Cost calculations

### Finance
- Income tracking
- Expense management
- Profit calculations
- Invoice management
- Monthly reports
- Cost breakdowns

### Reports
- Custom date ranges
- Project statistics
- Financial reports
- Export to PDF/Excel
- Analytics dashboard

## 🎨 Design Features

- **Modern UI** - Glassmorphism with frosted glass effects
- **Smooth Animations** - CSS transitions on all interactive elements
- **Dark Mode** - Automatic dark mode support
- **Responsive** - Mobile-first responsive design
- **Professional** - Enterprise-grade appearance

## 🔐 Security Features

- Session-based authentication
- Single admin login
- Database prepared statements (escaping)
- Protected routes
- Logout functionality

## 📊 Database Schema

### Main Tables:
- `projects` - Project records
- `materials` - Material inventory
- `expenses` - Project expenses
- `clients` - Client information
- `invoices` - Invoice tracking
- `floor_details` - Floor-wise breakdown
- `construction_phases` - Progress tracking
- `documents` - File management
- `activity_log` - Action logging

## 🚀 Deployment Checklist

- [ ] Update database credentials in `config/database.php`
- [ ] Change admin password in `config/session.php`
- [ ] Import database schema
- [ ] Upload all files to hosting
- [ ] Set correct file permissions
- [ ] Test login functionality
- [ ] Create first project
- [ ] Verify all modules load
- [ ] Test forms and CRUD operations
- [ ] Enable HTTPS/SSL certificate

## 🎓 Next Steps

1. **Customize Branding**
   - Update logo in sidebar
   - Modify color scheme in `assets/css/style.css`
   - Update company name

2. **Add More Features**
   - Project estimation module
   - Advanced reporting
   - File uploads for documents
   - Email notifications
   - SMS alerts

3. **Connect to APIs**
   - Google Maps for locations
   - Payment gateway integration
   - Email service for notifications

4. **Scale Application**
   - Add multi-user support
   - Role-based access control
   - Advanced analytics
   - Mobile app

## 📝 License

Built for BuildFlow ERP - Construction Management System

## 💬 Support

For deployment issues on Hostinger:
- Check file permissions
- Verify database connection
- Enable PHP error logging
- Contact Hostinger support

---

**Ready to deploy? 🚀**
Upload to Hostinger and access at your domain!
