'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Truck, Phone, Mail } from 'lucide-react'

interface Filters {
  dateRange: { start: string; end: string }
  project: string
  material: string
  workStage: string
  supplier: string
  paymentStatus: string
  search: string
}

export default function ReportSuppliers({ filters }: { filters: Filters }) {
  const suppliers = [
    { name: 'BuildCo Supplies', contact: '+91-9876543210', email: 'contact@buildco.in', materials: 'Cement, Sand', orders: 15, paid: 350000, outstanding: 25000, avgDelivery: '2-3 days' },
    { name: 'Steel Industries Ltd', contact: '+91-9123456780', email: 'sales@steelindustries.in', materials: 'Steel', orders: 8, paid: 280000, outstanding: 45000, avgDelivery: '3-4 days' },
    { name: 'Brick House', contact: '+91-8765432109', email: 'info@brickhouse.in', materials: 'Bricks', orders: 12, paid: 180000, outstanding: 15000, avgDelivery: '1-2 days' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.map((supplier, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-secondary-900/50 to-secondary-900/30 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{supplier.name}</h3>
                <p className="text-sm text-secondary-400">{supplier.materials}</p>
              </div>
              <Truck className="w-6 h-6 text-accent-400" />
            </div>

            <div className="space-y-3 mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-secondary-400" />
                <span className="text-secondary-300">{supplier.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-secondary-400" />
                <span className="text-secondary-300">{supplier.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-secondary-400 mb-1">Total Orders</p>
                <p className="text-white font-bold">{supplier.orders}</p>
              </div>
              <div>
                <p className="text-secondary-400 mb-1">Paid</p>
                <p className="text-green-400 font-bold">₹{(supplier.paid / 100000).toFixed(1)}L</p>
              </div>
              <div>
                <p className="text-secondary-400 mb-1">Outstanding</p>
                <p className="text-yellow-400 font-bold">₹{supplier.outstanding.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-secondary-400 mb-1">Avg Delivery</p>
                <p className="text-primary-400 font-bold">{supplier.avgDelivery}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
