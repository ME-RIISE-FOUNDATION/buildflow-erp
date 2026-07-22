'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import DashboardLayout from '@/layouts/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Briefcase, Menu } from 'lucide-react'
import { api } from '@/lib/api'

interface Project {
  id: number
  name: string
  client_name: string
  status: string
  progress: number
  budget: number
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [projects, setProjects] = useState<Project[]>([])
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    client_name: '',
    budget: '',
    status: 'upcoming',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const loadProjects = async () => {
    try {
      const data = await api.getProjects()
      setProjects(data)
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async () => {
    if (formData.name && formData.client_name) {
      try {
        const newProject = await api.createProject({
          name: formData.name,
          client_id: 1,
          status: formData.status,
          budget: parseFloat(formData.budget) || 0,
        })
        setProjects([...projects, newProject])
        setFormData({ name: '', client_name: '', budget: '', status: 'upcoming' })
        setShowNewProjectModal(false)
      } catch (error) {
        console.error('Failed to create project:', error)
      }
    }
  }

  const isDetailPage = pathname.includes('/projects/') && pathname !== '/projects'

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-screen">
        {/* Mobile Sidebar Toggle */}
        {isMobile && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed bottom-6 right-6 z-40 btn-primary p-4 rounded-full shadow-lg md:hidden"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        )}

        {/* Mobile Overlay */}
        <AnimatePresence>
          {isMobile && sidebarOpen && (
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
          initial={isMobile ? { x: -320 } : { x: 0 }}
          animate={isMobile ? (sidebarOpen ? { x: 0 } : { x: -320 }) : { x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`${
            isDetailPage ? 'lg:w-72' : 'lg:w-96'
          } w-80 flex-shrink-0 glass rounded-2xl border border-white/10 p-4 lg:p-6 overflow-y-auto max-h-[85vh] lg:max-h-none lg:sticky lg:top-0 fixed md:relative left-0 top-0 z-40 lg:z-auto`}
        >
          <div className="mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 lg:w-6 lg:h-6 text-primary-400" />
              <span>Projects</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowNewProjectModal(true)
                if (isMobile) setSidebarOpen(false)
              }}
              className="w-full btn-primary flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm lg:text-base"
            >
              <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
              New Project
            </motion.button>
          </div>

          {/* Projects List */}
          <div className="space-y-3">
            {loading ? (
              <div className="text-center text-secondary-400 text-sm">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="text-center text-secondary-400 text-sm py-8">No projects yet</div>
            ) : (
              projects.map((project) => (
                <motion.button
                  key={project.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedProjectId(project.id)
                    router.push(`/projects/${project.id}`)
                    if (isMobile) setSidebarOpen(false)
                  }}
                  className={`w-full text-left p-3 lg:p-4 rounded-lg transition-all duration-300 ${
                    selectedProjectId === project.id
                      ? 'bg-primary-600/30 border border-primary-500/50 shadow-glow'
                      : 'bg-secondary-800/50 border border-secondary-700/50 hover:bg-secondary-700/50'
                  }`}
                >
                  <div className="mb-2">
                    <p className="font-semibold text-white text-sm lg:text-base truncate">{project.name}</p>
                    <p className="text-xs text-secondary-400 truncate">{project.client_name}</p>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-secondary-400">Progress</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        project.status === 'completed'
                          ? 'bg-green-500/20 text-green-300'
                          : project.status === 'running'
                          ? 'bg-blue-500/20 text-blue-300'
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
                  <p className="text-xs text-primary-300">Budget: ${(project.budget / 1000).toFixed(0)}K</p>
                </motion.button>
              ))
            )}
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
                className="card max-w-md w-full relative"
              >
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="absolute top-4 right-4 text-secondary-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">Create New Project</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs lg:text-sm text-secondary-300 mb-2">Project Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter project name"
                      className="w-full glass-sm rounded-lg px-3 lg:px-4 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs lg:text-sm text-secondary-300 mb-2">Client Name *</label>
                    <input
                      type="text"
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      placeholder="Enter client name"
                      className="w-full glass-sm rounded-lg px-3 lg:px-4 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs lg:text-sm text-secondary-300 mb-2">Budget ($)</label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="Enter budget"
                      className="w-full glass-sm rounded-lg px-3 lg:px-4 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs lg:text-sm text-secondary-300 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full glass-sm rounded-lg px-3 lg:px-4 py-2 text-sm"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="running">Running</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowNewProjectModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg border border-secondary-700 text-secondary-300 hover:text-white transition-colors text-sm"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={handleCreateProject}
                    className="flex-1 btn-primary rounded-lg text-sm"
                  >
                    Create
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0 pr-0 md:pr-4">
          {children}
        </div>
      </div>
    </DashboardLayout>
  )
}
