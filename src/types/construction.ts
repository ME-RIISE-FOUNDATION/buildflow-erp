// Construction Management Types

export interface Project {
  id: string
  name: string
  client: string
  type: 'Residential' | 'Commercial' | 'Interior' | 'Renovation' | 'Other'
  status: 'Planned' | 'In Progress' | 'Completed' | 'On Hold'
  startDate: string
  endDate: string
  budget: number
  revenue: number
  expense: number
  progress: number
  location: string
  description: string
  image?: string
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  gstNo?: string
  totalProjects: number
  totalSpent: number
  outstandingBalance: number
  createdAt: string
  updatedAt: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  projectId: string
  clientId: string
  amount: number
  gst: number
  totalAmount: number
  issueDate: string
  dueDate: string
  status: 'Pending' | 'Paid' | 'Overdue'
  description: string
  paidDate?: string
  paymentMethod?: string
  createdAt: string
  updatedAt: string
}

export interface Expense {
  id: string
  projectId: string
  type: 'Material' | 'Labour' | 'Equipment' | 'Transport' | 'Other'
  description: string
  amount: number
  category: string
  date: string
  supplierId?: string
  invoiceNumber?: string
  status: 'Pending' | 'Completed'
  createdAt: string
  updatedAt: string
}

export interface Material {
  id: string
  name: string
  category: 'Cement' | 'Steel' | 'Bricks' | 'Sand' | 'Aggregate' | 'Paint' | 'Tiles' | 'Wood' | 'Electrical' | 'Plumbing' | 'Labour' | 'Other'
  unit: 'Bag' | 'Ton' | 'Kg' | 'Liter' | 'Meter' | 'Piece' | 'Days' | 'Hour'
  quantity: number
  unitRate: number
  totalCost: number
  supplierId: string
  invoiceNumber: string
  purchaseDate: string
  workStage: string
  paymentStatus: 'Pending' | 'Paid'
  remainingBudget: number
  createdAt: string
  updatedAt: string
}

export interface Labour {
  id: string
  name: string
  category: 'Skilled' | 'Semi-Skilled' | 'Unskilled'
  dailyWage: number
  workingDays: number
  totalCost: number
  attendance: number
  startDate: string
  endDate: string
  projectId: string
  paymentStatus: 'Pending' | 'Paid'
  createdAt: string
  updatedAt: string
}

export interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  gstNo?: string
  materials: string[]
  totalOrders: number
  totalPaid: number
  outstandingAmount: number
  avgDeliveryDays: number
  rating: number
  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: string
  type: 'payment' | 'expense' | 'project' | 'client' | 'material' | 'file' | 'invoice'
  title: string
  description: string
  projectId?: string
  clientId?: string
  amount?: number
  timestamp: string
  icon: string
  color: string
}

export interface KPI {
  totalProjects: number
  completedProjects: number
  ongoingProjects: number
  totalRevenue: number
  totalExpense: number
  totalPaid: number
  outstandingBalance: number
  monthlyProgress: number
  profitLoss: number
  totalClients: number
  businessHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor'
}

export interface FileUpload {
  id: string
  name: string
  type: 'PDF' | 'Excel' | 'Word' | 'Image' | 'Other'
  size: number
  url: string
  category: 'Agreement' | 'BOQ' | 'Quotation' | 'Bill' | 'Photo' | 'Drawing' | 'Other'
  projectId: string
  uploadedAt: string
  uploadedBy: string
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor?: string
    backgroundColor?: string
  }[]
}
