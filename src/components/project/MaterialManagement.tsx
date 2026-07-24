'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

interface Material {
  id: number
  name: string
  category: string
  quantity: number
  unit: string
  cost_per_unit: number
  total_cost: number
  supplier: string
  purchase_date: string
  used_quantity: number
  remaining_quantity: number
}

interface MaterialManagementProps {
  projectId: number
}

const materialCategories = [
  'Cement',
  'Steel',
  'Sand',
  'Aggregate',
  'Bricks',
  'Blocks',
  'Tiles',
  'Paint',
  'Plumbing',
  'Electrical',
]

export default function MaterialManagement({ projectId }: MaterialManagementProps) {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      name: 'Portland Cement',
      category: 'Cement',
      quantity: 500,
      unit: 'bags',
      cost_per_unit: 8,
      total_cost: 4000,
      supplier: 'BuildCo Supplies',
      purchase_date: '2026-07-15',
      used_quantity: 200,
      remaining_quantity: 300,
    },
    {
      id: 2,
      name: 'Steel TMT Bars',
      category: 'Steel',
      quantity: 2000,
      unit: 'kg',
      cost_per_unit: 65,
      total_cost: 130000,
      supplier: 'Steel Industries Ltd',
      purchase_date: '2026-07-10',
      used_quantity: 800,
      remaining_quantity: 1200,
    },
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cement',
    quantity: '',
    unit: 'bags',
    cost_per_unit: '',
    supplier: '',
    purchase_date: '',
    used_quantity: '',
  })

  const handleAddMaterial = () => {
    const quantity = parseFloat(formData.quantity)
    const cost_per_unit = parseFloat(formData.cost_per_unit)

    if (!formData.name || !formData.quantity || !formData.cost_per_unit) {
      alert('⚠️ Please fill all required fields (Name, Quantity, Cost per Unit)')
      return
    }

    if (isNaN(quantity) || quantity <= 0) {
      alert('⚠️ Quantity must be a valid positive number')
      return
    }

    if (isNaN(cost_per_unit) || cost_per_unit <= 0) {
      alert('⚠️ Cost per Unit must be a valid positive number')
      return
    }

    const used_quantity = parseFloat(formData.used_quantity) || 0

    const newMaterial: Material = {
      id: editingId || Date.now(),
      name: formData.name,
      category: formData.category,
      quantity,
      unit: formData.unit,
      cost_per_unit,
      total_cost: quantity * cost_per_unit,
      supplier: formData.supplier,
      purchase_date: formData.purchase_date,
      used_quantity,
      remaining_quantity: quantity - used_quantity,
    }

    if (editingId) {
      setMaterials(materials.map(m => m.id === editingId ? newMaterial : m))
      setEditingId(null)
      alert('✅ Material updated successfully!')
    } else {
      setMaterials([...materials, newMaterial])
      alert('✅ Material added successfully!')
    }

    resetForm()
    setShowModal(false)
  }

  const handleEdit = (material: Material) => {
    setFormData({
      name: material.name,
      category: material.category,
      quantity: material.quantity.toString(),
      unit: material.unit,
      cost_per_unit: material.cost_per_unit.toString(),
      supplier: material.supplier,
      purchase_date: material.purchase_date,
      used_quantity: material.used_quantity.toString(),
    })
    setEditingId(material.id)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    setMaterials(materials.filter(m => m.id !== id))
    alert('✅ Material deleted successfully!')
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Cement',
      quantity: '',
      unit: 'bags',
      cost_per_unit: '',
      supplier: '',
      purchase_date: '',
      used_quantity: '',
    })
    setEditingId(null)
  }

  const totalMaterialCost = materials.reduce((sum, m) => sum + m.total_cost, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Material Management</h2>
            <p className="text-secondary-400">Manage construction materials and inventory</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="btn-primary flex items-center gap-2 rounded-lg px-6 py-3"
          >
            <Plus className="w-5 h-5" />
            Add Material
          </motion.button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <motion.div className="card bg-gradient-to-br from-primary-600/10 to-primary-400/10">
          <p className="text-secondary-400 text-sm mb-2">Total Items</p>
          <p className="text-3xl font-bold text-white">{materials.length}</p>
        </motion.div>
        <motion.div className="card bg-gradient-to-br from-accent-600/10 to-accent-400/10">
          <p className="text-secondary-400 text-sm mb-2">Total Cost</p>
          <p className="text-3xl font-bold text-accent-400">₹{(totalMaterialCost / 100000).toFixed(1)}L</p>
        </motion.div>
        <motion.div className="card bg-gradient-to-br from-green-600/10 to-green-400/10">
          <p className="text-secondary-400 text-sm mb-2">Used Items</p>
          <p className="text-3xl font-bold text-green-400">
            {materials.reduce((sum, m) => sum + m.used_quantity, 0).toFixed(0)}
          </p>
        </motion.div>
        <motion.div className="card bg-gradient-to-br from-blue-600/10 to-blue-400/10">
          <p className="text-secondary-400 text-sm mb-2">Remaining</p>
          <p className="text-3xl font-bold text-blue-400">
            {materials.reduce((sum, m) => sum + m.remaining_quantity, 0).toFixed(0)}
          </p>
        </motion.div>
      </motion.div>

      {/* Materials Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card overflow-x-auto"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Material</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Category</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Quantity</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Used</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Remaining</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Unit Cost</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Total Cost</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Supplier</th>
              <th className="text-center py-4 px-6 font-semibold text-secondary-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, index) => (
              <motion.tr
                key={material.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5 hover:bg-secondary-800/30 transition-colors"
              >
                <td className="py-4 px-6 font-semibold text-white">{material.name}</td>
                <td className="py-4 px-6 text-secondary-400">
                  <span className="px-3 py-1 rounded-full text-xs bg-secondary-800 text-secondary-300">
                    {material.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-secondary-400">
                  {material.quantity} {material.unit}
                </td>
                <td className="py-4 px-6 text-secondary-400">{material.used_quantity}</td>
                <td className="py-4 px-6">
                  <span className="text-green-400 font-semibold">{material.remaining_quantity}</span>
                </td>
                <td className="py-4 px-6 text-secondary-400">₹{material.cost_per_unit.toFixed(2)}</td>
                <td className="py-4 px-6 font-semibold text-primary-400">
                  ₹{material.total_cost.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-secondary-400 text-sm">{material.supplier}</td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleEdit(material)}
                      className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-400"
                    >
                      <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleDelete(material.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {materials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary-400">No materials added yet</p>
          </div>
        )}
      </motion.div>

      {/* Add/Edit Material Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card max-w-2xl w-full relative my-8"
            >
              <button
                onClick={() => {
                  setShowModal(false)
                  resetForm()
                }}
                className="absolute top-4 right-4 text-secondary-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-white mb-6">
                {editingId ? 'Edit Material' : 'Add New Material'}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Material Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Portland Cement"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  >
                    {materialCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Quantity *</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="0"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="bags, kg, liters, etc"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Cost Per Unit (₹) *</label>
                  <input
                    type="number"
                    value={formData.cost_per_unit}
                    onChange={(e) => setFormData({ ...formData, cost_per_unit: e.target.value })}
                    placeholder="0.00"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Used Quantity</label>
                  <input
                    type="number"
                    value={formData.used_quantity}
                    onChange={(e) => setFormData({ ...formData, used_quantity: e.target.value })}
                    placeholder="0"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Supplier</label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    placeholder="Supplier name"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Purchase Date</label>
                  <input
                    type="date"
                    value={formData.purchase_date}
                    onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="flex-1 px-4 py-2 rounded-lg border border-secondary-700 text-secondary-300 hover:text-white transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleAddMaterial}
                  className="flex-1 btn-primary rounded-lg"
                >
                  {editingId ? 'Update' : 'Add'} Material
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
