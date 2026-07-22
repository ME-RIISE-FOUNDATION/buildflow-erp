# BuildFlow ERP - Backend & Database Setup

## 🚀 Complete Setup Guide

### Prerequisites
- Node.js 18+
- npm or yarn
- SQLite3 (included with sqlite3 npm package)

---

## 📋 Step 1: Install Dependencies

```bash
npm install
```

This will install both frontend and backend dependencies.

---

## 🗄️ Step 2: Start Backend Server

Open a new terminal and run:

```bash
npm run server
```

You should see:
```
🚀 BuildFlow Backend Server Running!
📍 URL: http://localhost:8000
📦 Database: buildflow.db
✅ API Endpoints Ready
```

---

## 🎨 Step 3: Start Frontend (Keep running in first terminal)

In the original terminal:

```bash
npm run dev
```

Frontend will run on http://localhost:3000

---

## 🔗 Step 4: Connect Frontend to Backend

All modules are now integrated! The frontend automatically calls the backend API:

- **Projects** → `/api/projects`
- **Clients** → `/api/clients`
- **Materials** → `/api/materials`
- **Expenses** → `/api/expenses`
- **Dashboard** → `/api/stats`

---

## 📊 Database Structure

The backend creates SQLite database with these tables:

### Projects
```sql
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- client_id (INTEGER)
- status (TEXT: upcoming, running, completed, delayed)
- budget (REAL)
- spent (REAL)
- progress (INTEGER: 0-100)
- start_date (TEXT)
- end_date (TEXT)
```

### Clients
```sql
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT UNIQUE)
- phone (TEXT)
- address (TEXT)
- company (TEXT)
```

### Materials
```sql
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- category (TEXT)
- quantity (REAL)
- unit (TEXT)
- unit_price (REAL)
- supplier (TEXT)
- status (TEXT: in_stock, low_stock, out_of_stock)
```

### Expenses
```sql
- id (INTEGER PRIMARY KEY)
- project_id (INTEGER)
- description (TEXT)
- category (TEXT)
- amount (REAL)
- date (TEXT)
- payment_method (TEXT)
- status (TEXT: pending, approved, paid)
```

---

## 🎯 API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Clients
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Materials
- `GET /api/materials` - List all materials
- `POST /api/materials` - Create material
- `DELETE /api/materials/:id` - Delete material

### Expenses
- `GET /api/expenses` - List all expenses
- `POST /api/expenses` - Create expense

### Dashboard
- `GET /api/stats` - Get dashboard statistics

### Export
- `GET /api/export/excel` - Download Excel file with projects

---

## 📥 Excel Export

Click "Export to Excel" button in Reports to download:
- `buildflow-projects.xlsx` - All projects with details

---

## 🗂️ Database File Location

The SQLite database is stored at:
```
c:\Users\ME-RIISE\Documents\GitHub\buildflow-erp\buildflow.db
```

To backup: Copy `buildflow.db`
To reset: Delete `buildflow.db` (it will recreate on next server start)

---

## 🔧 Running Both Simultaneously

Use one command to run frontend + backend together:

```bash
npm run dev:all
```

This uses `concurrently` to run both servers in one terminal.

---

## 📝 Testing the API

Use Postman or curl to test:

```bash
# Get all projects
curl http://localhost:8000/api/projects

# Create new project
curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Project",
    "client_id": 1,
    "status": "running",
    "budget": 100000
  }'

# Get dashboard stats
curl http://localhost:8000/api/stats
```

---

## ✅ Verification Checklist

- [ ] Backend server running on http://localhost:8000
- [ ] Frontend running on http://localhost:3000
- [ ] Create new project - data saves to database
- [ ] Create new client - data saves to database
- [ ] Dashboard shows real statistics from database
- [ ] Search/filter works with actual data
- [ ] Excel export downloads file
- [ ] Delete operations remove from database

---

## 🐛 Troubleshooting

### Port 8000 Already in Use
```bash
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (Windows)
taskkill /PID <PID> /F
```

### Database Locked Error
- Stop the server
- Delete `buildflow.db`
- Restart server

### CORS Errors
- Make sure backend is running on port 8000
- Check API_BASE in `src/lib/api.ts`

### SQLite3 Installation Issues
```bash
npm install --save-optional sqlite3
```

---

## 🚀 Production Deployment

For production:
1. Use MySQL or PostgreSQL instead of SQLite
2. Host backend on server (Heroku, AWS, DigitalOcean)
3. Update API_BASE URL in `src/lib/api.ts`
4. Deploy frontend to Vercel or Netlify

---

## 📊 Next Steps

1. ✅ Start servers (both backend and frontend)
2. ✅ Test creating projects/clients in UI
3. ✅ Check database file: `buildflow.db`
4. ✅ Export data to Excel
5. ✅ Add more features as needed

---

**BuildFlow ERP - Complete Backend Integration Ready!** 🎉
