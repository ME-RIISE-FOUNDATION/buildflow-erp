'use client'

import { motion } from 'framer-motion'
import { Edit2 } from 'lucide-react'

export default function PropertyMeasurements({ projectId }: { projectId: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Property Measurements</h2>
          <p className="text-secondary-400">Land and building dimensions</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} className="btn-primary flex items-center gap-2 rounded-lg px-6 py-3">
          <Edit2 className="w-5 h-5" />
          Edit
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-6">Land Dimensions</h3>
          <div className="space-y-4">
            {[
              { label: 'Length', value: '150', unit: 'ft' },
              { label: 'Width', value: '100', unit: 'ft' },
              { label: 'Plot Area', value: '15,000', unit: 'sq ft' },
            ].map((item) => (
              <div key={item.label} className="p-4 bg-secondary-800/50 rounded-lg">
                <p className="text-sm text-secondary-400 mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-white">{item.value} <span className="text-sm text-secondary-400">{item.unit}</span></p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-white mb-6">Building Specifications</h3>
          <div className="space-y-4">
            {[
              { label: 'Number of Floors', value: '4' },
              { label: 'Built-up Area', value: '12,000 sq ft' },
              { label: 'Building Type', value: 'Residential Complex' },
            ].map((item) => (
              <div key={item.label} className="p-4 bg-secondary-800/50 rounded-lg">
                <p className="text-sm text-secondary-400 mb-1">{item.label}</p>
                <p className="text-lg font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
