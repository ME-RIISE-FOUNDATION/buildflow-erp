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
import DashboardCharts from '@/components/dashboard/DashboardCharts'
import StatCard from '@/components/dashboard/StatCard'
import RecentActivities from '@/components/dashboard/RecentActivities'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

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
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-secondary-400">Welcome back, Super Admin. Here's your project overview.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <DashboardCharts />
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <RecentActivities />
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
