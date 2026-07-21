'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  trend: string
  color: string
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color,
}: StatCardProps) {
  const isPositive = !trend.startsWith('-')

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className={`card group relative overflow-hidden`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className={`p-3 rounded-lg bg-gradient-to-br ${color} text-white`}
          >
            <Icon className="w-6 h-6" />
          </motion.div>

          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
            isPositive
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {trend}
          </div>
        </div>

        <div>
          <p className="text-secondary-400 text-sm mb-1">{label}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-white"
          >
            {value}
          </motion.p>
        </div>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20"
        animate={{
          borderColor: ['rgba(255,255,255,0)', 'rgba(37,99,235,0.3)', 'rgba(255,255,255,0)'],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  )
}
