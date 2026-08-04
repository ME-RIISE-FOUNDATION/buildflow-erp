'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Truck, Phone, Mail, Star, TrendingDown, Package, AlertCircle } from 'lucide-react'
import { formatCurrencyShort } from '@/utils/construction'
import type { Supplier } from '@/types/construction'

interface SupplierCardProps {
  supplier: Supplier
  onEdit?: (supplier: Supplier) => void
}

export default function SupplierCard({ supplier, onEdit }: SupplierCardProps) {
  const paymentStatus = supplier.outstandingAmount > 0 ? 'Pending' : 'Paid'
  const statusColor = paymentStatus === 'Pending' ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'

  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={() => onEdit?.(supplier)}
      className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl hover:border-white/10 transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{supplier.name}</h3>
          <p className="text-sm text-secondary-400">{supplier.materials.length} materials supplied</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-400 p-3 rounded-lg">
          <Truck className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Rating & Payment Status */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(supplier.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-secondary-600'}`}
            />
          ))}
          <span className="text-xs text-secondary-400 ml-1">{supplier.rating.toFixed(1)}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColor}`}>
          {paymentStatus}
        </span>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-secondary-400" />
          <span className="text-secondary-300">{supplier.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-secondary-400" />
          <span className="text-secondary-300 truncate">{supplier.email}</span>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-secondary-400 mb-1">Total Paid</p>
          <div className="flex items-center gap-1">
            <p className="text-lg font-bold text-emerald-400">{formatCurrencyShort(supplier.totalPaid)}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-secondary-400 mb-1">Outstanding</p>
          <div className="flex items-center gap-1">
            <p className="text-lg font-bold text-orange-400">{formatCurrencyShort(supplier.outstandingAmount)}</p>
          </div>
        </div>
      </div>

      {/* Delivery Performance */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-secondary-800/30 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-1">
            <Package className="w-3 h-3 text-secondary-400" />
            <p className="text-xs text-secondary-400">Total Orders</p>
          </div>
          <p className="text-sm font-bold text-white">{supplier.totalOrders}</p>
        </div>
        <div className="bg-secondary-800/30 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-1">
            <TrendingDown className="w-3 h-3 text-secondary-400" />
            <p className="text-xs text-secondary-400">Avg Delivery</p>
          </div>
          <p className="text-sm font-bold text-white">{supplier.avgDeliveryDays} days</p>
        </div>
      </div>
    </motion.div>
  )
}
