'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '@/layouts/DashboardLayout'
import ReportKPICards from '@/components/reports/ReportKPICards'
import ReportFilterBar from '@/components/reports/ReportFilterBar'
import ReportTabs from '@/components/reports/ReportTabs'
import { Download, Printer, RotateCcw } from 'lucide-react'

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    dateRange: { start: '2026-01-01', end: '2026-07-31' },
    project: 'all',
    material: 'all',
    workStage: 'all',
    supplier: 'all',
    paymentStatus: 'all',
    search: '',
  })

  const [activeTab, setActiveTab] = useState('overview')

  const handleExportPDF = () => {
    alert('📥 Exporting report as PDF...')
  }

  const handleExportExcel = () => {
    alert('📊 Exporting report as Excel...')
  }

  const handlePrint = () => {
    window.print()
  }

  const handleResetFilters = () => {
    setFilters({
      dateRange: { start: '2026-01-01', end: '2026-07-31' },
      project: 'all',
      material: 'all',
      workStage: 'all',
      supplier: 'all',
      paymentStatus: 'all',
      search: '',
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Reports & Analytics</h1>
            <p className="text-secondary-400">Comprehensive project insights and financial tracking</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              PDF
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Excel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 btn-ghost rounded-lg"
            >
              <Printer className="w-4 h-4" />
              Print
            </motion.button>
          </div>
        </motion.div>

        {/* KPI Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ReportKPICards />
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ReportFilterBar filters={filters} setFilters={setFilters} onReset={handleResetFilters} />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ReportTabs activeTab={activeTab} setActiveTab={setActiveTab} filters={filters} />
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
