'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'

interface Filters {
  dateRange: { start: string; end: string }
  project: string
  material: string
  workStage: string
  supplier: string
  paymentStatus: string
  search: string
}

interface ReportFilterBarProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  onReset: () => void
}

export default function ReportFilterBar({ filters, setFilters, onReset }: ReportFilterBarProps) {
  const projects = ['all', 'Project A', 'Project B', 'Project C']
  const materials = ['all', 'Cement', 'Steel', 'Bricks', 'Sand', 'Paint', 'Tiles', 'Wood', 'Electrical']
  const workStages = ['all', 'Foundation', 'Ground Floor', 'First Floor', 'Second Floor', 'Roof', 'Finishing']
  const suppliers = ['all', 'Supplier 1', 'Supplier 2', 'Supplier 3', 'Supplier 4']
  const paymentStatuses = ['all', 'Paid', 'Pending', 'Partial']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-20 z-30 bg-gradient-to-br from-secondary-950 via-secondary-900 to-primary-950 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
    >
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-500" />
            <input
              type="text"
              placeholder="Search reports..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-secondary-800/50 border border-secondary-700 rounded-lg text-white placeholder-secondary-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range */}
          <div>
            <label className="text-sm text-secondary-400 mb-2 block">Start Date</label>
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, start: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-secondary-800/50 border border-secondary-700 rounded-lg text-white focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label className="text-sm text-secondary-400 mb-2 block">End Date</label>
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, end: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-secondary-800/50 border border-secondary-700 rounded-lg text-white focus:border-primary-500 transition-all"
            />
          </div>

          {/* Project Selector */}
          <div>
            <label className="text-sm text-secondary-400 mb-2 block">Project</label>
            <select
              value={filters.project}
              onChange={(e) => setFilters({ ...filters, project: e.target.value })}
              className="w-full px-4 py-2 bg-secondary-800/50 border border-secondary-700 rounded-lg text-white focus:border-primary-500 transition-all"
            >
              {projects.map((p) => (
                <option key={p} value={p}>
                  {p === 'all' ? 'All Projects' : p}
                </option>
              ))}
            </select>
          </div>

          {/* Material Selector */}
          <div>
            <label className="text-sm text-secondary-400 mb-2 block">Material</label>
            <select
              value={filters.material}
              onChange={(e) => setFilters({ ...filters, material: e.target.value })}
              className="w-full px-4 py-2 bg-secondary-800/50 border border-secondary-700 rounded-lg text-white focus:border-primary-500 transition-all"
            >
              {materials.map((m) => (
                <option key={m} value={m}>
                  {m === 'all' ? 'All Materials' : m}
                </option>
              ))}
            </select>
          </div>

          {/* Work Stage Selector */}
          <div>
            <label className="text-sm text-secondary-400 mb-2 block">Work Stage</label>
            <select
              value={filters.workStage}
              onChange={(e) => setFilters({ ...filters, workStage: e.target.value })}
              className="w-full px-4 py-2 bg-secondary-800/50 border border-secondary-700 rounded-lg text-white focus:border-primary-500 transition-all"
            >
              {workStages.map((w) => (
                <option key={w} value={w}>
                  {w === 'all' ? 'All Stages' : w}
                </option>
              ))}
            </select>
          </div>

          {/* Supplier Selector */}
          <div>
            <label className="text-sm text-secondary-400 mb-2 block">Supplier</label>
            <select
              value={filters.supplier}
              onChange={(e) => setFilters({ ...filters, supplier: e.target.value })}
              className="w-full px-4 py-2 bg-secondary-800/50 border border-secondary-700 rounded-lg text-white focus:border-primary-500 transition-all"
            >
              {suppliers.map((s) => (
                <option key={s} value={s}>
                  {s === 'all' ? 'All Suppliers' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="text-sm text-secondary-400 mb-2 block">Payment Status</label>
            <select
              value={filters.paymentStatus}
              onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
              className="w-full px-4 py-2 bg-secondary-800/50 border border-secondary-700 rounded-lg text-white focus:border-primary-500 transition-all"
            >
              {paymentStatuses.map((ps) => (
                <option key={ps} value={ps}>
                  {ps === 'all' ? 'All Status' : ps}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-secondary-800/50 hover:bg-secondary-800 border border-secondary-700 rounded-lg text-secondary-300 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
            Reset Filters
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
