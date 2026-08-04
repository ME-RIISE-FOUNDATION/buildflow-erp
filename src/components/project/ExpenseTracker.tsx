'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import { useState } from 'react'

interface Expense {
  id: number
  date: string
  description: string
  category: string
  amount: number
  status: 'Paid' | 'Pending'
}

export default function ExpenseTracker({ projectId }: { projectId: number }) {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, date: '2026-07-20', description: 'Cement Purchase', category: 'Material', amount: 4000, status: 'Paid' },
    { id: 2, date: '2026-07-19', description: 'Labour Payment', category: 'Labour', amount: 8500, status: 'Paid' },
    { id: 3, date: '2026-07-18', description: 'Steel Delivery', category: 'Material', amount: 15000, status: 'Pending' },
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: 'Material',
    amount: '',
    status: 'Pending' as 'Paid' | 'Pending',
  })

  const handleAddExpense = () => {
    const amount = parseFloat(formData.amount)

    if (!formData.date || !formData.description || !formData.amount) {
      alert('⚠️ Please fill all required fields (Date, Description, Amount)')
      return
    }

    if (isNaN(amount) || amount <= 0) {
      alert('⚠️ Amount must be a valid positive number')
      return
    }

    const newExpense: Expense = {
      id: editingId || Date.now(),
      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount,
      status: formData.status,
    }

    if (editingId) {
      setExpenses(expenses.map(e => e.id === editingId ? newExpense : e))
      setEditingId(null)
      alert('✅ Expense updated successfully!')
    } else {
      setExpenses([...expenses, newExpense])
      alert('✅ Expense added successfully!')
    }

    setFormData({ date: '', description: '', category: 'Material', amount: '', status: 'Pending' })
    setShowModal(false)
  }

  const handleEdit = (expense: Expense) => {
    setFormData({
      date: expense.date,
      description: expense.description,
      category: expense.category,
      amount: expense.amount.toString(),
      status: expense.status,
    })
    setEditingId(expense.id)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id))
    alert('✅ Expense deleted successfully!')
  }

  const totalSpent = expenses.filter(e => e.status === 'Paid').reduce((sum, e) => sum + e.amount, 0)
  const pending = expenses.filter(e => e.status === 'Pending').reduce((sum, e) => sum + e.amount, 0)
  const budgetRemaining = 250000 - totalSpent

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Expense Tracker</h2>
          <p className="text-secondary-400">Track all project expenses</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setEditingId(null)
            setFormData({ date: new Date().toISOString().split('T')[0], description: '', category: 'Material', amount: '', status: 'Pending' })
            setShowModal(true)
          }}
          className="btn-primary flex items-center gap-2 rounded-lg px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          Add Expense
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

              <h3 className="text-2xl font-bold text-white mb-6">{editingId ? 'Edit' : 'Add'} Expense</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  >
                    <option>Material</option>
                    <option>Labour</option>
                    <option>Equipment</option>
                    <option>Transportation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-secondary-300 mb-2">Description *</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g., Cement Purchase"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Amount (₹) *</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Paid' | 'Pending' })}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
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
                  onClick={handleAddExpense}
                  className="flex-1 btn-primary rounded-lg"
                >
                  {editingId ? 'Update' : 'Add'} Expense
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, color: 'from-orange-600' },
          { label: 'Pending', value: `₹${pending.toLocaleString()}`, color: 'from-yellow-600' },
          { label: 'Budget Remaining', value: `₹${budgetRemaining.toLocaleString()}`, color: 'from-green-600' },
        ].map((item) => (
          <motion.div key={item.label} className={`card bg-gradient-to-br ${item.color} bg-opacity-10`}>
            <p className="text-secondary-400 text-sm mb-2">{item.label}</p>
            <p className="text-3xl font-bold text-white">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Date</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Description</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Category</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Amount</th>
              <th className="text-left py-4 px-6 font-semibold text-secondary-300">Status</th>
              <th className="text-center py-4 px-6 font-semibold text-secondary-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-secondary-800/30">
                <td className="py-4 px-6 text-secondary-400">{item.date}</td>
                <td className="py-4 px-6 text-white font-semibold">{item.description}</td>
                <td className="py-4 px-6 text-secondary-400">{item.category}</td>
                <td className="py-4 px-6 text-primary-400 font-semibold">₹{item.amount.toLocaleString()}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'Paid' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {item.status}
                  </span>
                </td>
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
      </div>
    </motion.div>
  )
}
