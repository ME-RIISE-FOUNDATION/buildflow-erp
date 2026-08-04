'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, TrendingUp, AlertCircle, Edit, Trash2 } from 'lucide-react'
import { formatCurrencyShort } from '@/utils/construction'
import type { Client } from '@/types/construction'

interface ClientCardProps {
  client: Client
  onEdit?: (client: Client) => void
  onDelete?: (clientId: string) => void
}

export default function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  const outstandingPercentage = (client.outstandingBalance / client.totalSpent) * 100

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-gradient-to-br from-secondary-800/50 via-secondary-900/50 to-secondary-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl hover:border-white/10 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{client.name}</h3>
          <p className="text-sm text-secondary-400">{client.totalProjects} projects</p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
          client.outstandingBalance > 0
            ? 'bg-red-600/20 text-red-400'
            : 'bg-emerald-600/20 text-emerald-400'
        }`}>
          {client.name.charAt(0)}
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-secondary-400" />
          <span className="text-secondary-300">{client.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-secondary-400" />
          <span className="text-secondary-300 truncate">{client.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-secondary-400" />
          <span className="text-secondary-300">{client.city}, {client.state}</span>
        </div>
      </div>

      {/* Financial Info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-secondary-400 mb-1">Total Spent</p>
          <p className="text-lg font-bold text-white">{formatCurrencyShort(client.totalSpent)}</p>
        </div>
        <div>
          <p className="text-xs text-secondary-400 mb-1">Outstanding</p>
          <p className="text-lg font-bold text-orange-400">{formatCurrencyShort(client.outstandingBalance)}</p>
        </div>
      </div>

      {/* Outstanding Percentage */}
      {client.outstandingBalance > 0 && (
        <div className="mb-4 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-secondary-400">Outstanding</span>
            </div>
            <span className="text-sm font-bold text-orange-400">{outstandingPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 bg-secondary-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${outstandingPercentage}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => onEdit?.(client)}
          className="flex-1 bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => onDelete?.(client.id)}
          className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </motion.button>
      </div>
    </motion.div>
  )
}
