'use client'

import { motion } from 'framer-motion'
import { FileText, Download } from 'lucide-react'
import { useState } from 'react'

interface Report {
  id: number
  name: string
  date: string
  type: string
}

export default function Reports({ projectId }: { projectId: number }) {
  const [reports] = useState<Report[]>([
    { id: 1, name: 'Daily Report', date: '2026-07-21', type: 'PDF' },
    { id: 2, name: 'Weekly Report', date: '2026-07-20', type: 'PDF' },
    { id: 3, name: 'Monthly Report', date: '2026-07-15', type: 'PDF' },
    { id: 4, name: 'Financial Summary', date: '2026-07-10', type: 'PDF' },
  ])

  const handleDownload = (report: Report, format: 'pdf' | 'excel') => {
    alert(`📥 Downloading: ${report.name}.${format.toUpperCase()}`)
    // In production, this would trigger an actual download
    // Example: window.location.href = `/api/download/report/${report.id}?format=${format}`
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Reports</h2>
        <p className="text-secondary-400">Project reports and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <motion.div key={report.id} whileHover={{ scale: 1.02 }} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <FileText className="w-8 h-8 text-accent-400" />
                <div>
                  <p className="font-semibold text-white">{report.name}</p>
                  <p className="text-xs text-secondary-400">{report.date}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleDownload(report, 'pdf')}
                  className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleDownload(report, 'excel')}
                  className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Excel
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
