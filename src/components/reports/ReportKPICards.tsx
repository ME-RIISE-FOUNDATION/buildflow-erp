'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, TrendingDown, Target, AlertCircle, CheckCircle } from 'lucide-react'

interface KPICard {
  label: string
  value: number
  icon: React.ReactNode
  color: string
  bgColor: string
  suffix?: string
  trend?: number
  isCurrency?: boolean
}

const AnimatedCounter = ({ value, isCurrency }: { value: number; isCurrency?: boolean }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 50)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(Math.round(end))
        clearInterval(timer)
      } else {
        setCount(Math.round(start))
      }
    }, 50)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="text-3xl font-bold text-white">
      {isCurrency ? '₹' : ''}{count.toLocaleString()}
      {!isCurrency ? '%' : ''}
    </span>
  )
}

export default function ReportKPICards() {
  const kpis: KPICard[] = []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {kpis.map((kpi, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className={`bg-gradient-to-br ${kpi.bgColor} border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-white/20 transition-all cursor-default`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${kpi.bgColor}`}>
              <div className={kpi.color}>{kpi.icon}</div>
            </div>
          </div>
          <p className="text-secondary-400 text-sm mb-2">{kpi.label}</p>
          <AnimatedCounter value={kpi.value} isCurrency={kpi.isCurrency} />
        </motion.div>
      ))}
    </motion.div>
  )
}
