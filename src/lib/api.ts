const API_BASE = 'http://localhost:8000/api';

export const api = {
  // Projects
  getProjects: () => fetch(`${API_BASE}/projects`).then(r => r.json()),
  createProject: (data: any) =>
    fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
  updateProject: (id: number, data: any) =>
    fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
  deleteProject: (id: number) =>
    fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Clients
  getClients: () => fetch(`${API_BASE}/clients`).then(r => r.json()),
  createClient: (data: any) =>
    fetch(`${API_BASE}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
  updateClient: (id: number, data: any) =>
    fetch(`${API_BASE}/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
  deleteClient: (id: number) =>
    fetch(`${API_BASE}/clients/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Materials
  getMaterials: () => fetch(`${API_BASE}/materials`).then(r => r.json()),
  createMaterial: (data: any) =>
    fetch(`${API_BASE}/materials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
  deleteMaterial: (id: number) =>
    fetch(`${API_BASE}/materials/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Expenses
  getExpenses: () => fetch(`${API_BASE}/expenses`).then(r => r.json()),
  createExpense: (data: any) =>
    fetch(`${API_BASE}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // Stats
  getStats: () => fetch(`${API_BASE}/stats`).then(r => r.json()),

  // Export
  exportExcel: () => window.location.href = `${API_BASE}/export/excel`,
};
