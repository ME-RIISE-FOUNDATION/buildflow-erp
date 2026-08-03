'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function ProjectsPage() {
  // Mock data
  const stats = {
    total: 24,
    completed: 10,
    running: 9,
    upcoming: 5,
  }

  const mockProjects = [
    {
      id: 1,
      name: 'AK Villa Project',
      client: 'Mr. Sharma',
      status: 'completed',
      progress: 100,
      budget: 500000,
    },
    {
      id: 2,
      name: 'Interior Design Work',
      client: 'Mr. Kumar',
      status: 'running',
      progress: 65,
      budget: 300000,
    },
    {
      id: 3,
      name: 'Commercial Building',
      client: 'XYZ Corp',
      status: 'running',
      progress: 45,
      budget: 2000000,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Projects Overview</h1>
        <p className="text-secondary-400">
          Manage and track all your construction projects
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-secondary-400 text-sm font-medium">Total Projects</h3>
            <Briefcase className="w-5 h-5 text-primary-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
          <p className="text-xs text-secondary-400 mt-2">All time</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-green-600/20 via-secondary-900/50 to-secondary-900/30 border border-green-500/20 rounded-2xl p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 text-sm font-medium">Completed</h3>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
          <p className="text-xs text-green-500 mt-2">Finished projects</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-blue-600/20 via-secondary-900/50 to-secondary-900/30 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 text-sm font-medium">Running</h3>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-blue-400">{stats.running}</p>
          <p className="text-xs text-blue-500 mt-2">In progress</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-yellow-600/20 via-secondary-900/50 to-secondary-900/30 border border-yellow-500/20 rounded-2xl p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-yellow-400 text-sm font-medium">Upcoming</h3>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-yellow-400">{stats.upcoming}</p>
          <p className="text-xs text-yellow-500 mt-2">Not started</p>
        </motion.div>
      </div>

      {/* Projects List */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Recent Projects</h2>
        <div className="space-y-4">
          {mockProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 4 }}
              className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{project.name}</h3>
                  <p className="text-secondary-400 text-sm mt-1">Client: {project.client}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : project.status === 'running'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {project.status === 'completed'
                    ? '✓ Completed'
                    : project.status === 'running'
                    ? '⚙ Running'
                    : '⏱ Upcoming'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-secondary-400">Progress</span>
                  <span className="font-semibold text-white">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-secondary-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4 text-secondary-400" />
                <span className="text-secondary-400">
                  Budget: <span className="text-primary-400 font-semibold">₹{(project.budget / 100000).toFixed(1)}L</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
