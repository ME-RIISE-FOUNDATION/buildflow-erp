'use client'

import { motion } from 'framer-motion'
import { Edit2, MapPin } from 'lucide-react'

export default function SiteAddress({ projectId }: { projectId: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Site Address</h2>
          <p className="text-secondary-400">Project location details</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} className="btn-primary flex items-center gap-2 rounded-lg px-6 py-3">
          <Edit2 className="w-5 h-5" />
          Edit
        </motion.button>
      </div>

      <div className="card">
        <div className="mb-6 flex items-start gap-4">
          <MapPin className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-secondary-400 mb-2">Street Address</p>
                <p className="text-white font-semibold">123 Main Street, Apt 4B</p>
              </div>
              <div>
                <p className="text-sm text-secondary-400 mb-2">City</p>
                <p className="text-white font-semibold">New York</p>
              </div>
              <div>
                <p className="text-sm text-secondary-400 mb-2">State/Province</p>
                <p className="text-white font-semibold">NY</p>
              </div>
              <div>
                <p className="text-sm text-secondary-400 mb-2">Postal Code</p>
                <p className="text-white font-semibold">10001</p>
              </div>
              <div>
                <p className="text-sm text-secondary-400 mb-2">Country</p>
                <p className="text-white font-semibold">United States</p>
              </div>
              <div>
                <p className="text-sm text-secondary-400 mb-2">Latitude/Longitude</p>
                <p className="text-white font-semibold">40.7128° N, 74.0060° W</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps would go here */}
      <div className="card h-96 flex items-center justify-center bg-secondary-800/50">
        <p className="text-secondary-400">Google Maps Integration Coming Soon</p>
      </div>
    </motion.div>
  )
}
