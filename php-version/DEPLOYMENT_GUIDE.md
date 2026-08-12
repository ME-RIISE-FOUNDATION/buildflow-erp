# BuildFlow ERP - Hostinger Deployment Guide (PHP Version)

Complete step-by-step guide to deploy BuildFlow ERP on Hostinger with your konvix.shop domain.

## 🎯 Overview

This is the **PHP/HTML version** of BuildFlow ERP - much easier to deploy on Hostinger than Node.js!

**Advantages of PHP version:**
- ✅ Works on ANY shared hosting (including Hostinger)
- ✅ No Node.js required
- ✅ Faster deployment (5-10 minutes)
- ✅ Lower hosting cost (₹99-199/month)
- ✅ Better Hostinger compatibility

## 📋 Requirements

- Hostinger account with domain konvix.shop
- File Manager or FTP access
- Basic understanding of PHP and MySQL
- 30 minutes of your time

## 🚀 Step-by-Step Deployment

### Step 1: Create Database (5 minutes)

1. **Login to Hostinger Control Panel**
   - Visit: https://www.hostinger.com/cpanel
   - Enter your credentials

2. **Create Database**
   - Go to: **Databases** → **MySQL**
   - Click **"Create Database"**
   - Database Name: `buildflow_erp`
   - Click **"Create"**

3. **Create Database User**
   - In MySQL section, click **"Add New User"**
   - Username: `buildflow_user`
   - Password: `Choose_Strong_Password123` (save this!)
   - Click **"Create User"**

4. **Add User to Database**
   - Find the database in the list
   - Click **"Manage Users"**
   - Select `buildflow_user`
   - Click **"Add User"** → Select ALL permissions
   - Click **"Update Privileges"**

### Step 2: Upload Application Files (5 minutes)

**Method A: Using File Manager (Recommended)**

1. **Access File Manager**
   - In Hostinger cPanel: **File Manager**
   - Navigate to: `/public_html` or `/public_html/konvix.shop`

2. **Upload BuildFlow Files**
   - Download the `php-version` folder from your local machine as ZIP
   - In File Manager: **Upload** → Select ZIP file
   - Right-click ZIP → **Extract**

3. **File Structure Should Look Like:**
   ```
   public_html/
   ├── config/
   ├── assets/
   ├── projects/
   ├── clients/
   ├── materials/
   ├── finance/
   ├── reports/
   ├── estimation/
   ├── documents/
   ├── calendar/
   ├── settings/
   ├── includes/
   ├── index.php
   ├── login.php
   ├── logout.php
   └── README.md
   ```

**Method B: Using FTP**

1. **Get FTP Credentials**
   - Hostinger cPanel → **FTP Accounts**
   - Create new FTP account or use default

2. **Connect via FTP Client**
   - Use FileZilla or WinSCP
   - Host: `ftp.yourdomain.com` or from Hostinger
   - Username: Your FTP username
   - Password: Your FTP password

3. **Upload All Files**
   - Drag & drop all files to `/public_html`

### Step 3: Configure Database Connection (3 minutes)

1. **Edit Database Configuration**
   - In File Manager: Navigate to `config/database.php`
   - Click **"Edit"** (right-click → Edit)

2. **Update Credentials**
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'buildflow_user');      // Database user
   define('DB_PASS', 'your_password_here');  // Database password
   define('DB_NAME', 'buildflow_erp');       // Database name
   ```

   Replace with:
   - `DB_USER` = `buildflow_user` (from Step 1)
   - `DB_PASS` = Your database password (from Step 1)
   - `DB_NAME` = `buildflow_erp`

3. **Save File**
   - Click **"Save"**

### Step 4: Import Database Schema (3 minutes)

1. **Access phpMyAdmin**
   - Hostinger cPanel → **phpMyAdmin**
   - Or: https://yourdomain.com/phpmyadmin

2. **Select Database**
   - In left sidebar: Click `buildflow_erp`

3. **Import SQL Schema**
   - Click **"Import"** tab
   - Choose File: `database/schema.sql`
   - Click **"Open"**
   - Click **"Import"**

   ✅ All tables will be created automatically!

### Step 5: Update Login Credentials (2 minutes)

1. **Edit Session Config**
   - File Manager: `config/session.php`
   - Click **"Edit"**

2. **Change Admin Password**
   ```php
   define('ADMIN_USERNAME', 'admin');
   define('ADMIN_PASSWORD', 'Admin@123');  // Change this!
   ```

   Change to:
   ```php
   define('ADMIN_USERNAME', 'admin');
   define('ADMIN_PASSWORD', 'YourSecurePassword123');
   ```

3. **Save File**

### Step 6: Set File Permissions (1 minute)

1. **File Manager Permissions**
   - Select all folders
   - Right-click → **Permissions**
   - Set to: **755** (for folders) and **644** (for files)

2. **Or via Command Line**
   ```bash
   chmod 755 -R /public_html/php-version/
   chmod 644 /public_html/php-version/*.php
   ```

### Step 7: Configure Domain (5 minutes)

1. **Point Domain to Hosting**
   - If not done yet, update domain DNS:
   - **Nameservers**: (from Hostinger email or cPanel)
   - Wait 5-48 hours for propagation

2. **Enable SSL Certificate**
   - Hostinger cPanel → **SSL Certificates**
   - Click **"Install SSL"** for konvix.shop
   - Choose **AutoSSL** (free)
   - Enable **Force HTTPS**

3. **Verify Domain**
   - Visit: https://konvix.shop
   - Should see login page

## ✅ Testing & Verification

### 1. Test Login

1. **Access Application**
   - Open: https://konvix.shop
   - Login with:
     - Username: `admin`
     - Password: `Admin@123` (or your new password)

2. **Verify Dashboard Loads**
   - Should see main dashboard
   - All buttons should be clickable

### 2. Test Database Connection

1. **Create Test Project**
   - Click **Projects** → **+ New Project**
   - Fill in details
   - Click **Create Project**

2. **Verify Data Saved**
   - Project should appear in list
   - Refresh page - data should persist

### 3. Test All Modules

- [ ] Dashboard - loads correctly
- [ ] Projects - create, view, update
- [ ] Clients - add and list clients
- [ ] Materials - view materials list
- [ ] Finance - shows financial data
- [ ] Reports - generate reports
- [ ] Navigation - all links work

## 🆘 Troubleshooting

### "Connection failed" Error

**Problem:** Cannot connect to database

**Solution:**
1. Check database credentials in `config/database.php`
2. Verify database user exists in Hostinger
3. Check user has privileges to database
4. Try with `127.0.0.1` instead of `localhost`

### "Table doesn't exist" Error

**Problem:** Database tables not created

**Solution:**
1. Open phpMyAdmin
2. Select `buildflow_erp` database
3. Import `database/schema.sql` file
4. Verify tables appear in left sidebar

### "Cannot modify headers already sent" Error

**Problem:** PHP output before session start

**Solution:**
1. Check for spaces/BOM before `<?php` tags
2. Delete any blank lines before `<?php`
3. Use UTF-8 without BOM encoding

### "Permission denied" Error

**Problem:** File permission issue

**Solution:**
```bash
chmod 755 -R public_html/php-version/
chmod 644 public_html/php-version/*.php
```

### HTTPS Not Working

**Problem:** SSL certificate not installed

**Solution:**
1. Go to Hostinger cPanel → SSL Certificates
2. Install AutoSSL certificate
3. Wait 10 minutes
4. Try https://konvix.shop

## 🔐 Security Checklist

- [ ] Changed admin password from default
- [ ] Database user created with strong password
- [ ] SSL certificate installed (HTTPS)
- [ ] File permissions set correctly (755/644)
- [ ] Database backups enabled
- [ ] Error reporting disabled in production

## 📊 File Structure Verification

Verify all these files exist in `/public_html`:

```
✓ config/database.php
✓ config/session.php
✓ assets/css/style.css
✓ includes/sidebar.php
✓ projects/index.php
✓ clients/index.php
✓ materials/index.php
✓ finance/index.php
✓ reports/index.php
✓ estimation/index.php
✓ documents/index.php
✓ calendar/index.php
✓ settings/index.php
✓ index.php (dashboard)
✓ login.php
✓ logout.php
✓ database/schema.sql
```

## 🎉 Success!

If all tests pass, congratulations! Your BuildFlow ERP is now live at:

**https://konvix.shop**

Login with:
- Username: `admin`
- Password: (your new password)

## 📞 Next Steps

1. **Customize Application**
   - Change company name/logo
   - Update colors in `assets/css/style.css`
   - Modify sidebar items

2. **Add More Users** (optional)
   - Modify `config/session.php` to add more admin accounts
   - Or implement user authentication module

3. **Backup Database**
   - Hostinger cPanel → Backups
   - Create automatic daily backups

4. **Monitor Performance**
   - Use Hostinger analytics
   - Check error logs regularly

## 📝 Important URLs

| Item | URL |
|------|-----|
| Application | https://konvix.shop |
| Login Page | https://konvix.shop/login.php |
| Control Panel | https://konvix.shop/cpanel (or via Hostinger) |
| phpMyAdmin | https://konvix.shop/phpmyadmin |
| FTP Access | ftp://konvix.shop (via FTP client) |

## ✨ Key Features Available

✅ Projects Management  
✅ Client Database  
✅ Materials Tracking  
✅ Expense Monitoring  
✅ Financial Reports  
✅ Dashboard Analytics  
✅ Professional UI  
✅ Responsive Design  
✅ Dark Mode Support  

---

**Deployment complete! 🚀**

For support or issues, check the README.md file or contact Hostinger support.
