'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, X, Save } from 'lucide-react'
import { useState } from 'react'

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  company: string
}

export default function CustomerProfile({ projectId }: { projectId: number }) {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      company: 'Smith Enterprises',
    },
  ])
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  })

  const handleEditClick = (customer: Customer) => {
    setEditingCustomer(customer)
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
    })
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('⚠️ Please fill all required fields')
      return
    }

    if (editingCustomer) {
      setCustomers(
        customers.map(c =>
          c.id === editingCustomer.id
            ? { ...c, ...formData }
            : c
        )
      )
      alert('✅ Customer profile updated successfully!')
    }
    setShowEditModal(false)
    setEditingCustomer(null)
    setFormData({ name: '', email: '', phone: '', company: '' })
  }

  const handleAddCustomer = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('⚠️ Please fill all required fields')
      return
    }

    const newCustomer: Customer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      ...formData,
    }

    setCustomers([...customers, newCustomer])
    alert('✅ New customer added successfully!')
    setShowAddModal(false)
    setFormData({ name: '', email: '', phone: '', company: '' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Customer Profile</h2>
          <p className="text-secondary-400">Manage customers for this project</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setFormData({ name: '', email: '', phone: '', company: '' })
            setShowAddModal(true)
          }}
          className="btn-primary flex items-center gap-2 rounded-lg px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          Add Customer
        </motion.button>
      </div>

      {/* Customers List */}
      <div className="space-y-4">
        {customers.map((customer) => (
          <motion.div key={customer.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{customer.name}</h3>
                <p className="text-secondary-400 text-sm mb-3">{customer.company}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleEditClick(customer)}
                className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-secondary-400 mb-1">Email</p>
                <p className="text-white font-semibold">{customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-400 mb-1">Phone</p>
                <p className="text-white font-semibold">{customer.phone}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Customer Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card max-w-2xl w-full relative"
            >
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 text-secondary-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-white mb-6">Edit Customer Profile</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-secondary-700 text-secondary-300 hover:text-white transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleSaveEdit}
                  className="flex-1 btn-primary rounded-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Customer Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card max-w-2xl w-full relative"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-secondary-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-white mb-6">Add New Customer</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Jane Doe"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 987-6543"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Name"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-secondary-700 text-secondary-300 hover:text-white transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleAddCustomer}
                  className="flex-1 btn-primary rounded-lg flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Customer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
