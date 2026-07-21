'use client'

import React from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function PurchasePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Purchase Management</h1>
              <p className="text-secondary-400">Purchase orders and supplier management</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New PO
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card text-center py-20"
        >
          <p className="text-secondary-400">Purchase management module content coming soon</p>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
