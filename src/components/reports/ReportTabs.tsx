'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, Package, TrendingUp, DollarSign, Users, Truck, Zap, Calendar } from 'lucide-react'
import ReportOverview from './tabs/ReportOverview'
import ReportMaterials from './tabs/ReportMaterials'
import ReportAccountTracker from './tabs/ReportAccountTracker'
import ReportFinancial from './tabs/ReportFinancial'
import ReportLabour from './tabs/ReportLabour'
import ReportSuppliers from './tabs/ReportSuppliers'
import ReportAnalytics from './tabs/ReportAnalytics'
import ReportTimeline from './tabs/ReportTimeline'

interface Filters {
  dateRange: { start: string; end: string }
  project: string
  material: string
  workStage: string
  supplier: string
  paymentStatus: string
  search: string
}

interface ReportTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  filters: Filters
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'materials', label: 'Materials', icon: Package },
  { id: 'account', label: 'Account Tracker', icon: TrendingUp },
  { id: 'financial', label: 'Financial', icon: DollarSign },
  { id: 'labour', label: 'Labour', icon: Users },
  { id: 'suppliers', label: 'Suppliers', icon: Truck },
  { id: 'analytics', label: 'Analytics', icon: Zap },
  { id: 'timeline', label: 'Timeline', icon: Calendar },
]

export default function ReportTabs({ activeTab, setActiveTab, filters }: ReportTabsProps) {
  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/50'
                  : 'bg-secondary-800/50 text-secondary-400 hover:text-white hover:bg-secondary-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          )
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && <ReportOverview filters={filters} />}
          {activeTab === 'materials' && <ReportMaterials filters={filters} />}
          {activeTab === 'account' && <ReportAccountTracker filters={filters} />}
          {activeTab === 'financial' && <ReportFinancial filters={filters} />}
          {activeTab === 'labour' && <ReportLabour filters={filters} />}
          {activeTab === 'suppliers' && <ReportSuppliers filters={filters} />}
          {activeTab === 'analytics' && <ReportAnalytics filters={filters} />}
          {activeTab === 'timeline' && <ReportTimeline filters={filters} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
