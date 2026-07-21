export interface User {
  id: string
  email: string
  name: string
  role: 'super_admin'
  company?: string
  avatar?: string
  createdAt: Date
}

export interface Project {
  id: string
  name: string
  description?: string
  client: Client
  status: 'upcoming' | 'running' | 'completed' | 'delayed' | 'archived'
  startDate: Date
  endDate?: Date
  budget: number
  spent: number
  address?: string
  squareFeet?: number
  length?: number
  width?: number
  numberOfFloors?: number
  buildingType?: string
  images?: string[]
  progress: number
  createdAt: Date
  updatedAt: Date
}

export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  company?: string
  projects?: Project[]
  createdAt: Date
  updatedAt: Date
}

export interface Material {
  id: string
  name: string
  category: 'cement' | 'steel' | 'sand' | 'aggregate' | 'bricks' | 'blocks' | 'tiles' | 'paint' | 'electrical' | 'plumbing' | 'other'
  quantity: number
  unit: string
  unitPrice: number
  supplier?: string
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  createdAt: Date
  updatedAt: Date
}

export interface Floor {
  id: string
  projectId: string
  name: string
  floorNumber: number
  columns?: number
  walls?: number
  slab?: boolean
  beams?: number
  windows?: number
  doors?: number
  tiles?: string
  paint?: string
  electrical?: string
  plumbing?: string
  progress: number
  cost: number
  images?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Expense {
  id: string
  projectId?: string
  description: string
  category: 'material' | 'labour' | 'equipment' | 'transportation' | 'bills' | 'other'
  amount: number
  date: Date
  paymentMethod: 'cash' | 'cheque' | 'bank_transfer' | 'credit_card'
  status: 'pending' | 'approved' | 'paid'
  createdAt: Date
  updatedAt: Date
}

export interface Estimation {
  id: string
  projectId: string
  category: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
  createdAt: Date
  updatedAt: Date
}

export interface DashboardStats {
  totalProjects: number
  completedProjects: number
  runningProjects: number
  upcomingProjects: number
  delayedProjects: number
  totalClients: number
  monthlyRevenue: number
  totalExpenses: number
  profit: number
  materialCost: number
  labourCost: number
  pendingPayments: number
}

export interface Activity {
  id: string
  type: string
  description: string
  user: User
  timestamp: Date
  projectId?: string
  metadata?: Record<string, any>
}
