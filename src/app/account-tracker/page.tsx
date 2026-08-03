'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Plus, Trophy, Award, TrendingUp, Folder, Download, ChevronRight, Users, FileText, BarChart3, Wallet, ArrowUpRight, Target, X, Send, CheckCircle } from 'lucide-react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false, loading: () => <div className="h-80 bg-secondary-800/30 rounded-2xl animate-pulse" /> })

interface ModalType {
  type: 'addClient' | 'createInvoice' | 'viewReports' | 'expenses' | 'addProject' | null
}

export default function AccountTrackerPage() {
  const [activeModal, setActiveModal] = useState<ModalType['type']>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    description: '',
  })

  const stats = [
    { icon: Award, label: 'Total Achievements', value: '156', subtext: 'Completed', change: '+12%', gradient: 'from-blue-600 to-blue-400', light: 'bg-blue-600/5', border: 'border-blue-500/20' },
    { icon: TrendingUp, label: 'Total Revenue', value: '₹12,50,000', subtext: 'All Time', change: '+8.2%', gradient: 'from-emerald-600 to-emerald-400', light: 'bg-emerald-600/5', border: 'border-emerald-500/20' },
    { icon: BarChart3, label: 'Monthly Progress', value: '85%', subtext: 'On Track', change: '+5%', gradient: 'from-amber-600 to-amber-400', light: 'bg-amber-600/5', border: 'border-amber-500/20' },
    { icon: Target, label: 'Total Projects', value: '24', subtext: '9 In Progress', change: '+3', gradient: 'from-violet-600 to-violet-400', light: 'bg-violet-600/5', border: 'border-violet-500/20' },
  ]

  const projectOverviewOptions = {
    chart: { type: 'donut' as const, toolbar: { show: false } },
    colors: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'],
    labels: ['Completed', 'In Progress', 'On Hold', 'Upcoming'],
    tooltip: { theme: 'dark' as const },
    legend: { position: 'bottom' as const, fontSize: '12' },
    plotOptions: {
      pie: { donut: { size: '70%' } },
    },
    dataLabels: { enabled: false },
  }

  const projectOverviewSeries = [10, 9, 3, 2]

  const projects = [
    { id: 1, name: 'AK Villa Project', type: 'Residential', status: 'Completed', statusColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
    { id: 2, name: 'Interior Design Work', type: 'Interior', status: 'In Progress', statusColor: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' },
    { id: 3, name: 'Commercial Building', type: 'Commercial', status: 'In Progress', statusColor: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' },
    { id: 4, name: 'Office Renovation', type: 'Renovation', status: 'On Hold', statusColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
  ]

  const projectDetails = {
    name: 'AK Villa Project',
    client: 'Mr. Sharma',
    type: 'Residential',
    startDate: '01 May 2026',
    endDate: '12 Jun 2026',
    status: 'Completed',
    budget: '₹5,00,000',
    revenue: '₹5,00,000',
    progress: 100,
  }

  const files = [
    { id: 1, name: 'Project Agreement.pdf', type: 'PDF', size: '1.2 MB', date: '12 Jun 2026', icon: '📄' },
    { id: 2, name: 'Project Estimation.docx', type: 'DOCX', size: '2.4 MB', date: '10 Jun 2026', icon: '📝' },
    { id: 3, name: 'Budget Sheet.xlsx', type: 'XLSX', size: '1.6 MB', date: '09 Jun 2026', icon: '📊' },
    { id: 4, name: 'Site Photo.jpg', type: 'JPG', size: '3.8 MB', date: '08 Jun 2026', icon: '🖼️' },
  ]

  const activities = [
    { id: 1, type: 'payment', title: 'Payment Received', description: '₹50,000 from Mr. Sharma', time: '10:15 AM', icon: '✓', color: 'bg-emerald-500' },
    { id: 2, type: 'client', title: 'New Client Added', description: 'Mr. Kumar', time: '09:45 AM', icon: '👤', color: 'bg-blue-500' },
  ]

  const quickActions = [
    { label: 'Add Client', icon: Users, color: 'from-blue-600 to-blue-500', hover: 'hover:shadow-lg hover:shadow-blue-500/30', modal: 'addClient' as const },
    { label: 'Create Invoice', icon: FileText, color: 'from-emerald-600 to-emerald-500', hover: 'hover:shadow-lg hover:shadow-emerald-500/30', modal: 'createInvoice' as const },
    { label: 'View Reports', icon: BarChart3, color: 'from-amber-600 to-amber-500', hover: 'hover:shadow-lg hover:shadow-amber-500/30', modal: 'viewReports' as const },
    { label: 'Expenses', icon: Wallet, color: 'from-violet-600 to-violet-500', hover: 'hover:shadow-lg hover:shadow-violet-500/30', modal: 'expenses' as const },
  ]

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage(`✓ ${activeModal === 'addClient' ? 'Client' : activeModal === 'createInvoice' ? 'Invoice' : activeModal === 'expenses' ? 'Expense' : 'Report'} created successfully!`)
    setFormData({ name: '', email: '', phone: '', amount: '', description: '' })
    setTimeout(() => {
      setActiveModal(null)
      setSuccessMessage('')
    }, 2000)
  }

  const handleDownload = (fileName: string) => {
    setSuccessMessage(`✓ Downloaded: ${fileName}`)
    setTimeout(() => setSuccessMessage(''), 2000)
  }

  const handleProjectClick = (project: any) => {
    setSuccessMessage(`✓ Opened: ${project.name}`)
    setTimeout(() => setSuccessMessage(''), 2000)
  }

  const handleViewAll = (section: string) => {
    setSuccessMessage(`✓ Viewing all ${section}`)
    setTimeout(() => setSuccessMessage(''), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  }

  // Modal Component
  const Modal = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-secondary-900 to-secondary-950 border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveModal(null)}
                className="p-2 hover:bg-secondary-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-secondary-400" />
              </motion.button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <DashboardLayout>
      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg z-40"
          >
            <CheckCircle className="w-5 h-5" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 pb-12">

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-accent-600/10 to-transparent" />
          <div className="relative backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex items-center gap-6">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="hidden md:flex w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 items-center justify-center text-3xl shadow-lg shadow-primary-600/30"
                >
                  🎖️
                </motion.div>
                <div>
                  <motion.h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Akshay</span>
                  </motion.h1>
                  <p className="text-secondary-300 text-lg">Here's your account performance summary</p>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Trophy className="w-24 h-24 text-yellow-400 drop-shadow-lg" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className={`${stat.light} ${stat.border} border rounded-2xl backdrop-blur-sm p-6 hover:shadow-xl transition-all duration-300 cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-xs font-semibold">{stat.change}</span>
                  </motion.div>
                </div>
                <p className="text-secondary-400 text-xs font-medium tracking-wide mb-3">{stat.label}</p>
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-sm text-secondary-400">{stat.subtext}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Primary CTA Button */}
        <motion.button
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveModal('addProject')}
          className="w-full bg-gradient-to-r from-primary-600 via-primary-600 to-accent-600 hover:from-primary-700 hover:via-primary-700 hover:to-accent-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary-600/50 group"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          Add New Project / Achievement
        </motion.button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Project Overview */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-3xl p-6 backdrop-blur-xl hover:border-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Project Overview</h2>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => handleViewAll('projects')}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
              <Chart
                options={projectOverviewOptions}
                series={projectOverviewSeries}
                type="donut"
                height={280}
              />
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-3xl p-6 backdrop-blur-xl hover:border-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Latest Activities</h2>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => handleViewAll('activities')}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <div className={`${activity.color} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-lg`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm">{activity.title}</p>
                      <p className="text-xs text-secondary-400 truncate">{activity.description}</p>
                      <p className="text-xs text-secondary-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Project Details */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-xl hover:border-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Featured Project</h2>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => handleViewAll('project details')}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Project Image */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="md:col-span-1 relative overflow-hidden rounded-2xl cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400" />
                  <div className="relative aspect-square flex items-center justify-center text-8xl">
                    🏠
                  </div>
                </motion.div>

                {/* Project Info */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">{projectDetails.name}</h3>
                    <p className="text-secondary-400 font-medium">{projectDetails.type} Project</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Client', value: projectDetails.client },
                      { label: 'Status', value: projectDetails.status, isStatus: true },
                      { label: 'Start Date', value: projectDetails.startDate },
                      { label: 'End Date', value: projectDetails.endDate },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -2 }}
                        className="bg-white/5 border border-white/5 rounded-xl p-3 cursor-pointer hover:border-white/10 transition-all"
                      >
                        <p className="text-xs text-secondary-400 font-medium mb-1">{item.label}</p>
                        {item.isStatus ? (
                          <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-semibold">
                            {item.value}
                          </span>
                        ) : (
                          <p className="text-white font-semibold text-sm">{item.value}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs text-secondary-400 font-medium mb-2">Budget</p>
                      <p className="text-2xl font-bold text-white">{projectDetails.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary-400 font-medium mb-2">Revenue</p>
                      <p className="text-2xl font-bold text-emerald-400">{projectDetails.revenue}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-secondary-400 font-medium">Progress</p>
                      <p className="text-sm font-bold text-white">{projectDetails.progress}%</p>
                    </div>
                    <div className="w-full h-2 bg-secondary-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${projectDetails.progress}%` }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Projects & Files Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Projects */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-3xl p-6 backdrop-blur-xl hover:border-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white">Recent Projects</h2>
                  <motion.button
                    whileHover={{ x: 2 }}
                    onClick={() => handleViewAll('recent projects')}
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ x: 4 }}
                      onClick={() => handleProjectClick(project)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold text-white text-sm">{project.name}</p>
                        <p className="text-xs text-secondary-400">{project.type}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${project.statusColor}`}>
                        {project.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Project Files */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-3xl p-6 backdrop-blur-xl hover:border-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white">Project Files</h2>
                  <motion.button
                    whileHover={{ x: 2 }}
                    onClick={() => handleViewAll('files')}
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="space-y-3">
                  {files.map((file) => (
                    <motion.div
                      key={file.id}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-xl flex-shrink-0">{file.icon}</span>
                        <div className="min-w-0">
                          <p className="font-semibold text-white text-sm truncate">{file.name}</p>
                          <p className="text-xs text-secondary-400">{file.size}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDownload(file.name)}
                        className="p-2 rounded-lg text-secondary-400 group-hover:text-primary-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-xl hover:border-white/10 transition-all"
            >
              <h2 className="text-lg font-bold text-white mb-8">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.button
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveModal(action.modal)}
                      className={`bg-gradient-to-br ${action.color} ${action.hover} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-white font-semibold transition-all active:scale-95`}
                    >
                      <Icon className="w-8 h-8" />
                      <span className="text-sm text-center">{action.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals Container */}
      {/* Add Client Modal */}
        <Modal title="Add New Client">
          {activeModal === 'addClient' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Client Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Enter phone number"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                Add Client
              </button>
            </form>
          )}
        </Modal>

        {/* Create Invoice Modal */}
        <Modal title="Create Invoice">
          {activeModal === 'createInvoice' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Invoice Number</label>
                <input
                  type="text"
                  required
                  placeholder="INV-001"
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                Create Invoice
              </button>
            </form>
          )}
        </Modal>

        {/* View Reports Modal */}
        <Modal title="Reports">
          {activeModal === 'viewReports' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {['Daily Report', 'Weekly Report', 'Monthly Report'].map((report, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ x: 4 }}
                    className="p-3 bg-secondary-800/50 hover:bg-secondary-800 border border-white/10 rounded-xl text-left transition-all"
                  >
                    <p className="font-semibold text-white">{report}</p>
                    <p className="text-xs text-secondary-400 mt-1">Generated on {new Date().toLocaleDateString()}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </Modal>

        {/* Expenses Modal */}
        <Modal title="Add Expense">
          {activeModal === 'expenses' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Expense Type</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="e.g., Materials, Labour"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Notes</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Add notes"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                Add Expense
              </button>
            </form>
          )}
        </Modal>

        {/* Add Project Modal */}
        <Modal title="Add New Project">
          {activeModal === 'addProject' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Budget (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-secondary-800/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Enter project description"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                Create Project
              </button>
            </form>
          )}
        </Modal>
    </DashboardLayout>
  )
}
