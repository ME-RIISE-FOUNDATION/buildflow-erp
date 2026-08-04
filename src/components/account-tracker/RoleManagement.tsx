'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, XCircle, Lock, Eye, Edit as EditIcon } from 'lucide-react'
import { ROLE_PERMISSIONS, getRoleDisplayName, getRoleColor } from '@/utils/auth'
import type { UserRole } from '@/utils/auth'

const ALL_PERMISSIONS = [
  'manage_users',
  'manage_roles',
  'manage_projects',
  'manage_clients',
  'manage_materials',
  'manage_suppliers',
  'manage_labour',
  'view_reports',
  'manage_settings',
  'view_audit_logs',
  'export_data',
  'delete_projects',
  'manage_payments',
  'view_projects',
  'view_clients',
  'view_suppliers',
  'upload_files',
]

const PERMISSION_DESCRIPTIONS: Record<string, string> = {
  manage_users: 'Create, update, and delete users',
  manage_roles: 'Modify role permissions and assignments',
  manage_projects: 'Create and manage construction projects',
  manage_clients: 'Manage client information and records',
  manage_materials: 'Control material inventory and purchases',
  manage_suppliers: 'Manage supplier relationships',
  manage_labour: 'Manage workforce and labour costs',
  view_reports: 'Access and generate business reports',
  manage_settings: 'Configure application settings',
  view_audit_logs: 'Access audit trail and logs',
  export_data: 'Export data in various formats',
  delete_projects: 'Delete or archive projects',
  manage_payments: 'Process and manage payments',
  view_projects: 'View project information',
  view_clients: 'View client details',
  view_suppliers: 'View supplier information',
  upload_files: 'Upload project documents and files',
}

interface RoleManagementProps {
  onPermissionChange?: (role: UserRole, permissions: string[]) => void
}

export default function RoleManagement({ onPermissionChange }: RoleManagementProps) {
  const [expandedRole, setExpandedRole] = useState<UserRole | null>(null)
  const [rolePermissions, setRolePermissions] = useState(ROLE_PERMISSIONS)

  const roles: UserRole[] = ['super_admin', 'admin', 'project_manager', 'accountant', 'site_engineer', 'viewer']

  const handlePermissionToggle = (role: UserRole, permission: string) => {
    const currentPerms = [...rolePermissions[role]]
    const index = currentPerms.indexOf(permission)

    if (index > -1) {
      currentPerms.splice(index, 1)
    } else {
      currentPerms.push(permission)
    }

    setRolePermissions({
      ...rolePermissions,
      [role]: currentPerms,
    })

    onPermissionChange?.(role, currentPerms)
  }

  const getPermissionCategory = (permission: string): string => {
    if (['manage_users', 'manage_roles'].includes(permission)) return 'Administration'
    if (['manage_projects', 'delete_projects', 'manage_clients'].includes(permission)) return 'Projects'
    if (['manage_materials', 'manage_suppliers', 'manage_labour'].includes(permission)) return 'Operations'
    if (['manage_payments', 'manage_settings', 'view_audit_logs'].includes(permission)) return 'Finance & Settings'
    if (['view_reports', 'export_data', 'upload_files'].includes(permission)) return 'Data & Reports'
    return 'General'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary-400" />
          Role Management
        </h2>
        <p className="text-secondary-400 mt-1">Configure permissions for each role</p>
      </div>

      {/* Roles Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {roles.map(role => {
          const isExpanded = expandedRole === role
          const permissions = rolePermissions[role]
          const permissionCount = permissions.length
          const percentComplete = (permissionCount / ALL_PERMISSIONS.length) * 100

          return (
            <motion.div
              key={role}
              variants={itemVariants}
              className={`border ${isExpanded ? 'border-white/20' : 'border-white/5'} rounded-lg overflow-hidden transition-all`}
            >
              {/* Role Header */}
              <motion.button
                onClick={() => setExpandedRole(isExpanded ? null : role)}
                className="w-full p-4 bg-secondary-800/30 hover:bg-secondary-800/50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getRoleColor(role)} text-white`}>
                        {getRoleDisplayName(role)}
                      </span>
                      <span className="text-xs text-secondary-400">
                        {permissionCount} of {ALL_PERMISSIONS.length} permissions
                      </span>
                    </div>

                    {/* Permission Bar */}
                    <div className="w-full bg-secondary-900 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentComplete}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
                      />
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="ml-4 flex-shrink-0"
                  >
                    <EditIcon className="w-5 h-5 text-secondary-400" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Permissions List */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isExpanded ? 'auto' : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-secondary-900/20 border-t border-white/5"
              >
                <div className="p-4 space-y-4">
                  {/* Permissions by Category */}
                  {['Administration', 'Projects', 'Operations', 'Finance & Settings', 'Data & Reports', 'General'].map(category => {
                    const categoryPerms = ALL_PERMISSIONS.filter(p => getPermissionCategory(p) === category)
                    if (categoryPerms.length === 0) return null

                    return (
                      <div key={category}>
                        <h4 className="text-xs font-semibold text-secondary-300 uppercase tracking-wide mb-3">
                          {category}
                        </h4>

                        <div className="space-y-2">
                          {categoryPerms.map(permission => {
                            const isGranted = permissions.includes(permission)
                            const isReadOnly = role === 'super_admin' && ['manage_users', 'manage_roles'].includes(permission)

                            return (
                              <motion.label
                                key={permission}
                                whileHover={{ x: 4 }}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary-800/30 transition-colors cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={isGranted}
                                  onChange={() => !isReadOnly && handlePermissionToggle(role, permission)}
                                  disabled={isReadOnly}
                                  className="mt-1 w-5 h-5 rounded border-white/20 text-primary-600 focus:ring-primary-600 disabled:opacity-50"
                                />

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-white capitalize">
                                      {permission.replace(/_/g, ' ')}
                                    </p>
                                    {isReadOnly && (
                                      <Lock className="w-3 h-3 text-yellow-400" aria-label="System permission" />
                                    )}
                                  </div>
                                  <p className="text-xs text-secondary-400 mt-1">
                                    {PERMISSION_DESCRIPTIONS[permission]}
                                  </p>
                                </div>

                                <div className="flex-shrink-0">
                                  {isGranted ? (
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-secondary-600" />
                                  )}
                                </div>
                              </motion.label>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Quick Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-secondary-900/40 border border-white/5 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-white mb-1">Permission System</p>
            <p className="text-sm text-secondary-400">
              Permissions are automatically enforced across the application. Users can only access features
              and perform actions that their assigned role permits. Changes take effect immediately upon the
              user's next action.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Permission Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Permission Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-secondary-800/30 border border-white/5 rounded-lg"
        >
          <h3 className="font-semibold text-white mb-4">Permission Summary</h3>
          <div className="space-y-3">
            {roles.map(role => (
              <div key={role} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-secondary-400 w-20">
                  {getRoleDisplayName(role)}
                </span>
                <div className="flex-1 bg-secondary-900 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(rolePermissions[role].length / ALL_PERMISSIONS.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
                  />
                </div>
                <span className="text-xs text-secondary-400 w-12 text-right">
                  {rolePermissions[role].length}/{ALL_PERMISSIONS.length}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-secondary-800/30 border border-white/5 rounded-lg"
        >
          <h3 className="font-semibold text-white mb-4">Total Permissions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-secondary-400">Available Permissions</span>
              <span className="text-2xl font-bold text-primary-400">{ALL_PERMISSIONS.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-secondary-400">Active Roles</span>
              <span className="text-2xl font-bold text-primary-400">{roles.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-secondary-400">System Locked Permissions</span>
              <span className="text-2xl font-bold text-yellow-400">2</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
