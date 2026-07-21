'use client'

import React from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import { motion } from 'framer-motion'
import { FileText, Download } from 'lucide-react'

const reports = [
  { name: 'Daily Report', type: 'PDF', size: '2.4 MB', date: '2026-07-21' },
  { name: 'Weekly Report', type: 'Excel', size: '1.8 MB', date: '2026-07-20' },
  { name: 'Monthly Report', type: 'PDF', size: '5.2 MB', date: '2026-07-15' },
]

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Reports</h1>
          <p className="text-secondary-400">Generate and download reports</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {['Daily', 'Weekly', 'Monthly'].map((type, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              className="card text-center"
            >
              <FileText className="w-8 h-8 mx-auto mb-4 text-primary-400" />
              <p className="text-lg font-semibold text-white mb-2">{type} Report</p>
              <p className="text-sm text-secondary-400">Generate {type.toLowerCase()} report</p>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h2 className="text-xl font-bold text-white mb-4">Recent Reports</h2>
          <div className="space-y-3">
            {reports.map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-secondary-800/50 rounded-lg transition">
                <div>
                  <p className="font-semibold text-white">{report.name}</p>
                  <p className="text-sm text-secondary-400">{report.date} • {report.size}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 hover:bg-secondary-700 rounded-lg"
                >
                  <Download className="w-5 h-5 text-accent-400" />
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
