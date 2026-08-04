'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

interface Filters {
  dateRange: { start: string; end: string }
  project: string
  material: string
  workStage: string
  supplier: string
  paymentStatus: string
  search: string
}

export default function ReportLabour({ filters }: { filters: Filters }) {
  const labourData = [
    { type: 'Skilled Labour', dailyWage: 500, workDays: 25, totalCost: 12500, attendance: '95%' },
    { type: 'Semi-Skilled Labour', dailyWage: 350, workDays: 28, totalCost: 9800, attendance: '92%' },
    { type: 'Unskilled Labour', dailyWage: 250, workDays: 30, totalCost: 7500, attendance: '98%' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {labourData.map((labour, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-secondary-900/50 to-secondary-900/30 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-purple-600/20">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">{labour.type}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-secondary-400">Daily Wage</span>
                <span className="text-white font-semibold">₹{labour.dailyWage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-400">Work Days</span>
                <span className="text-white font-semibold">{labour.workDays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-400">Attendance</span>
                <span className="text-green-400 font-semibold">{labour.attendance}</span>
              </div>
              <div className="pt-3 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-secondary-300">Total Cost</span>
                  <span className="text-primary-400 font-bold">₹{labour.totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Labour Summary Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-secondary-900/50 to-secondary-900/30 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-white mb-6">Labour Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-secondary-400 font-semibold">Labour Type</th>
                <th className="text-right py-3 px-4 text-secondary-400 font-semibold">Workers</th>
                <th className="text-right py-3 px-4 text-secondary-400 font-semibold">Total Cost</th>
                <th className="text-right py-3 px-4 text-secondary-400 font-semibold">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {labourData.map((labour, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-secondary-800/20">
                  <td className="py-3 px-4 text-white">{labour.type}</td>
                  <td className="py-3 px-4 text-right text-secondary-300">12</td>
                  <td className="py-3 px-4 text-right text-primary-400 font-semibold">₹{labour.totalCost.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-green-400 font-semibold">{labour.attendance}</td>
                </tr>
              ))}
              <tr className="font-bold bg-secondary-800/30">
                <td className="py-3 px-4 text-white">Total</td>
                <td className="py-3 px-4 text-right text-white">36</td>
                <td className="py-3 px-4 text-right text-primary-400">₹{(12500 + 9800 + 7500).toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-white">95%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
