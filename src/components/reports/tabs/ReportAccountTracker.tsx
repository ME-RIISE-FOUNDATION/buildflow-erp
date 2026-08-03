'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Filters {
  dateRange: { start: string; end: string }
  project: string
  material: string
  workStage: string
  supplier: string
  paymentStatus: string
  search: string
}

export default function ReportAccountTracker({ filters }: { filters: Filters }) {
  const [expandedDate, setExpandedDate] = useState<string | null>(null)

  const dailyEntries = [
    {
      date: '2026-07-20',
      entries: [
        { material: 'Cement', supplier: 'BuildCo', qty: 500, rate: 70, gst: 10, amount: 38500, status: 'Paid', mode: 'NEFT' },
        { material: 'Steel', supplier: 'Steel Ltd', qty: 200, rate: 112, gst: 10, amount: 24640, status: 'Paid', mode: 'Cheque' },
      ],
      dayTotal: 63140,
    },
    {
      date: '2026-07-19',
      entries: [
        { material: 'Bricks', supplier: 'Brick House', qty: 5000, rate: 3.6, gst: 10, amount: 19800, status: 'Pending', mode: 'UPI' },
      ],
      dayTotal: 19800,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {dailyEntries.map((day, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-br from-secondary-900/50 to-secondary-900/30 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
        >
          <button
            onClick={() => setExpandedDate(expandedDate === day.date ? null : day.date)}
            className="w-full flex items-center justify-between p-6 hover:bg-secondary-800/20 transition-colors"
          >
            <div className="text-left">
              <h3 className="text-lg font-bold text-white">{new Date(day.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-secondary-400 text-sm">Daily Total</p>
                <p className="text-xl font-bold text-primary-400">₹{day.dayTotal.toLocaleString()}</p>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-secondary-400 transition-transform ${
                  expandedDate === day.date ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>

          {expandedDate === day.date && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="border-t border-white/10 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-3 text-secondary-400 font-semibold">Material</th>
                        <th className="text-right py-2 px-3 text-secondary-400 font-semibold">Qty</th>
                        <th className="text-right py-2 px-3 text-secondary-400 font-semibold">Rate</th>
                        <th className="text-right py-2 px-3 text-secondary-400 font-semibold">GST</th>
                        <th className="text-right py-2 px-3 text-secondary-400 font-semibold">Amount</th>
                        <th className="text-center py-2 px-3 text-secondary-400 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.entries.map((entry, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-secondary-800/20">
                          <td className="py-2 px-3 text-white">{entry.material}</td>
                          <td className="py-2 px-3 text-right text-secondary-300">{entry.qty}</td>
                          <td className="py-2 px-3 text-right text-secondary-300">₹{entry.rate}</td>
                          <td className="py-2 px-3 text-right text-secondary-300">{entry.gst}%</td>
                          <td className="py-2 px-3 text-right text-primary-400 font-semibold">₹{entry.amount.toLocaleString()}</td>
                          <td className="py-2 px-3 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              entry.status === 'Paid'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {entry.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Grand Total */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-primary-600/10 to-accent-600/10 border border-primary-600/20 rounded-2xl p-6"
      >
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-white">Grand Total</p>
          <p className="text-3xl font-bold text-primary-400">₹{(82940).toLocaleString()}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
