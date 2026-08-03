'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Calendar, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/utils/construction'
import type { Labour } from '@/types/construction'

interface LabourCardProps {
  labour: Labour
  onEdit?: (labour: Labour) => void
}

export default function LabourCard({ labour, onEdit }: LabourCardProps) {
  const attendanceColor = labour.attendance >= 90 ? 'text-emerald-400' : labour.attendance >= 75 ? 'text-orange-400' : 'text-red-400'
  const statusColor = labour.paymentStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'

  const categoryColor = {
    'Skilled': 'from-blue-600 to-blue-400',
    'Semi-Skilled': 'from-amber-600 to-amber-400',
    'Unskilled': 'from-slate-600 to-slate-400',
  }[labour.category] || 'from-primary-600 to-primary-400'

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => onEdit?.(labour)}
      className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-2xl p-5 backdrop-blur-xl hover:border-white/10 transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-base font-bold text-white mb-1">{labour.name}</h3>
          <span className={`inline-block text-xs px-2 py-1 rounded-full font-semibold ${statusColor}`}>
            {labour.paymentStatus}
          </span>
        </div>
        <div className={`bg-gradient-to-br ${categoryColor} p-3 rounded-lg`}>
          <Users className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Category & Status */}
      <div className="mb-3 pb-3 border-b border-white/5">
        <p className="text-xs text-secondary-400">Category</p>
        <p className="text-sm font-semibold text-white">{labour.category} Labour</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-secondary-800/30 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-1">
            <DollarSign className="w-3 h-3 text-secondary-400" />
            <p className="text-xs text-secondary-400">Daily Wage</p>
          </div>
          <p className="text-sm font-bold text-white">₹{labour.dailyWage}</p>
        </div>
        <div className="bg-secondary-800/30 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-1">
            <Calendar className="w-3 h-3 text-secondary-400" />
            <p className="text-xs text-secondary-400">Working Days</p>
          </div>
          <p className="text-sm font-bold text-white">{labour.workingDays}</p>
        </div>
      </div>

      {/* Attendance */}
      <div className="mb-3 pb-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-secondary-400">Attendance</p>
          <span className={`text-sm font-bold ${attendanceColor}`}>{labour.attendance}%</span>
        </div>
        <div className="w-full h-2 bg-secondary-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${labour.attendance}%` }}
            transition={{ duration: 1 }}
            className={`h-full bg-gradient-to-r ${
              labour.attendance >= 90
                ? 'from-emerald-600 to-emerald-400'
                : labour.attendance >= 75
                ? 'from-amber-600 to-amber-400'
                : 'from-red-600 to-red-400'
            }`}
          />
        </div>
      </div>

      {/* Total Cost */}
      <div>
        <p className="text-xs text-secondary-400 mb-1">Total Cost</p>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary-400" />
          <p className="text-lg font-bold text-primary-400">{formatCurrency(labour.totalCost)}</p>
        </div>
      </div>
    </motion.div>
  )
}
