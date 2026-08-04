'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { getAuditLogs, exportAuditLogs, getAuditStatistics } from '@/utils/audit'
import type { AuditLog, AuditFilter, AuditAction, AuditEntityType } from '@/utils/audit'

const AUDIT_ACTIONS: AuditAction[] = [
  'CREATE', 'READ', 'UPDATE', 'DELETE',
  'LOGIN', 'LOGOUT', 'EXPORT', 'DOWNLOAD',
  'PAYMENT', 'INVOICE', 'APPROVAL', 'REJECT',
  'UPLOAD', 'PERMISSION_CHANGE', 'ROLE_CHANGE'
]

const ENTITY_TYPES: AuditEntityType[] = [
  'PROJECT', 'CLIENT', 'INVOICE', 'EXPENSE',
  'MATERIAL', 'LABOUR', 'SUPPLIER', 'PAYMENT',
  'USER', 'FILE', 'REPORT', 'SETTINGS'
]

interface AuditLogsViewerProps {
  logs?: AuditLog[]
  onExport?: () => void
}

export default function AuditLogsViewer({ onExport }: AuditLogsViewerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAction, setSelectedAction] = useState<AuditAction | ''>('')
  const [selectedEntity, setSelectedEntity] = useState<AuditEntityType | ''>('')
  const [selectedStatus, setSelectedStatus] = useState<'success' | 'failure' | ''>('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const filter: AuditFilter = {
    action: selectedAction || undefined,
    entityType: selectedEntity || undefined,
    status: selectedStatus || undefined,
    startDate: dateRange.start || undefined,
    endDate: dateRange.end || undefined,
  }

  const filteredLogs = useMemo(() => {
    const logs = getAuditLogs(filter, 200)

    return logs.filter(log =>
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, selectedAction, selectedEntity, selectedStatus, dateRange])

  const stats = useMemo(() => getAuditStatistics(), [])

  const handleExport = () => {
    exportAuditLogs(filteredLogs, `audit_logs_${new Date().toISOString().split('T')[0]}.csv`)
    onExport?.()
  }

  const getActionColor = (action: AuditAction): string => {
    if (action.includes('CREATE') || action.includes('UPDATE')) return 'bg-blue-600/20 text-blue-400'
    if (action.includes('DELETE')) return 'bg-red-600/20 text-red-400'
    if (action.includes('DOWNLOAD') || action.includes('EXPORT')) return 'bg-purple-600/20 text-purple-400'
    if (action.includes('LOGIN')) return 'bg-green-600/20 text-green-400'
    if (action.includes('PAYMENT') || action.includes('INVOICE')) return 'bg-cyan-600/20 text-cyan-400'
    return 'bg-gray-600/20 text-gray-400'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-secondary-800/30 border border-white/5 rounded-lg"
        >
          <p className="text-xs text-secondary-400 mb-1">Total Logs</p>
          <p className="text-2xl font-bold text-white">{stats.totalLogs}</p>
          <p className="text-xs text-secondary-500 mt-2">All time</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-green-600/10 border border-green-500/20 rounded-lg"
        >
          <p className="text-xs text-green-400 mb-1">Success Rate</p>
          <p className="text-2xl font-bold text-green-400">{stats.successRate.toFixed(1)}%</p>
          <p className="text-xs text-green-500 mt-2">{stats.successLogs} successful</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-red-600/10 border border-red-500/20 rounded-lg"
        >
          <p className="text-xs text-red-400 mb-1">Failed Logs</p>
          <p className="text-2xl font-bold text-red-400">{stats.failureLogs}</p>
          <p className="text-xs text-red-500 mt-2">Action failures</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg"
        >
          <p className="text-xs text-blue-400 mb-1">Entities</p>
          <p className="text-2xl font-bold text-blue-400">{Object.keys(stats.entityCounts).length}</p>
          <p className="text-xs text-blue-500 mt-2">Entity types</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-secondary-400" />
          <h3 className="font-semibold text-white">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search by user or entity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary-800/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Action Filter */}
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value as AuditAction)}
            className="bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
          >
            <option value="">All Actions</option>
            {AUDIT_ACTIONS.map(action => (
              <option key={action} value={action}>{action}</option>
            ))}
          </select>

          {/* Entity Type Filter */}
          <select
            value={selectedEntity}
            onChange={(e) => setSelectedEntity(e.target.value as AuditEntityType)}
            className="bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
          >
            <option value="">All Entities</option>
            {ENTITY_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as 'success' | 'failure')}
            className="bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="failure">Failure</option>
          </select>

          {/* Start Date */}
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
          />

          {/* End Date */}
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
          />
        </div>

        {/* Export Button */}
        <div className="flex justify-end gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </motion.button>
        </div>
      </div>

      {/* Audit Logs List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">
            Audit Logs ({filteredLogs.length})
          </h3>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-secondary-600 mx-auto mb-4 opacity-50" />
            <p className="text-secondary-400">No logs found</p>
            <p className="text-secondary-500 text-sm">Try adjusting your filters</p>
          </div>
        ) : (
          filteredLogs.map(log => (
            <motion.div
              key={log.id}
              variants={itemVariants}
              className="p-4 bg-secondary-800/30 hover:bg-secondary-800/50 border border-white/5 hover:border-white/10 rounded-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {log.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-semibold text-white">{log.userName}</p>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-secondary-700/50 text-secondary-300">
                      {log.entityType}
                    </span>
                  </div>

                  <p className="text-sm text-secondary-400 mt-2">
                    Entity ID: <span className="text-white">{log.entityId}</span>
                  </p>

                  {log.errorMessage && (
                    <p className="text-sm text-red-400 mt-1">
                      Error: {log.errorMessage}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-secondary-500 mt-2">
                    <span>
                      {new Date(log.timestamp).toLocaleDateString()} at{' '}
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    {log.ipAddress && (
                      <>
                        <span>•</span>
                        <span>IP: {log.ipAddress}</span>
                      </>
                    )}
                  </div>

                  {log.changes && log.changes.length > 0 && (
                    <div className="mt-3 p-3 bg-secondary-900/50 rounded border border-white/5">
                      <p className="text-xs text-secondary-400 mb-2">Changes:</p>
                      <div className="space-y-1">
                        {log.changes.map((change, idx) => (
                          <p key={idx} className="text-xs text-secondary-300">
                            <span className="text-cyan-400">{change.field}</span>: {' '}
                            <span className="text-red-400 line-through">{JSON.stringify(change.oldValue)}</span>
                            {' '} → <span className="text-green-400">{JSON.stringify(change.newValue)}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  )
}
