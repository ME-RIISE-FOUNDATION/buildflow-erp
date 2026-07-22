'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, TrendingUp, CheckCircle, Clock } from 'lucide-react'
import { api } from '@/lib/api'

export default function ProjectsPage() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    running: 0,
    upcoming: 0,
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const projects = await api.getProjects()
      setStats({
        total: projects.length,
        completed: projects.filter((p: any) => p.status === 'completed').length,
        running: projects.filter((p: any) => p.status === 'running').length,
        upcoming: projects.filter((p: any) => p.status === 'upcoming').length,
      })
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Projects Overview</h1>
        <p className="text-secondary-400">
          Select a project from the left sidebar to view its dashboard and manage details.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="card bg-gradient-to-br from-primary-600/10 to-primary-400/10"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary-600 to-primary-400">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-secondary-400 text-sm mb-2">Total Projects</p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="card bg-gradient-to-br from-green-600/10 to-green-400/10"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-green-600 to-green-400">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-secondary-400 text-sm mb-2">Completed</p>
          <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="card bg-gradient-to-br from-blue-600/10 to-blue-400/10"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-secondary-400 text-sm mb-2">Running</p>
          <p className="text-3xl font-bold text-blue-400">{stats.running}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="card bg-gradient-to-br from-yellow-600/10 to-yellow-400/10"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-400">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-secondary-400 text-sm mb-2">Upcoming</p>
          <p className="text-3xl font-bold text-yellow-400">{stats.upcoming}</p>
        </motion.div>
      </div>

      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card bg-gradient-to-br from-primary-600/20 to-accent-600/20 border-primary-500/30"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Welcome to Projects Module</h2>
        <div className="space-y-3 text-secondary-300">
          <p>
            ✨ <strong>Click on any project card in the left sidebar</strong> to open its detailed dashboard.
          </p>
          <p>
            📋 Each project has its own independent dashboard with sections for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Customer & Owner Information</li>
            <li>Property Measurements & Site Address</li>
            <li>Material Management (Add, Edit, Delete materials)</li>
            <li>Cost Estimation & Expense Tracking</li>
            <li>Construction Progress Tracking</li>
            <li>Documents & Reports Management</li>
            <li>Project Notes</li>
          </ul>
          <p className="mt-4">
            🚀 <strong>Click "+ New Project"</strong> in the left sidebar to create a new project.
          </p>
        </div>
      </motion.div>

      {/* Features Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">📊 Material Management</h3>
          <p className="text-secondary-400 mb-4">
            Comprehensive material tracking with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-secondary-300 text-sm">
            <li>Add, Edit, Delete materials</li>
            <li>Track quantity and pricing</li>
            <li>Monitor used vs remaining stock</li>
            <li>Supplier information</li>
            <li>Real-time cost calculations</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">💰 Financial Tracking</h3>
          <p className="text-secondary-400 mb-4">
            Complete financial overview with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-secondary-300 text-sm">
            <li>Total budget tracking</li>
            <li>Expense categorization</li>
            <li>Material vs Labour cost breakdown</li>
            <li>Remaining budget calculation</li>
            <li>Visual charts and analytics</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}
