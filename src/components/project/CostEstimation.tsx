'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import { useState } from 'react'

interface Estimate {
  id: number
  category: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  amount: number
}

export default function CostEstimation({ projectId }: { projectId: number }) {
  const [estimates, setEstimates] = useState<Estimate[]>([
    { id: 1, category: 'Foundation', description: 'Excavation & PCC', quantity: 500, unit: 'cu.m', unitPrice: 150, amount: 75000 },
    { id: 2, category: 'Structural', description: 'Concrete & Steel', quantity: 1200, unit: 'cu.m', unitPrice: 200, amount: 240000 },
    { id: 3, category: 'Finishing', description: 'Tiles & Paint', quantity: 12000, unit: 'sq ft', unitPrice: 10, amount: 120000 },
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    category: 'Foundation',
    description: '',
    quantity: '',
    unit: 'cu.m',
    unitPrice: '',
  })

  const handleAddEstimate = () => {
    if (formData.description && formData.quantity && formData.unitPrice) {
      const quantity = parseFloat(formData.quantity)
      const unitPrice = parseFloat(formData.unitPrice)
      const amount = quantity * unitPrice

      const newEstimate: Estimate = {
        id: editingId || Date.now(),
        category: formData.category,
        description: formData.description,
        quantity,
        unit: formData.unit,
        unitPrice,
        amount,
      }

      if (editingId) {
        setEstimates(estimates.map(e => e.id === editingId ? newEstimate : e))
        setEditingId(null)
      } else {
        setEstimates([...estimates, newEstimate])
      }

      setFormData({ category: 'Foundation', description: '', quantity: '', unit: 'cu.m', unitPrice: '' })
      setShowModal(false)
      alert('✅ Estimate added/updated successfully!')
    }
  }

  const handleEdit = (estimate: Estimate) => {
    setFormData({
      category: estimate.category,
      description: estimate.description,
      quantity: estimate.quantity.toString(),
      unit: estimate.unit,
      unitPrice: estimate.unitPrice.toString(),
    })
    setEditingId(estimate.id)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    setEstimates(estimates.filter(e => e.id !== id))
    alert('✅ Estimate deleted successfully!')
  }

  const totalAmount = estimates.reduce((sum, e) => sum + e.amount, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Cost Estimation</h2>
          <p className="text-secondary-400">Project cost breakdown and BOQ</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setEditingId(null)
            setFormData({ category: 'Foundation', description: '', quantity: '', unit: 'cu.m', unitPrice: '' })
            setShowModal(true)
          }}
          className="btn-primary flex items-center gap-2 rounded-lg px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          Add Estimate
        </motion.button>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card max-w-2xl w-full relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-secondary-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-white mb-6">{editingId ? 'Edit' : 'Add'} Estimate</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  >
                    <option>Foundation</option>
                    <option>Structural</option>
                    <option>Finishing</option>
                    <option>Electrical</option>
                    <option>Plumbing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Description *</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g., Excavation & PCC"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
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
                    placeholder="cu.m, sq ft, etc"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-secondary-300 mb-2">Unit Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                    placeholder="0.00"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-secondary-700 text-secondary-300 hover:text-white transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleAddEstimate}
                  className="flex-1 btn-primary rounded-lg"
                >
                  {editingId ? 'Update' : 'Add'} Estimate
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Category</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Description</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Quantity</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Unit</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Unit Price</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Amount</th>
              <th className="text-center py-4 px-6 font-semibold text-secondary-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-secondary-800/30">
                <td className="py-4 px-6 font-semibold text-white">{item.category}</td>
                <td className="py-4 px-6 text-secondary-400">{item.description}</td>
                <td className="py-4 px-6 text-secondary-400">{item.quantity}</td>
                <td className="py-4 px-6 text-secondary-400">{item.unit}</td>
                <td className="py-4 px-6 text-secondary-400">₹{item.unitPrice.toLocaleString()}</td>
                <td className="py-4 px-6 font-semibold text-primary-400">₹{item.amount.toLocaleString()}</td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-400"
                    >
                      <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleDelete(item.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 pt-6 border-t border-white/10 flex justify-end">
          <div className="text-right">
            <p className="text-secondary-400 mb-2">Total Estimated Cost</p>
            <p className="text-3xl font-bold text-primary-400">₹{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
