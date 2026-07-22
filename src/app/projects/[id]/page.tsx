'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Users,
  MapPin,
  Ruler,
  Hammer,
  Package,
  Calculator,
  TrendingUp,
  FileText,
  MessageSquare,
  Settings,
  DollarSign,
  Menu,
  X,
  Calendar as CalendarIcon,
} from 'lucide-react'
import CustomerProfile from '@/components/project/CustomerProfile'
import OwnerDetails from '@/components/project/OwnerDetails'
import SiteAddress from '@/components/project/SiteAddress'
import PropertyMeasurements from '@/components/project/PropertyMeasurements'
import MaterialManagement from '@/components/project/MaterialManagement'
import CostEstimation from '@/components/project/CostEstimation'
import ExpenseTracker from '@/components/project/ExpenseTracker'
import ConstructionProgress from '@/components/project/ConstructionProgress'
import Documents from '@/components/project/Documents'
import Reports from '@/components/project/Reports'
import Notes from '@/components/project/Notes'
import Calendar from '@/components/project/Calendar'
import EstimationAnalytics from '@/components/project/EstimationAnalytics'
import SummaryCards from '@/components/project/SummaryCards'

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'customer', label: 'Customer Profile', icon: Users },
    { id: 'owner', label: 'Owner Details', icon: Users },
    { id: 'site', label: 'Site Address', icon: MapPin },
    { id: 'measurements', label: 'Property Measurements', icon: Ruler },
    { id: 'construction', label: 'Construction Details', icon: Hammer },
    { id: 'materials', label: 'Material Management', icon: Package },
    { id: 'estimation', label: 'Cost Estimation', icon: Calculator },
    { id: 'expenses', label: 'Expense Tracker', icon: DollarSign },
    { id: 'progress', label: 'Construction Progress', icon: TrendingUp },
    { id: 'estimation-analytics', label: 'Estimation Analytics', icon: TrendingUp },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'notes', label: 'Notes', icon: MessageSquare },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <SummaryCards projectId={parseInt(params.id)} />
      case 'customer':
        return <CustomerProfile projectId={parseInt(params.id)} />
      case 'owner':
        return <OwnerDetails projectId={parseInt(params.id)} />
      case 'site':
        return <SiteAddress projectId={parseInt(params.id)} />
      case 'measurements':
        return <PropertyMeasurements projectId={parseInt(params.id)} />
      case 'construction':
        return <div className="card">Construction Details Coming Soon</div>
      case 'materials':
        return <MaterialManagement projectId={parseInt(params.id)} />
      case 'estimation':
        return <CostEstimation projectId={parseInt(params.id)} />
      case 'expenses':
        return <ExpenseTracker projectId={parseInt(params.id)} />
      case 'progress':
        return <ConstructionProgress projectId={parseInt(params.id)} />
      case 'estimation-analytics':
        return <EstimationAnalytics projectId={parseInt(params.id)} />
      case 'documents':
        return <Documents projectId={parseInt(params.id)} />
      case 'reports':
        return <Reports projectId={parseInt(params.id)} />
      case 'calendar':
        return <Calendar projectId={parseInt(params.id)} />
      case 'notes':
        return <Notes projectId={parseInt(params.id)} />
      default:
        return <SummaryCards projectId={parseInt(params.id)} />
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-screen">
      {/* Mobile Toggle */}
      {isMobile && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-6 right-6 z-40 btn-primary p-4 rounded-full shadow-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      )}

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Secondary Sidebar */}
      <motion.div
        initial={isMobile ? { x: -320 } : { x: 0 }}
        animate={isMobile ? (sidebarOpen ? { x: 0 } : { x: -320 }) : { x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`w-80 lg:w-72 flex-shrink-0 glass rounded-2xl border border-white/10 p-4 lg:p-6 overflow-y-auto max-h-[85vh] lg:max-h-none lg:sticky lg:top-0 fixed left-0 top-0 z-40 lg:z-auto`}
      >
        <h3 className="text-lg lg:text-xl font-bold text-white mb-4">Sections</h3>
        <div className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <motion.button
                key={section.id}
                whileHover={{ x: 5 }}
                onClick={() => {
                  setActiveSection(section.id)
                  if (isMobile) setSidebarOpen(false)
                }}
                className={`w-full text-left px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all flex items-center gap-2 lg:gap-3 text-sm lg:text-base ${
                  activeSection === section.id
                    ? 'bg-primary-600/30 border border-primary-500/50 text-white shadow-glow'
                    : 'text-secondary-300 hover:text-white hover:bg-secondary-800/50'
                }`}
              >
                <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span className="truncate">{section.label}</span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto pb-20 lg:pb-0 px-0 sm:px-4"
      >
        {renderContent()}
      </motion.div>
    </div>
  )
}
