const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'buildflow.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database error:', err);
  else console.log('✅ SQLite database connected');
});

// Initialize database tables
const initDatabase = () => {
  db.serialize(() => {
    // Projects table
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      client_id INTEGER,
      status TEXT,
      start_date TEXT,
      end_date TEXT,
      budget REAL,
      spent REAL,
      progress INTEGER,
      address TEXT,
      square_feet REAL,
      building_type TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Clients table
    db.run(`CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      address TEXT,
      company TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Materials table
    db.run(`CREATE TABLE IF NOT EXISTS materials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      quantity REAL,
      unit TEXT,
      unit_price REAL,
      supplier TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Expenses table
    db.run(`CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      description TEXT,
      category TEXT,
      amount REAL,
      date TEXT,
      payment_method TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Estimations table
    db.run(`CREATE TABLE IF NOT EXISTS estimations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      category TEXT,
      description TEXT,
      quantity REAL,
      unit TEXT,
      unit_price REAL,
      total_price REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  });
};

initDatabase();

// ==================== PROJECTS ====================
app.get('/api/projects', (req, res) => {
  db.all(`SELECT p.*, c.name as client_name FROM projects p
          LEFT JOIN clients c ON p.client_id = c.id
          ORDER BY p.created_at DESC`, (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows || []);
  });
});

app.post('/api/projects', (req, res) => {
  const { name, client_id, status, start_date, budget } = req.body;
  db.run(
    `INSERT INTO projects (name, client_id, status, start_date, budget, spent, progress)
     VALUES (?, ?, ?, ?, ?, 0, 0)`,
    [name, client_id, status || 'upcoming', start_date, budget || 0],
    function(err) {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ id: this.lastID, name, client_id, status, start_date, budget });
    }
  );
});

app.put('/api/projects/:id', (req, res) => {
  const { name, client_id, status, budget, progress } = req.body;
  db.run(
    `UPDATE projects SET name=?, client_id=?, status=?, budget=?, progress=? WHERE id=?`,
    [name, client_id, status, budget, progress, req.params.id],
    function(err) {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ id: req.params.id, name, client_id, status, budget, progress });
    }
  );
});

app.delete('/api/projects/:id', (req, res) => {
  db.run(`DELETE FROM projects WHERE id=?`, [req.params.id], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ success: true, id: req.params.id });
  });
});

// ==================== CLIENTS ====================
app.get('/api/clients', (req, res) => {
  db.all(`SELECT * FROM clients ORDER BY created_at DESC`, (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows || []);
  });
});

app.post('/api/clients', (req, res) => {
  const { name, email, phone, address, company } = req.body;
  db.run(
    `INSERT INTO clients (name, email, phone, address, company) VALUES (?, ?, ?, ?, ?)`,
    [name, email, phone, address, company],
    function(err) {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ id: this.lastID, name, email, phone, address, company });
    }
  );
});

app.put('/api/clients/:id', (req, res) => {
  const { name, email, phone, address, company } = req.body;
  db.run(
    `UPDATE clients SET name=?, email=?, phone=?, address=?, company=? WHERE id=?`,
    [name, email, phone, address, company, req.params.id],
    function(err) {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ id: req.params.id, name, email, phone, address, company });
    }
  );
});

app.delete('/api/clients/:id', (req, res) => {
  db.run(`DELETE FROM clients WHERE id=?`, [req.params.id], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ success: true, id: req.params.id });
  });
});

// ==================== MATERIALS ====================
app.get('/api/materials', (req, res) => {
  db.all(`SELECT * FROM materials ORDER BY created_at DESC`, (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows || []);
  });
});

app.post('/api/materials', (req, res) => {
  const { name, category, quantity, unit, unit_price, supplier, status } = req.body;
  db.run(
    `INSERT INTO materials (name, category, quantity, unit, unit_price, supplier, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, category, quantity, unit, unit_price, supplier, status || 'in_stock'],
    function(err) {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ id: this.lastID, name, category, quantity, unit, unit_price, supplier, status });
    }
  );
});

app.delete('/api/materials/:id', (req, res) => {
  db.run(`DELETE FROM materials WHERE id=?`, [req.params.id], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ success: true, id: req.params.id });
  });
});

// ==================== EXPENSES ====================
app.get('/api/expenses', (req, res) => {
  db.all(`SELECT * FROM expenses ORDER BY created_at DESC`, (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows || []);
  });
});

app.post('/api/expenses', (req, res) => {
  const { project_id, description, category, amount, date, payment_method, status } = req.body;
  db.run(
    `INSERT INTO expenses (project_id, description, category, amount, date, payment_method, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [project_id, description, category, amount, date, payment_method, status || 'pending'],
    function(err) {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ id: this.lastID, project_id, description, category, amount, date, payment_method, status });
    }
  );
});

// ==================== DASHBOARD STATS ====================
app.get('/api/stats', (req, res) => {
  db.all(`
    SELECT
      (SELECT COUNT(*) FROM projects) as total_projects,
      (SELECT COUNT(*) FROM projects WHERE status='completed') as completed_projects,
      (SELECT COUNT(*) FROM projects WHERE status='running') as running_projects,
      (SELECT COUNT(*) FROM projects WHERE status='delayed') as delayed_projects,
      (SELECT COUNT(*) FROM clients) as total_clients,
      (SELECT COALESCE(SUM(budget), 0) FROM projects) as total_budget,
      (SELECT COALESCE(SUM(spent), 0) FROM projects) as total_spent,
      (SELECT COALESCE(SUM(amount), 0) FROM expenses WHERE category='material') as material_cost,
      (SELECT COALESCE(SUM(amount), 0) FROM expenses WHERE category='labour') as labour_cost,
      (SELECT COALESCE(SUM(amount), 0) FROM expenses) as total_expenses
  `, (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else {
      const stats = rows[0] || {};
      stats.profit = (stats.total_budget || 0) - (stats.total_expenses || 0);
      res.json(stats);
    }
  });
});

// ==================== EXCEL EXPORT ====================
app.get('/api/export/excel', (req, res) => {
  db.all(`SELECT * FROM projects`, (err, projects) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Projects');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Project Name', key: 'name', width: 30 },
      { header: 'Client', key: 'client_name', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Progress', key: 'progress', width: 10 },
      { header: 'Budget', key: 'budget', width: 15 },
      { header: 'Spent', key: 'spent', width: 15 },
      { header: 'Start Date', key: 'start_date', width: 15 },
    ];

    projects.forEach(project => {
      worksheet.addRow(project);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=buildflow-projects.xlsx');

    workbook.xlsx.write(res).then(() => {
      res.end();
    });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ Server running', port: PORT });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 BuildFlow Backend Server Running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📦 Database: ${dbPath}`);
  console.log(`\n✅ API Endpoints Ready:`);
  console.log(`   GET  /api/projects       - List all projects`);
  console.log(`   POST /api/projects       - Create project`);
  console.log(`   GET  /api/clients        - List clients`);
  console.log(`   POST /api/clients        - Create client`);
  console.log(`   GET  /api/materials      - List materials`);
  console.log(`   GET  /api/expenses       - List expenses`);
  console.log(`   GET  /api/stats          - Dashboard stats`);
  console.log(`   GET  /api/export/excel   - Export to Excel\n`);
});

process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});
