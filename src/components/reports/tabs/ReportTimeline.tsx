'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface Filters {
  dateRange: { start: string; end: string }
  project: string
  material: string
  workStage: string
  supplier: string
  paymentStatus: string
  search: string
}

export default function ReportTimeline({ filters }: { filters: Filters }) {
  const timeline = [
    { stage: 'Foundation', status: 'completed', progress: 100, startDate: '2026-01-10', endDate: '2026-02-20', daysSpent: 42 },
    { stage: 'Ground Floor', status: 'completed', progress: 100, startDate: '2026-02-21', endDate: '2026-04-15', daysSpent: 54 },
    { stage: 'First Floor', status: 'in-progress', progress: 85, startDate: '2026-04-16', endDate: '2026-06-10', daysSpent: 56 },
    { stage: 'Second Floor', status: 'in-progress', progress: 45, startDate: '2026-06-11', endDate: '2026-07-31', daysSpent: 21 },
    { stage: 'Roof', status: 'delayed', progress: 10, startDate: '2026-08-01', endDate: '2026-09-15', daysSpent: 0 },
    { stage: 'Finishing', status: 'delayed', progress: 0, startDate: '2026-09-16', endDate: '2026-10-31', daysSpent: 0 },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />
      case 'in-progress':
        return <Clock className="w-6 h-6 text-blue-400" />
      case 'delayed':
        return <AlertCircle className="w-6 h-6 text-red-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600/10 border-green-600/20'
      case 'in-progress':
        return 'bg-blue-600/10 border-blue-600/20'
      case 'delayed':
        return 'bg-red-600/10 border-red-600/20'
      default:
        return 'bg-secondary-900/50 border-white/10'
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-600 to-green-400'
      case 'in-progress':
        return 'from-blue-600 to-blue-400'
      case 'delayed':
        return 'from-red-600 to-red-400'
      default:
        return 'from-secondary-600 to-secondary-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.01 }}
            className={`border rounded-2xl p-6 backdrop-blur-sm transition-all ${getStatusColor(item.status)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                {getStatusIcon(item.status)}
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.stage}</h3>
                  <div className="flex gap-6 text-xs text-secondary-400">
                    <span>{item.startDate} to {item.endDate}</span>
                    <span>Duration: {item.daysSpent} days</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{item.progress}%</p>
                <p className={`text-xs ${
                  item.status === 'completed'
                    ? 'text-green-400'
                    : item.status === 'in-progress'
                    ? 'text-blue-400'
                    : 'text-red-400'
                }`}>
                  {item.status.replace('-', ' ').charAt(0).toUpperCase() + item.status.replace('-', ' ').slice(1)}
                </p>
              </div>
            </div>

            <div className="w-full h-3 bg-secondary-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-full bg-gradient-to-r ${getProgressColor(item.status)}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-secondary-900/50 to-secondary-900/30 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-white mb-6">Timeline Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-secondary-400 text-sm mb-2">Completed Stages</p>
            <p className="text-3xl font-bold text-green-400">2/6</p>
          </div>
          <div>
            <p className="text-secondary-400 text-sm mb-2">In Progress</p>
            <p className="text-3xl font-bold text-blue-400">2/6</p>
          </div>
          <div>
            <p className="text-secondary-400 text-sm mb-2">Delayed Stages</p>
            <p className="text-3xl font-bold text-red-400">2/6</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
