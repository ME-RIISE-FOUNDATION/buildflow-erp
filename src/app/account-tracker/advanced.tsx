'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '@/layouts/DashboardLayout'
import EnterpriseKPICards from '@/components/dashboard/EnterpriseKPICards'
import ProjectCard from '@/components/account-tracker/ProjectCard'
import ClientCard from '@/components/account-tracker/ClientCard'
import LabourCard from '@/components/account-tracker/LabourCard'
import SupplierCard from '@/components/account-tracker/SupplierCard'
import StatsCard from '@/components/account-tracker/StatsCard'
import DataTable from '@/components/account-tracker/DataTable'
import SearchFilter from '@/components/account-tracker/SearchFilter'
import Modal from '@/components/account-tracker/Modal'
import AdvancedAnalytics from '@/components/account-tracker/AdvancedAnalytics'
import ActivityTimeline from '@/components/account-tracker/ActivityTimeline'
import { Plus, Download, FileText, Share2, Users, Building2, Wrench, TrendingUp } from 'lucide-react'
import { downloadFile, exportToCSV, exportToExcel } from '@/utils/export'
import { formatCurrency } from '@/utils/construction'

export default function AdvancedDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})

  // Sample Data
  const kpiData = {
    totalProjects: 24,
    completedProjects: 10,
    ongoingProjects: 9,
    totalRevenue: 12500000,
    totalExpense: 8125000,
    totalPaid: 14500000,
    outstandingBalance: 1750000,
    monthlyProgress: 85,
    profitLoss: 8750000,
    totalClients: 15,
    businessHealth: 'Excellent',
  }

  const clients = [
    { id: '1', name: 'Mr. Sharma', email: 'sharma@email.com', phone: '+91-9876543210', address: 'Mumbai', city: 'Mumbai', state: 'MH', pincode: '400001', totalProjects: 5, totalSpent: 2500000, outstandingBalance: 500000, createdAt: '2026-01-01', updatedAt: '2026-07-31' },
    { id: '2', name: 'Mr. Kumar', email: 'kumar@email.com', phone: '+91-9876543211', address: 'Delhi', city: 'Delhi', state: 'DL', pincode: '110001', totalProjects: 3, totalSpent: 1500000, outstandingBalance: 0, createdAt: '2026-02-01', updatedAt: '2026-07-31' },
    { id: '3', name: 'XYZ Corp', email: 'info@xyzco.com', phone: '+91-9876543212', address: 'Bangalore', city: 'Bangalore', state: 'KA', pincode: '560001', totalProjects: 4, totalSpent: 5000000, outstandingBalance: 750000, createdAt: '2026-03-01', updatedAt: '2026-07-31' },
  ]

  const labours: Array<{
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
  }> = [
    { id: '1', name: 'Ravi Kumar', category: 'Skilled', dailyWage: 500, workingDays: 25, totalCost: 12500, attendance: 95, startDate: '2026-06-01', endDate: '2026-07-31', projectId: '1', paymentStatus: 'Paid', createdAt: '2026-06-01', updatedAt: '2026-07-31' },
    { id: '2', name: 'Priya Singh', category: 'Semi-Skilled', dailyWage: 350, workingDays: 28, totalCost: 9800, attendance: 92, startDate: '2026-06-15', endDate: '2026-07-31', projectId: '1', paymentStatus: 'Pending', createdAt: '2026-06-15', updatedAt: '2026-07-31' },
    { id: '3', name: 'Anil Patel', category: 'Unskilled', dailyWage: 250, workingDays: 30, totalCost: 7500, attendance: 98, startDate: '2026-06-01', endDate: '2026-07-31', projectId: '1', paymentStatus: 'Paid', createdAt: '2026-06-01', updatedAt: '2026-07-31' },
  ]

  const suppliers = [
    { id: '1', name: 'BuildCo Supplies', email: 'contact@buildco.com', phone: '+91-9876543220', address: 'Mumbai', city: 'Mumbai', state: 'MH', pincode: '400001', materials: ['Cement', 'Sand'], totalOrders: 15, totalPaid: 350000, outstandingAmount: 25000, avgDeliveryDays: 2, rating: 4.5, createdAt: '2026-01-01', updatedAt: '2026-07-31' },
    { id: '2', name: 'Steel Industries Ltd', email: 'sales@steel.com', phone: '+91-9876543221', address: 'Delhi', city: 'Delhi', state: 'DL', pincode: '110001', materials: ['Steel'], totalOrders: 8, totalPaid: 280000, outstandingAmount: 45000, avgDeliveryDays: 3, rating: 4.2, createdAt: '2026-02-01', updatedAt: '2026-07-31' },
  ]

  const analyticsData = {
    totalSpending: 8125000,
    budgetUtilization: 65,
    cashFlowTrend: [5, 8, 12, 10, 15, 18, 22, 25, 28, 32, 35, 40],
    costByCategory: { Materials: 4500000, Labour: 2000000, Transport: 800000, Equipment: 825000 },
    monthlyTrend: [500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1100000],
    expenseBreakdown: { Materials: 55, Labour: 25, Transport: 10, Equipment: 10 },
  }

  const activities = [
    { id: '1', type: 'payment' as const, title: 'Payment Received', description: '₹50,000 from Mr. Sharma', timestamp: new Date().toISOString(), icon: '✓', color: 'bg-emerald-500' },
    { id: '2', type: 'expense' as const, title: 'Material Purchased', description: 'Cement - 500 bags', timestamp: new Date(Date.now() - 3600000).toISOString(), icon: '📦', color: 'bg-orange-500' },
  ]

  // Tabs
  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'labour', label: 'Labour', icon: Wrench },
    { id: 'suppliers', label: 'Suppliers', icon: Building2 },
    { id: 'analytics', label: 'Analytics', icon: FileText },
  ]

  const openModal = (type: string) => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalType(null)
  }

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    const data = activeTab === 'clients' ? clients : activeTab === 'labour' ? labours : suppliers
    const filename = `${activeTab}-report-${new Date().toISOString().split('T')[0]}`

    if (format === 'csv') {
      const columns = activeTab === 'clients' ? ['name', 'email', 'phone', 'totalSpent', 'outstandingBalance'] : activeTab === 'labour' ? ['name', 'category', 'dailyWage', 'totalCost', 'attendance'] : ['name', 'materials', 'totalOrders', 'totalPaid']
      exportToCSV(filename, data, columns)
    } else if (format === 'excel') {
      const columns = activeTab === 'clients' ? ['name', 'email', 'phone', 'totalSpent', 'outstandingBalance'] : activeTab === 'labour' ? ['name', 'category', 'dailyWage', 'totalCost', 'attendance'] : ['name', 'materials', 'totalOrders', 'totalPaid']
      exportToExcel(filename, data, columns)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Advanced Dashboard</h1>
            <p className="text-secondary-400">Complete construction management suite</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleExport('excel')}
              className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Excel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleExport('csv')}
              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4" />
              CSV
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <EnterpriseKPICards kpis={kpiData} />

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-secondary-800/50 text-secondary-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            )
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <AdvancedAnalytics data={analyticsData} period="monthly" />
                </div>
                <div>
                  <div className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
                    <h3 className="text-lg font-bold text-white mb-6">Recent Activities</h3>
                    <ActivityTimeline activities={activities} limit={5} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'clients' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Manage Clients</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openModal('addClient')}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Client
                  </motion.button>
                </div>
                <SearchFilter
                  onSearch={setSearchQuery}
                  onFilter={setFilters}
                  placeholder="Search clients..."
                  filters={[
                    { name: 'status', label: 'Status', options: [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }] },
                  ]}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {clients.map(client => (
                    <ClientCard
                      key={client.id}
                      client={client}
                      onEdit={() => openModal('editClient')}
                      onDelete={() => alert(`Delete ${client.name}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'labour' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Labour Management</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openModal('addLabour')}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Labour
                  </motion.button>
                </div>
                <SearchFilter
                  onSearch={setSearchQuery}
                  onFilter={setFilters}
                  placeholder="Search labour..."
                  filters={[
                    { name: 'category', label: 'Category', options: [{ label: 'Skilled', value: 'skilled' }, { label: 'Semi-Skilled', value: 'semi-skilled' }, { label: 'Unskilled', value: 'unskilled' }] },
                  ]}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {labours.map(labour => (
                    <LabourCard
                      key={labour.id}
                      labour={labour}
                      onEdit={() => openModal('editLabour')}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'suppliers' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Supplier Management</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openModal('addSupplier')}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Supplier
                  </motion.button>
                </div>
                <SearchFilter
                  onSearch={setSearchQuery}
                  onFilter={setFilters}
                  placeholder="Search suppliers..."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {suppliers.map(supplier => (
                    <SupplierCard
                      key={supplier.id}
                      supplier={supplier}
                      onEdit={() => openModal('editSupplier')}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <AdvancedAnalytics data={analyticsData} period="monthly" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalType === 'addClient' ? 'Add New Client' : modalType === 'addLabour' ? 'Add Labour' : 'Add Supplier'}
          description={`Create a new ${modalType?.replace('add', '').toLowerCase()}`}
        >
          <form onSubmit={(e) => { e.preventDefault(); closeModal(); }} className="space-y-4">
            <input type="text" placeholder="Name" className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-secondary-500" required />
            <input type="email" placeholder="Email" className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-secondary-500" required />
            <input type="tel" placeholder="Phone" className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-secondary-500" />
            <button type="submit" className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold py-2 rounded-lg">
              Create
            </button>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
