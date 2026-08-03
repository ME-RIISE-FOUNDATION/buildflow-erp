// Construction Management Utilities

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`
}

export const formatCurrencyShort = (amount: number): string => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
  return `₹${amount}`
}

export const calculateProjectHealth = (progress: number, budgetUsage: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' => {
  if (progress >= 75 && budgetUsage <= 85) return 'Excellent'
  if (progress >= 50 && budgetUsage <= 100) return 'Good'
  if (progress >= 25 && budgetUsage <= 120) return 'Fair'
  return 'Poor'
}

export const calculateBusinessHealth = (kpis: any): 'Excellent' | 'Good' | 'Fair' | 'Poor' => {
  const profitMargin = (kpis.profitLoss / kpis.totalRevenue) * 100
  const projectCompletion = (kpis.completedProjects / kpis.totalProjects) * 100
  const score = (profitMargin * 0.4 + projectCompletion * 0.6) / 100

  if (score >= 0.75) return 'Excellent'
  if (score >= 0.5) return 'Good'
  if (score >= 0.25) return 'Fair'
  return 'Poor'
}

export const calculateBudgetUtilization = (expense: number, budget: number): number => {
  return (expense / budget) * 100
}

export const calculateProjectProgress = (completedTasks: number, totalTasks: number): number => {
  return (completedTasks / totalTasks) * 100
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Completed':
    case 'Paid':
      return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    case 'In Progress':
      return 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
    case 'On Hold':
    case 'Pending':
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
    case 'Planned':
      return 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
    default:
      return 'bg-secondary-500/10 text-secondary-400 border border-secondary-500/20'
  }
}

export const getStatusBadgeColor = (status: string): { bg: string; text: string; icon: string } => {
  switch (status) {
    case 'Completed':
      return { bg: 'bg-emerald-600', text: 'text-white', icon: '✓' }
    case 'In Progress':
      return { bg: 'bg-blue-600', text: 'text-white', icon: '⟳' }
    case 'On Hold':
      return { bg: 'bg-amber-600', text: 'text-white', icon: '⏸' }
    case 'Paid':
      return { bg: 'bg-emerald-600', text: 'text-white', icon: '✓' }
    case 'Pending':
      return { bg: 'bg-amber-600', text: 'text-white', icon: '⏱' }
    default:
      return { bg: 'bg-secondary-600', text: 'text-white', icon: '◯' }
  }
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const calculateDaysRemaining = (endDate: string): number => {
  const end = new Date(endDate)
  const today = new Date()
  const diff = end.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export const calculateProjectDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diff = end.getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export const searchProjects = (projects: any[], query: string) => {
  return projects.filter(project =>
    project.name.toLowerCase().includes(query.toLowerCase()) ||
    project.client.toLowerCase().includes(query.toLowerCase()) ||
    project.location.toLowerCase().includes(query.toLowerCase())
  )
}

export const filterProjects = (projects: any[], filters: any) => {
  return projects.filter(project => {
    if (filters.status && project.status !== filters.status) return false
    if (filters.type && project.type !== filters.type) return false
    if (filters.minBudget && project.budget < filters.minBudget) return false
    if (filters.maxBudget && project.budget > filters.maxBudget) return false
    return true
  })
}

export const sortProjects = (projects: any[], sortBy: string, order: 'asc' | 'desc' = 'desc') => {
  const sorted = [...projects].sort((a, b) => {
    let aVal = a[sortBy]
    let bVal = b[sortBy]

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }

    if (order === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
  return sorted
}

export const generateProjectReport = (project: any) => {
  const budgetUsage = calculateBudgetUtilization(project.expense, project.budget)
  const profit = project.revenue - project.expense
  const profitMargin = (profit / project.revenue) * 100

  return {
    projectName: project.name,
    client: project.client,
    status: project.status,
    progress: project.progress,
    budget: project.budget,
    expense: project.expense,
    revenue: project.revenue,
    profit: profit,
    profitMargin: profitMargin,
    budgetUsage: budgetUsage,
    health: calculateProjectHealth(project.progress, budgetUsage),
    daysRemaining: calculateDaysRemaining(project.endDate),
    duration: calculateProjectDuration(project.startDate, project.endDate),
  }
}

export const calculateMonthlyRevenue = (projects: any[]): number => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return projects.reduce((total, project) => {
    const projectDate = new Date(project.createdAt)
    if (projectDate.getMonth() === currentMonth && projectDate.getFullYear() === currentYear) {
      return total + project.revenue
    }
    return total
  }, 0)
}

export const calculateMonthlyExpense = (expenses: any[]): number => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return expenses.reduce((total, expense) => {
    const expenseDate = new Date(expense.date)
    if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
      return total + expense.amount
    }
    return total
  }, 0)
}
