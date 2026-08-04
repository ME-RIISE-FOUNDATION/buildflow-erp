'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Target, Users, DollarSign, Zap, AlertCircle, CheckCircle } from 'lucide-react'
import { formatCurrencyShort } from '@/utils/construction'

interface KPICardData {
  label: string
  value: string | number
  trend: number
  trendLabel: string
  icon: React.ReactNode
  color: string
  lightBg: string
  gradient: string
}

interface EnterpriseKPICardsProps {
  kpis: any
}

export default function EnterpriseKPICards({ kpis }: EnterpriseKPICardsProps) {
  const cards: KPICardData[] = [
    {
      label: 'Total Projects',
      value: kpis?.totalProjects || 0,
      trend: 12,
      trendLabel: 'vs last month',
      icon: <Target className="w-6 h-6" />,
      color: 'text-primary-400',
      lightBg: 'bg-primary-600/5',
      gradient: 'from-primary-600 to-primary-400',
    },
    {
      label: 'Completed Projects',
      value: kpis?.completedProjects || 0,
      trend: 8,
      trendLabel: 'completion rate',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-emerald-400',
      lightBg: 'bg-emerald-600/5',
      gradient: 'from-emerald-600 to-emerald-400',
    },
    {
      label: 'Ongoing Projects',
      value: kpis?.ongoingProjects || 0,
      trend: 5,
      trendLabel: 'in progress',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-blue-400',
      lightBg: 'bg-blue-600/5',
      gradient: 'from-blue-600 to-blue-400',
    },
    {
      label: 'Total Revenue',
      value: formatCurrencyShort(kpis?.totalRevenue || 0),
      trend: 15,
      trendLabel: 'growth',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-green-400',
      lightBg: 'bg-green-600/5',
      gradient: 'from-green-600 to-green-400',
    },
    {
      label: 'Total Expenses',
      value: formatCurrencyShort(kpis?.totalExpense || 0),
      trend: -3,
      trendLabel: 'cost control',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-orange-400',
      lightBg: 'bg-orange-600/5',
      gradient: 'from-orange-600 to-orange-400',
    },
    {
      label: 'Total Paid',
      value: formatCurrencyShort(kpis?.totalPaid || 0),
      trend: 22,
      trendLabel: 'payment processed',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-purple-400',
      lightBg: 'bg-purple-600/5',
      gradient: 'from-purple-600 to-purple-400',
    },
    {
      label: 'Outstanding Balance',
      value: formatCurrencyShort(kpis?.outstandingBalance || 0),
      trend: -5,
      trendLabel: 'pending',
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'text-red-400',
      lightBg: 'bg-red-600/5',
      gradient: 'from-red-600 to-red-400',
    },
    {
      label: 'Total Clients',
      value: kpis?.totalClients || 0,
      trend: 6,
      trendLabel: 'new clients',
      icon: <Users className="w-6 h-6" />,
      color: 'text-indigo-400',
      lightBg: 'bg-indigo-600/5',
      gradient: 'from-indigo-600 to-indigo-400',
    },
    {
      label: 'Monthly Progress',
      value: `${kpis?.monthlyProgress || 0}%`,
      trend: 18,
      trendLabel: 'on schedule',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-cyan-400',
      lightBg: 'bg-cyan-600/5',
      gradient: 'from-cyan-600 to-cyan-400',
    },
    {
      label: 'Profit/Loss',
      value: formatCurrencyShort(kpis?.profitLoss || 0),
      trend: kpis?.profitLoss >= 0 ? 12 : -8,
      trendLabel: 'margin',
      icon: <TrendingDown className="w-6 h-6" />,
      color: kpis?.profitLoss >= 0 ? 'text-emerald-400' : 'text-red-400',
      lightBg: kpis?.profitLoss >= 0 ? 'bg-emerald-600/5' : 'bg-red-600/5',
      gradient: kpis?.profitLoss >= 0 ? 'from-emerald-600 to-emerald-400' : 'from-red-600 to-red-400',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -6 }}
          className={`${card.lightBg} border border-white/5 rounded-2xl p-5 backdrop-blur-xl hover:border-white/10 transition-all duration-300 cursor-pointer`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`bg-gradient-to-br ${card.gradient} p-3 rounded-xl`}>
              <div className={`${card.color}`}>{card.icon}</div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold">
              {card.trend >= 0 ? (
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={card.trend >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                {Math.abs(card.trend)}%
              </span>
            </div>
          </div>
          <p className="text-secondary-400 text-xs font-medium mb-2">{card.label}</p>
          <p className="text-2xl md:text-3xl font-bold text-white mb-2">{card.value}</p>
          <p className="text-xs text-secondary-500">{card.trendLabel}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
