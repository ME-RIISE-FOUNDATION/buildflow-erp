'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  label: string
  value: string | number
  trend?: number
  trendLabel?: string
  icon: React.ReactNode
  color: string
  lightBg: string
  gradient?: string
  onClick?: () => void
}

export default function StatsCard({
  label,
  value,
  trend,
  trendLabel,
  icon,
  color,
  lightBg,
  gradient = '',
  onClick,
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`${lightBg} border border-white/5 rounded-2xl p-4 backdrop-blur-xl hover:border-white/10 transition-all ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        {gradient ? (
          <div className={`bg-gradient-to-br ${gradient} p-2 rounded-lg`}>
            <div className={`${color}`}>{icon}</div>
          </div>
        ) : (
          <div className={`${color}`}>{icon}</div>
        )}

        {trend !== undefined && (
          <div className="flex items-center gap-1 text-xs font-semibold">
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={trend >= 0 ? 'text-emerald-400' : 'text-red-400'}>
              {Math.abs(trend)}%
            </span>
          </div>
        )}
      </div>

      <p className="text-secondary-400 text-xs font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      {trendLabel && <p className="text-xs text-secondary-500">{trendLabel}</p>}
    </motion.div>
  )
}
