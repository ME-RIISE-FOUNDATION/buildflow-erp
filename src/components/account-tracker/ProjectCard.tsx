'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MoreVertical, Edit, Trash2, Archive, TrendingUp } from 'lucide-react'
import { formatCurrencyShort, getStatusColor } from '@/utils/construction'
import type { Project } from '@/types/construction'

interface ProjectCardProps {
  project: Project
  onEdit?: (project: Project) => void
  onDelete?: (projectId: string) => void
  onArchive?: (projectId: string) => void
}

export default function ProjectCard({ project, onEdit, onDelete, onArchive }: ProjectCardProps) {
  const budgetUsage = (project.expense / project.budget) * 100
  const profitMargin = ((project.revenue - project.expense) / project.revenue) * 100

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl hover:border-white/10 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
          <p className="text-sm text-secondary-400">{project.client}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-2 hover:bg-secondary-700 rounded-lg transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-secondary-400" />
        </motion.button>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
        <span className="text-xs bg-secondary-800/50 text-secondary-400 px-3 py-1 rounded-full">
          {project.type}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-secondary-400 font-medium">Progress</span>
          <span className="text-sm font-bold text-white">{project.progress}%</span>
        </div>
        <div className="w-full h-2 bg-secondary-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
          />
        </div>
      </div>

      {/* Financial Info */}
      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-white/5">
        <div>
          <p className="text-xs text-secondary-400 mb-1">Budget</p>
          <p className="text-sm font-bold text-white">{formatCurrencyShort(project.budget)}</p>
        </div>
        <div>
          <p className="text-xs text-secondary-400 mb-1">Expense</p>
          <p className="text-sm font-bold text-orange-400">{formatCurrencyShort(project.expense)}</p>
        </div>
        <div>
          <p className="text-xs text-secondary-400 mb-1">Revenue</p>
          <p className="text-sm font-bold text-emerald-400">{formatCurrencyShort(project.revenue)}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-secondary-800/30 rounded-lg p-2">
          <p className="text-xs text-secondary-400 mb-1">Budget Usage</p>
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold text-white">{budgetUsage.toFixed(1)}%</p>
            <TrendingUp className={`w-4 h-4 ${budgetUsage > 85 ? 'text-red-400' : 'text-emerald-400'}`} />
          </div>
        </div>
        <div className="bg-secondary-800/30 rounded-lg p-2">
          <p className="text-xs text-secondary-400 mb-1">Profit Margin</p>
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold text-white">{profitMargin.toFixed(1)}%</p>
            <TrendingUp className={`w-4 h-4 ${profitMargin > 0 ? 'text-emerald-400' : 'text-red-400'}`} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit?.(project)}
          className="flex-1 bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onArchive?.(project.id)}
          className="flex-1 bg-secondary-700/20 hover:bg-secondary-700/30 text-secondary-400 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Archive className="w-4 h-4" />
          Archive
        </motion.button>
      </div>
    </motion.div>
  )
}
