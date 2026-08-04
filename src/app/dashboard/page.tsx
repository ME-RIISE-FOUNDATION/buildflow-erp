'use client'

import React from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Briefcase,
  Users,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
} from 'lucide-react'

const stats = [
  {
    icon: Briefcase,
    label: 'Total Projects',
    value: '24',
    trend: '+12%',
    color: 'from-primary-600 to-primary-400',
  },
  {
    icon: CheckCircle,
    label: 'Completed',
    value: '8',
    trend: '+4%',
    color: 'from-green-600 to-green-400',
  },
  {
    icon: Clock,
    label: 'Running',
    value: '14',
    trend: '+2%',
    color: 'from-accent-600 to-accent-400',
  },
  {
    icon: AlertCircle,
    label: 'Delayed',
    value: '2',
    trend: '-100%',
    color: 'from-red-600 to-red-400',
  },
  {
    icon: Users,
    label: 'Total Clients',
    value: '18',
    trend: '+6%',
    color: 'from-purple-600 to-purple-400',
  },
  {
    icon: DollarSign,
    label: 'Monthly Revenue',
    value: '₹24.5L',
    trend: '+23%',
    color: 'from-yellow-600 to-yellow-400',
  },
  {
    icon: TrendingUp,
    label: 'Profit',
    value: '₹12L',
    trend: '+18%',
    color: 'from-blue-600 to-blue-400',
  },
  {
    icon: Target,
    label: 'Pending Payments',
    value: '₹4.5L',
    trend: '-5%',
    color: 'from-orange-600 to-orange-400',
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-secondary-400">Welcome to BuildFlow ERP System</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const isPositive = !stat.trend.startsWith('-')

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${stat.color} bg-opacity-10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-white/20 transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-white/10">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      isPositive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {stat.trend}
                  </span>
                </div>
                <p className="text-secondary-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-secondary-800/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Projects</h2>
          <div className="space-y-4">
            {[
              { name: 'AK Villa Project', client: 'Mr. Sharma', progress: 100, status: 'Completed' },
              { name: 'Commercial Building', client: 'XYZ Corp', progress: 65, status: 'Running' },
              { name: 'Interior Design Work', client: 'Mr. Kumar', progress: 45, status: 'Running' },
            ].map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center justify-between p-4 bg-secondary-800/50 rounded-lg hover:bg-secondary-800 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-white">{project.name}</p>
                  <p className="text-xs text-secondary-400">{project.client}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-2 bg-secondary-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ delay: 0.7 + idx * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
                    />
                  </div>
                  <span className="text-xs font-semibold text-primary-400 w-10">{project.progress}%</span>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-500/20 text-blue-300 w-20 text-center">
                    {project.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
