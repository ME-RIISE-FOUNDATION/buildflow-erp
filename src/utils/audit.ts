// Audit Logging & Compliance Utilities

export type AuditAction =
  | 'CREATE' | 'READ' | 'UPDATE' | 'DELETE'
  | 'LOGIN' | 'LOGOUT' | 'EXPORT' | 'DOWNLOAD'
  | 'PAYMENT' | 'INVOICE' | 'APPROVAL' | 'REJECT'
  | 'UPLOAD' | 'PERMISSION_CHANGE' | 'ROLE_CHANGE'

export type AuditEntityType =
  | 'PROJECT' | 'CLIENT' | 'INVOICE' | 'EXPENSE'
  | 'MATERIAL' | 'LABOUR' | 'SUPPLIER' | 'PAYMENT'
  | 'USER' | 'FILE' | 'REPORT' | 'SETTINGS'

export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: AuditAction
  entityType: AuditEntityType
  entityId: string
  entityName?: string
  changes?: {
    field: string
    oldValue: any
    newValue: any
  }[]
  details?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  timestamp: string
  status: 'success' | 'failure'
  errorMessage?: string
}

export interface AuditFilter {
  userId?: string
  action?: AuditAction
  entityType?: AuditEntityType
  startDate?: string
  endDate?: string
  status?: 'success' | 'failure'
}

// In-memory audit log storage (replace with database)
let auditLogs: AuditLog[] = []

/**
 * Log an audit event
 */
export const logAuditEvent = (log: Omit<AuditLog, 'id' | 'timestamp'>): AuditLog => {
  const auditLog: AuditLog = {
    ...log,
    id: `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  }

  auditLogs.push(auditLog)

  // Persist to storage (in production, send to backend)
  persistAuditLog(auditLog)

  return auditLog
}

/**
 * Get audit logs with filtering
 */
export const getAuditLogs = (filter?: AuditFilter, limit: number = 100): AuditLog[] => {
  let filtered = [...auditLogs]

  if (filter?.userId) {
    filtered = filtered.filter(log => log.userId === filter.userId)
  }

  if (filter?.action) {
    filtered = filtered.filter(log => log.action === filter.action)
  }

  if (filter?.entityType) {
    filtered = filtered.filter(log => log.entityType === filter.entityType)
  }

  if (filter?.startDate) {
    filtered = filtered.filter(log => new Date(log.timestamp) >= new Date(filter.startDate!))
  }

  if (filter?.endDate) {
    filtered = filtered.filter(log => new Date(log.timestamp) <= new Date(filter.endDate!))
  }

  if (filter?.status) {
    filtered = filtered.filter(log => log.status === filter.status)
  }

  // Sort by timestamp descending (most recent first)
  return filtered.sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, limit)
}

/**
 * Get audit logs for specific entity
 */
export const getEntityAuditLogs = (entityType: AuditEntityType, entityId: string): AuditLog[] => {
  return auditLogs
    .filter(log => log.entityType === entityType && log.entityId === entityId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

/**
 * Get user activity summary
 */
export const getUserActivitySummary = (userId: string, days: number = 30) => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const userLogs = auditLogs.filter(
    log => log.userId === userId && new Date(log.timestamp) >= startDate
  )

  return {
    totalActions: userLogs.length,
    successfulActions: userLogs.filter(l => l.status === 'success').length,
    failedActions: userLogs.filter(l => l.status === 'failure').length,
    actionsByType: Object.fromEntries(
      Array.from(
        new Set(userLogs.map(l => l.action))
      ).map(action => [
        action,
        userLogs.filter(l => l.action === action).length
      ])
    ),
    lastActivity: userLogs[0]?.timestamp,
  }
}

/**
 * Export audit logs to CSV
 */
export const exportAuditLogs = (logs: AuditLog[], filename: string = 'audit_logs.csv'): void => {
  const headers = ['ID', 'User', 'Action', 'Entity Type', 'Entity ID', 'Timestamp', 'Status']
  const rows = logs.map(log => [
    log.id,
    log.userName,
    log.action,
    log.entityType,
    log.entityId,
    log.timestamp,
    log.status,
  ])

  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.URL.revokeObjectURL(url)
}

/**
 * Persist audit log (placeholder for backend integration)
 */
const persistAuditLog = (log: AuditLog): void => {
  // In production, send to backend API
  // POST /api/audit-logs with the log data
  // For now, just console.log
  console.log('[AUDIT LOG]', log)
}

/**
 * Get audit statistics
 */
export const getAuditStatistics = () => {
  const totalLogs = auditLogs.length
  const successLogs = auditLogs.filter(l => l.status === 'success').length
  const failureLogs = auditLogs.filter(l => l.status === 'failure').length

  const actionCounts = Object.fromEntries(
    Array.from(new Set(auditLogs.map(l => l.action))).map(action => [
      action,
      auditLogs.filter(l => l.action === action).length
    ])
  )

  const entityCounts = Object.fromEntries(
    Array.from(new Set(auditLogs.map(l => l.entityType))).map(type => [
      type,
      auditLogs.filter(l => l.entityType === type).length
    ])
  )

  return {
    totalLogs,
    successLogs,
    failureLogs,
    successRate: totalLogs > 0 ? (successLogs / totalLogs) * 100 : 0,
    actionCounts,
    entityCounts,
  }
}

/**
 * Clear audit logs (admin only)
 */
export const clearAuditLogs = (): void => {
  auditLogs = []
}
