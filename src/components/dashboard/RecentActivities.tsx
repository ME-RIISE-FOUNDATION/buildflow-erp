'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase,
  Users,
  FileText,
  DollarSign,
  Package,
  CheckCircle,
} from 'lucide-react'

const activities: any[] = []

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export default function RecentActivities() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Recent Activities</h2>
        <p className="text-secondary-400">Latest updates and events</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="flex gap-4 p-4 rounded-lg hover:bg-secondary-800/50 transition-colors duration-300 group cursor-pointer"
            >
              {/* Icon */}
              <div className={`p-3 rounded-lg bg-secondary-800/50 group-hover:bg-secondary-700/50 transition-colors flex-shrink-0 ${activity.color}`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white mb-1">{activity.title}</p>
                <p className="text-secondary-400 text-sm truncate">{activity.description}</p>
              </div>

              {/* Timestamp */}
              <div className="text-right flex-shrink-0">
                <p className="text-secondary-400 text-xs whitespace-nowrap">{activity.timestamp}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full py-3 rounded-lg border border-primary-500/30 text-primary-400 hover:bg-primary-500/10 transition-all duration-300 font-semibold"
      >
        View All Activities
      </motion.button>
    </motion.div>
  )
}
