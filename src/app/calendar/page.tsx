'use client'

import React from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import { motion } from 'framer-motion'
import { Calendar, Plus } from 'lucide-react'

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Calendar</h1>
              <p className="text-secondary-400">Events, meetings, and deadlines</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Event
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card h-96 flex items-center justify-center"
        >
          <div className="text-center">
            <Calendar className="w-16 h-16 mx-auto text-secondary-500 mb-4 opacity-50" />
            <p className="text-secondary-400">Calendar integration coming soon</p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
