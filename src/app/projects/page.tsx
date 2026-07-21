'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, MoreVertical } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'Downtown Mall Complex - Phase 2',
    client: 'Skyline Developers',
    status: 'running',
    progress: 65,
    budget: 250000,
    spent: 162500,
    startDate: '2026-03-15',
    dueDate: '2026-12-31',
  },
  {
    id: 2,
    name: 'Residential Complex - Tower A',
    client: 'Urban Living Inc',
    status: 'completed',
    progress: 100,
    budget: 180000,
    spent: 180000,
    startDate: '2025-08-01',
    dueDate: '2026-05-31',
  },
  {
    id: 3,
    name: 'Office Building Renovation',
    client: 'Corporate Spaces Ltd',
    status: 'delayed',
    progress: 45,
    budget: 120000,
    spent: 54000,
    startDate: '2026-01-15',
    dueDate: '2026-08-31',
  },
  {
    id: 4,
    name: 'Shopping Center Extension',
    client: 'Retail Plus',
    status: 'upcoming',
    progress: 0,
    budget: 320000,
    spent: 0,
    startDate: '2026-09-01',
    dueDate: '2027-03-31',
  },
]

const statusColors = {
  running: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-300 border-green-500/30',
  delayed: 'bg-red-500/20 text-red-300 border-red-500/30',
  upcoming: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
              <p className="text-secondary-400">Manage all construction projects</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Project
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-sm rounded-xl"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-3 glass-sm rounded-xl flex items-center gap-2 text-secondary-300 hover:text-white transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filter
          </motion.button>
        </motion.div>

        {/* Projects Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 font-semibold text-secondary-300">Project Name</th>
                <th className="text-left py-4 px-6 font-semibold text-secondary-300">Client</th>
                <th className="text-left py-4 px-6 font-semibold text-secondary-300">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-secondary-300">Progress</th>
                <th className="text-left py-4 px-6 font-semibold text-secondary-300">Budget</th>
                <th className="text-left py-4 px-6 font-semibold text-secondary-300">Due Date</th>
                <th className="text-center py-4 px-6 font-semibold text-secondary-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-secondary-800/30 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-white">{project.name}</td>
                  <td className="py-4 px-6 text-secondary-400">{project.client}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status as keyof typeof statusColors]}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-32 h-2 bg-secondary-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ delay: index * 0.05 + 0.3, duration: 1 }}
                        className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
                      />
                    </div>
                    <p className="text-xs text-secondary-400 mt-1">{project.progress}%</p>
                  </td>
                  <td className="py-4 px-6 text-secondary-400">
                    ${project.budget.toLocaleString()} / ${project.spent.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-secondary-400">{project.dueDate}</td>
                  <td className="py-4 px-6 text-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-2 hover:bg-secondary-700 rounded-lg transition-colors inline-flex"
                    >
                      <MoreVertical className="w-5 h-5 text-secondary-400" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
