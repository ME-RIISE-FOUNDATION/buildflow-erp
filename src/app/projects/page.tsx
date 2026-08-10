'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  ChevronRight,
  User,
  MapPin,
  Ruler,
  Settings,
  Package,
  Calculator,
  TrendingUp,
  FileText,
  MessageSquare,
  BarChart3,
  Edit2,
  Trash2,
  X,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { useProjectStore, type Material, type Project } from '@/store/useProjectStore'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-80 bg-secondary-800/30 rounded-2xl animate-pulse" />,
})

const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'customer', label: 'Customer Profile', icon: User },
  { id: 'owner', label: 'Owner Details', icon: User },
  { id: 'address', label: 'Site Address', icon: MapPin },
  { id: 'measurements', label: 'Property Measurements', icon: Ruler },
  { id: 'details', label: 'Construction Details', icon: Settings },
  { id: 'materials', label: 'Material Management', icon: Package },
  { id: 'estimation', label: 'Cost Estimation', icon: Calculator },
  { id: 'expenses', label: 'Expense Tracker', icon: TrendingUp },
  { id: 'progress', label: 'Construction Progress', icon: BarChart3 },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'notes', label: 'Notes', icon: MessageSquare },
]


export default function ProjectDashboardPage() {
  const { selectedProjectId, getProjectById, addMaterial, deleteMaterial, loadFromStorage } = useProjectStore()

  React.useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])

  const project = selectedProjectId ? getProjectById(selectedProjectId) : null

  const [activeSection, setActiveSection] = useState('overview')
  const [showMaterialModal, setShowMaterialModal] = useState(false)
  const [materialForm, setMaterialForm] = useState({
    name: '',
    quantity: 0,
    used: 0,
    unit: '',
    cost: 0,
    supplier: '',
    purchaseDate: '',
  })

  const remainingBudget = project.budget - project.expenses
  const remainingPercentage = (remainingBudget / project.budget) * 100

  const handleAddMaterial = () => {
    if (!selectedProjectId || !materialForm.name.trim() || !materialForm.unit.trim()) {
      alert('⚠️ Please fill in required fields')
      return
    }

    const newMaterial: Material = {
      id: Date.now(),
      name: materialForm.name,
      quantity: materialForm.quantity,
      used: materialForm.used,
      unit: materialForm.unit,
      cost: materialForm.cost,
      supplier: materialForm.supplier,
      purchaseDate: materialForm.purchaseDate,
    }

    addMaterial(selectedProjectId, newMaterial)
    setMaterialForm({ name: '', quantity: 0, used: 0, unit: '', cost: 0, supplier: '', purchaseDate: '' })
    setShowMaterialModal(false)
    alert('✅ Material added successfully!')
  }

  const handleDeleteMaterial = (materialId: number) => {
    if (!selectedProjectId) return
    deleteMaterial(selectedProjectId, materialId)
    alert('✅ Material deleted!')
  }

  // Chart options
  const progressChartOptions = {
    chart: { type: 'radialBar' as const, toolbar: { show: false } },
    colors: ['#3B82F6'],
    plotOptions: {
      radialBar: {
        hollow: { size: '70%' },
        dataLabels: {
          name: { show: false },
          value: { color: '#fff', fontSize: '18px', fontWeight: 'bold' },
        },
      },
    },
    labels: ['Progress'],
  }

  const expenseChartOptions = {
    chart: { type: 'donut' as const, toolbar: { show: false } },
    colors: ['#10B981', '#EF4444', '#F59E0B'],
    labels: ['Remaining Budget', 'Expenses', 'Reserved'],
    tooltip: { theme: 'dark' as const },
    legend: { position: 'bottom' as const },
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-2xl font-bold text-white mb-2">No Project Selected</p>
          <p className="text-secondary-400">Select a project from the list to view details</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-6 h-full">
      {/* Secondary Sidebar Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-72 flex-shrink-0 bg-secondary-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl overflow-y-auto max-h-[calc(100vh-120px)]"
      >
        <h3 className="text-lg font-bold text-white mb-4">Dashboard Menu</h3>
        <div className="space-y-2">
          {SIDEBAR_ITEMS.map(item => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-primary-600/20 text-primary-400 border-l-2 border-primary-600'
                    : 'text-secondary-300 hover:bg-secondary-800/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
                {activeSection === item.id && <ChevronRight className="w-4 h-4" />}
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
          <p className="text-secondary-400">Client: {project.client_name} | Status: <span className={`font-semibold ${project.status === 'running' ? 'text-blue-400' : project.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>{project.status}</span></p>
        </div>

        {/* Summary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-blue-600/20 to-blue-400/5 border border-blue-500/20 rounded-2xl p-4">
            <p className="text-xs text-secondary-400 mb-1">Total Budget</p>
            <p className="text-2xl font-bold text-blue-400">₹{(project.budget / 100000).toFixed(1)}L</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-red-600/20 to-red-400/5 border border-red-500/20 rounded-2xl p-4">
            <p className="text-xs text-secondary-400 mb-1">Expenses</p>
            <p className="text-2xl font-bold text-red-400">₹{(project.expenses / 100000).toFixed(1)}L</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-emerald-600/20 to-emerald-400/5 border border-emerald-500/20 rounded-2xl p-4">
            <p className="text-xs text-secondary-400 mb-1">Material Cost</p>
            <p className="text-2xl font-bold text-emerald-400">₹{(project.materialCost / 100000).toFixed(1)}L</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-orange-600/20 to-orange-400/5 border border-orange-500/20 rounded-2xl p-4">
            <p className="text-xs text-secondary-400 mb-1">Labour Cost</p>
            <p className="text-2xl font-bold text-orange-400">₹{(project.labourCost / 100000).toFixed(1)}L</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-purple-600/20 to-purple-400/5 border border-purple-500/20 rounded-2xl p-4">
            <p className="text-xs text-secondary-400 mb-1">Progress</p>
            <p className="text-2xl font-bold text-purple-400">{project.progress}%</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-green-600/20 to-green-400/5 border border-green-500/20 rounded-2xl p-4">
            <p className="text-xs text-secondary-400 mb-1">Remaining Budget</p>
            <p className="text-2xl font-bold text-green-400">₹{(remainingBudget / 100000).toFixed(1)}L</p>
          </motion.div>
        </div>

        {/* Dynamic Content Based on Section */}
        <AnimatePresence mode="wait">
          {activeSection === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-secondary-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white mb-4">Project Progress</h3>
                <Chart options={progressChartOptions} series={[project.progress]} type="radialBar" height={280} />
              </div>
              <div className="bg-secondary-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white mb-4">Budget Breakdown</h3>
                <Chart options={expenseChartOptions} series={[remainingBudget, project.expenses, 0]} type="donut" height={280} />
              </div>
            </motion.div>
          )}

          {activeSection === 'materials' && (
            <motion.div key="materials" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Material Management</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowMaterialModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Material
                </motion.button>
              </div>

              <div className="bg-secondary-900/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary-800/50 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-3 text-left text-secondary-300 font-semibold">Material</th>
                        <th className="px-6 py-3 text-left text-secondary-300 font-semibold">Quantity</th>
                        <th className="px-6 py-3 text-left text-secondary-300 font-semibold">Used</th>
                        <th className="px-6 py-3 text-left text-secondary-300 font-semibold">Remaining</th>
                        <th className="px-6 py-3 text-left text-secondary-300 font-semibold">Cost</th>
                        <th className="px-6 py-3 text-left text-secondary-300 font-semibold">Supplier</th>
                        <th className="px-6 py-3 text-left text-secondary-300 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {project.materials.map(material => (
                        <motion.tr key={material.id} whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} className="transition-colors">
                          <td className="px-6 py-3 text-white font-medium">{material.name}</td>
                          <td className="px-6 py-3 text-secondary-300">{material.quantity} {material.unit}</td>
                          <td className="px-6 py-3 text-secondary-300">{material.used} {material.unit}</td>
                          <td className="px-6 py-3 text-secondary-300">{material.quantity - material.used} {material.unit}</td>
                          <td className="px-6 py-3 text-primary-400 font-semibold">₹{(material.cost / 1000).toFixed(0)}K</td>
                          <td className="px-6 py-3 text-secondary-300 text-sm">{material.supplier}</td>
                          <td className="px-6 py-3 flex items-center gap-2">
                            <motion.button whileHover={{ scale: 1.1 }} className="p-1 hover:bg-secondary-700 rounded">
                              <Edit2 className="w-4 h-4 text-secondary-400 hover:text-white" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => handleDeleteMaterial(material.id)}
                              className="p-1 hover:bg-red-600/20 rounded"
                            >
                              <Trash2 className="w-4 h-4 text-secondary-400 hover:text-red-400" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'customer' && (
            <motion.div key="customer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-secondary-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Customer Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-secondary-400 text-sm mb-2">Client Name</p>
                  <p className="text-2xl font-bold text-white">{project.client_name}</p>
                </div>
                <div>
                  <p className="text-secondary-400 text-sm mb-2">Email</p>
                  <p className="text-lg text-white">{project.client_email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-secondary-400 text-sm mb-2">Phone</p>
                  <p className="text-lg text-white">{project.client_phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-secondary-400 text-sm mb-2">Project</p>
                  <p className="text-lg text-white">{project.name}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'owner' && (
            <motion.div key="owner" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-secondary-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Owner Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-secondary-400 text-sm mb-2">Owner Name</p>
                  <p className="text-xl text-white">{project.owner}</p>
                </div>
                <div>
                  <p className="text-secondary-400 text-sm mb-2">Phone</p>
                  <p className="text-xl text-white">{project.ownerPhone}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'address' && (
            <motion.div key="address" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-secondary-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Site Address</h2>
              <p className="text-xl text-secondary-300">{project.address}</p>
            </motion.div>
          )}

          {activeSection === 'measurements' && (
            <motion.div key="measurements" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-secondary-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Property Measurements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <p className="text-secondary-400 text-sm mb-2">Length</p>
                  <p className="text-3xl font-bold text-white">{project.length}m</p>
                </div>
                <div>
                  <p className="text-secondary-400 text-sm mb-2">Width</p>
                  <p className="text-3xl font-bold text-white">{project.width}m</p>
                </div>
                <div>
                  <p className="text-secondary-400 text-sm mb-2">Area (m²)</p>
                  <p className="text-3xl font-bold text-white">{project.area}m²</p>
                </div>
                <div>
                  <p className="text-secondary-400 text-sm mb-2">Square Feet</p>
                  <p className="text-3xl font-bold text-white">{Math.round(project.area * 10.764)} sqft</p>
                </div>
              </div>
            </motion.div>
          )}

          {!['overview', 'customer', 'owner', 'address', 'measurements', 'materials'].includes(activeSection) && (
            <motion.div key="coming-soon" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-secondary-900/80 border border-white/10 rounded-2xl p-12 backdrop-blur-xl text-center">
              <p className="text-secondary-400 text-lg">This section is coming soon</p>
              <p className="text-secondary-500 text-sm mt-2">Check back later for {SIDEBAR_ITEMS.find(i => i.id === activeSection)?.label}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Add Material Modal */}
      <AnimatePresence>
        {showMaterialModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowMaterialModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-secondary-900/90 border border-white/10 rounded-2xl p-8 w-full max-w-2xl backdrop-blur-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Add New Material</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowMaterialModal(false)}
                  className="text-secondary-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Material Name *</label>
                  <input
                    type="text"
                    value={materialForm.name}
                    onChange={(e) => setMaterialForm({ ...materialForm, name: e.target.value })}
                    placeholder="e.g., Cement, Steel, Aggregate..."
                    className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Unit *</label>
                  <input
                    type="text"
                    value={materialForm.unit}
                    onChange={(e) => setMaterialForm({ ...materialForm, unit: e.target.value })}
                    placeholder="e.g., bags, tons, m³, liters, pieces"
                    className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={materialForm.quantity}
                    onChange={(e) => setMaterialForm({ ...materialForm, quantity: parseInt(e.target.value) || 0 })}
                    className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Used Quantity</label>
                  <input
                    type="number"
                    value={materialForm.used}
                    onChange={(e) => setMaterialForm({ ...materialForm, used: parseInt(e.target.value) || 0 })}
                    className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Cost (₹)</label>
                  <input
                    type="number"
                    value={materialForm.cost}
                    onChange={(e) => setMaterialForm({ ...materialForm, cost: parseInt(e.target.value) || 0 })}
                    className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Supplier</label>
                  <input
                    type="text"
                    value={materialForm.supplier}
                    onChange={(e) => setMaterialForm({ ...materialForm, supplier: e.target.value })}
                    placeholder="Supplier name"
                    className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-secondary-300 mb-2">Purchase Date</label>
                  <input
                    type="date"
                    value={materialForm.purchaseDate}
                    onChange={(e) => setMaterialForm({ ...materialForm, purchaseDate: e.target.value })}
                    className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleAddMaterial}
                  className="flex-1 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
                >
                  Add Material
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowMaterialModal(false)}
                  className="flex-1 px-6 py-2.5 bg-secondary-800 hover:bg-secondary-700 text-white rounded-lg font-medium"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
