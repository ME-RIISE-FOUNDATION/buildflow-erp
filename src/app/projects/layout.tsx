'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Briefcase, Menu } from 'lucide-react'

const mockProjects = [
  {
    id: 1,
    name: 'Downtown Mall Complex - Phase 2',
    client: 'Skyline Developers',
    status: 'running',
    progress: 65,
    budget: 250000,
  },
  {
    id: 2,
    name: 'Residential Complex - Tower A',
    client: 'Urban Living Inc',
    status: 'completed',
    progress: 100,
    budget: 180000,
  },
  {
    id: 3,
    name: 'Office Building Renovation',
    client: 'Corporate Spaces Ltd',
    status: 'delayed',
    progress: 45,
    budget: 120000,
  },
  {
    id: 4,
    name: 'Shopping Center Extension',
    client: 'Retail Plus',
    status: 'upcoming',
    progress: 0,
    budget: 320000,
  },
]

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [projects, setProjects] = useState(mockProjects)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    budget: '',
    status: 'upcoming',
  })

  const handleCreateProject = () => {
    if (!formData.name.trim() || !formData.client.trim()) {
      alert('Please fill in all fields')
      return
    }

    const newProject = {
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      name: formData.name,
      client: formData.client,
      status: formData.status,
      progress: 0,
      budget: parseFloat(formData.budget) || 0,
    }

    setProjects([...projects, newProject])
    setFormData({ name: '', client: '', budget: '', status: 'upcoming' })
    setShowNewProjectModal(false)
    alert('✅ Project created!')
  }

  return (
    <div className="flex gap-6 min-h-screen">
      {/* Mobile Sidebar Toggle */}
      {!sidebarOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 bg-primary-600 text-white rounded-full shadow-lg md:hidden"
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      )}

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Projects Sidebar */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed md:static left-0 top-0 z-40 md:z-10 w-80 flex-shrink-0 h-screen md:h-auto flex flex-col bg-secondary-900/80 border-r border-white/10 rounded-r-2xl md:rounded-none p-4 md:p-6 backdrop-blur-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary-400" />
            <span>Projects</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-secondary-800 rounded-lg text-secondary-400"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* New Project Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewProjectModal(true)}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 mb-6 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Project
        </motion.button>

        {/* Projects List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-secondary-800/50 hover:bg-secondary-800 rounded-lg border border-secondary-700/50 hover:border-secondary-700 cursor-pointer transition-all"
            >
              <div className="mb-2">
                <p className="font-semibold text-white text-sm truncate">{project.name}</p>
                <p className="text-xs text-secondary-400 truncate">{project.client}</p>
              </div>
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-secondary-400">Progress</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    project.status === 'completed'
                      ? 'bg-green-500/20 text-green-300'
                      : project.status === 'running'
                      ? 'bg-blue-500/20 text-blue-300'
                      : project.status === 'delayed'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-secondary-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
                  />
                </div>
                <p className="text-xs text-secondary-400 mt-1">{project.progress}%</p>
              </div>
              <p className="text-xs text-primary-300">Budget: ₹{(project.budget / 100000).toFixed(1)}L</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* New Project Modal */}
      <AnimatePresence>
        {showNewProjectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewProjectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-secondary-900/90 border border-white/10 rounded-2xl p-6 w-full max-w-md backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Create New Project</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowNewProjectModal(false)}
                  className="text-secondary-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Project Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter project name"
                    className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Client Name *</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Enter client name"
                    className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Budget (₹)</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="Enter budget"
                    className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="running">Running</option>
                    <option value="completed">Completed</option>
                    <option value="delayed">Delayed</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowNewProjectModal(false)}
                  className="flex-1 px-4 py-2.5 border border-secondary-700 text-secondary-300 hover:text-white rounded-lg transition-colors font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleCreateProject}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors py-2.5"
                >
                  Create
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children}
      </div>
    </div>
  )
}
