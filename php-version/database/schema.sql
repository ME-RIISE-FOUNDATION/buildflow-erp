-- BuildFlow ERP Database Schema
-- PHP/HTML Version

-- Create Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255),
    client_phone VARCHAR(20),
    owner VARCHAR(255) NOT NULL,
    owner_phone VARCHAR(20),
    address TEXT,
    length DECIMAL(10, 2),
    width DECIMAL(10, 2),
    area DECIMAL(15, 2),
    status ENUM('completed', 'running', 'upcoming') DEFAULT 'upcoming',
    progress INT DEFAULT 0,
    budget DECIMAL(15, 2) DEFAULT 0,
    material_cost DECIMAL(15, 2) DEFAULT 0,
    labour_cost DECIMAL(15, 2) DEFAULT 0,
    start_date DATE,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Materials table
CREATE TABLE IF NOT EXISTS materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    used DECIMAL(10, 2) DEFAULT 0,
    unit VARCHAR(50),
    cost DECIMAL(15, 2),
    supplier VARCHAR(255),
    purchase_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create Expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create Construction Progress table
CREATE TABLE IF NOT EXISTS construction_phases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    phase_name VARCHAR(255) NOT NULL,
    progress INT DEFAULT 0,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create Clients table
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(10),
    total_projects INT DEFAULT 0,
    total_paid DECIMAL(15, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Documents table
CREATE TABLE IF NOT EXISTS documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    file_path VARCHAR(500),
    file_size INT,
    description TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create Floor Details table
CREATE TABLE IF NOT EXISTS floor_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    floor_number INT,
    floor_name VARCHAR(100),
    area DECIMAL(15, 2),
    columns_count INT,
    walls_count INT,
    windows_count INT,
    doors_count INT,
    progress INT DEFAULT 0,
    cost DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create Activity Log table
CREATE TABLE IF NOT EXISTS activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(255),
    project_id INT,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- Create Invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    client_id INT,
    invoice_number VARCHAR(50) UNIQUE,
    amount DECIMAL(15, 2),
    paid_amount DECIMAL(15, 2) DEFAULT 0,
    status ENUM('draft', 'sent', 'paid', 'overdue') DEFAULT 'draft',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Create Estimates table
CREATE TABLE IF NOT EXISTS estimates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    estimate_number VARCHAR(50) UNIQUE,
    foundation_cost DECIMAL(15, 2) DEFAULT 0,
    excavation_cost DECIMAL(15, 2) DEFAULT 0,
    pcc_cost DECIMAL(15, 2) DEFAULT 0,
    footing_cost DECIMAL(15, 2) DEFAULT 0,
    column_cost DECIMAL(15, 2) DEFAULT 0,
    beam_cost DECIMAL(15, 2) DEFAULT 0,
    roof_cost DECIMAL(15, 2) DEFAULT 0,
    brick_work_cost DECIMAL(15, 2) DEFAULT 0,
    plastering_cost DECIMAL(15, 2) DEFAULT 0,
    flooring_cost DECIMAL(15, 2) DEFAULT 0,
    painting_cost DECIMAL(15, 2) DEFAULT 0,
    electrical_cost DECIMAL(15, 2) DEFAULT 0,
    plumbing_cost DECIMAL(15, 2) DEFAULT 0,
    total_cost DECIMAL(15, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_project_status ON projects(status);
CREATE INDEX idx_project_created ON projects(created_at);
CREATE INDEX idx_material_project ON materials(project_id);
CREATE INDEX idx_expense_project ON expenses(project_id);
CREATE INDEX idx_expense_date ON expenses(date);
CREATE INDEX idx_client_email ON clients(email);
