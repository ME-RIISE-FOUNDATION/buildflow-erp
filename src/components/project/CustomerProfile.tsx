'use client'

import { motion } from 'framer-motion'
import { Plus, Edit2 } from 'lucide-react'

export default function CustomerProfile({ projectId }: { projectId: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Customer Profile</h2>
          <p className="text-secondary-400">Customer details and project information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="btn-primary flex items-center gap-2 rounded-lg px-6 py-3"
        >
          <Edit2 className="w-5 h-5" />
          Edit Profile
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">Customer Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-secondary-400 mb-1">Full Name</p>
              <p className="text-white font-semibold">John Smith</p>
            </div>
            <div>
              <p className="text-sm text-secondary-400 mb-1">Email</p>
              <p className="text-white font-semibold">john.smith@email.com</p>
            </div>
            <div>
              <p className="text-sm text-secondary-400 mb-1">Phone</p>
              <p className="text-white font-semibold">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="text-sm text-secondary-400 mb-1">Company</p>
              <p className="text-white font-semibold">Smith Enterprises</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">Project Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-secondary-400 mb-1">Project Type</p>
              <p className="text-white font-semibold">Residential Construction</p>
            </div>
            <div>
              <p className="text-sm text-secondary-400 mb-1">Project Status</p>
              <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300">Running</span>
            </div>
            <div>
              <p className="text-sm text-secondary-400 mb-1">Start Date</p>
              <p className="text-white font-semibold">2026-03-15</p>
            </div>
            <div>
              <p className="text-sm text-secondary-400 mb-1">Expected Completion</p>
              <p className="text-white font-semibold">2026-12-31</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
