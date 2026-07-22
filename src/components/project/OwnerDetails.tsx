'use client'

import { motion } from 'framer-motion'
import { Edit2 } from 'lucide-react'

export default function OwnerDetails({ projectId }: { projectId: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Owner Details</h2>
          <p className="text-secondary-400">Property owner information</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} className="btn-primary flex items-center gap-2 rounded-lg px-6 py-3">
          <Edit2 className="w-5 h-5" />
          Edit
        </motion.button>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-white mb-6">Owner Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { label: 'First Name', value: 'John' },
            { label: 'Last Name', value: 'Smith' },
            { label: 'Phone', value: '+1 (555) 123-4567' },
            { label: 'Email', value: 'john@email.com' },
            { label: 'Aadhar', value: 'XXXX XXXX 1234' },
            { label: 'PAN', value: 'ABCDE1234F' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-sm text-secondary-400 mb-2">{item.label}</p>
              <p className="text-white font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
