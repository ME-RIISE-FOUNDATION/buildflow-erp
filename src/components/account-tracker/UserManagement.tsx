'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Edit2, Trash2, Mail, Phone, Calendar, Shield, ToggleRight } from 'lucide-react'
import { getRoleDisplayName, getRoleColor } from '@/utils/auth'
import type { User, UserRole } from '@/utils/auth'
import Modal from './Modal'

const ROLES: UserRole[] = ['super_admin', 'admin', 'project_manager', 'accountant', 'site_engineer', 'viewer']

interface UserManagementProps {
  users?: User[]
  onUserAdd?: (user: User) => void
  onUserUpdate?: (userId: string, user: Partial<User>) => void
  onUserDelete?: (userId: string) => void
  onRoleChange?: (userId: string, role: UserRole) => void
}

export default function UserManagement({
  users = [],
  onUserAdd,
  onUserUpdate,
  onUserDelete,
  onRoleChange,
}: UserManagementProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'viewer' as UserRole,
    department: '',
  })

  const handleAddUser = () => {
    if (!formData.name || !formData.email) return

    const newUser: User = {
      id: `USER-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      role: formData.role,
      department: formData.department || undefined,
      isActive: true,
      createdAt: new Date().toISOString(),
    }

    onUserAdd?.(newUser)
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'viewer',
      department: '',
    })
    setIsAddModalOpen(false)
  }

  const handleEditUser = () => {
    if (!editingUser) return

    onUserUpdate?.(editingUser.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
    })

    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'viewer',
      department: '',
    })
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      department: user.department || '',
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-primary-400" />
            User Management
          </h2>
          <p className="text-secondary-400 mt-1">Manage team members and their access levels</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add User
        </motion.button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-secondary-800/30 border border-white/5 rounded-lg">
          <p className="text-xs text-secondary-400 mb-1">Total Users</p>
          <p className="text-2xl font-bold text-white">{users.length}</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-green-600/10 border border-green-500/20 rounded-lg">
          <p className="text-xs text-green-400 mb-1">Active Users</p>
          <p className="text-2xl font-bold text-green-400">{users.filter(u => u.isActive).length}</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-blue-400 mb-1">Admins</p>
          <p className="text-2xl font-bold text-blue-400">
            {users.filter(u => u.role === 'super_admin' || u.role === 'admin').length}
          </p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-lg">
          <p className="text-xs text-purple-400 mb-1">Active Sessions</p>
          <p className="text-2xl font-bold text-purple-400">
            {users.filter(u => u.lastLogin).length}
          </p>
        </motion.div>
      </div>

      {/* Users Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {users.map(user => (
          <motion.div
            key={user.id}
            variants={itemVariants}
            className="p-5 bg-secondary-800/30 hover:bg-secondary-800/50 border border-white/5 hover:border-white/10 rounded-lg transition-all"
          >
            {/* User Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-semibold text-white">{user.name}</p>
                  {user.isActive ? (
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  ) : (
                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  )}
                </div>

                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getRoleColor(user.role)} text-white`}>
                  {getRoleDisplayName(user.role)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => openEditModal(user)}
                  className="p-2 hover:bg-secondary-700 rounded-lg text-secondary-400 hover:text-white transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => onUserDelete?.(user.id)}
                  className="p-2 hover:bg-red-600/20 rounded-lg text-secondary-400 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-secondary-400">
                <Mail className="w-4 h-4" />
                <span className="truncate">{user.email}</span>
              </div>

              {user.phone && (
                <div className="flex items-center gap-2 text-sm text-secondary-400">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
              )}

              {user.department && (
                <div className="flex items-center gap-2 text-sm text-secondary-400">
                  <Shield className="w-4 h-4" />
                  <span>{user.department}</span>
                </div>
              )}

              {user.lastLogin && (
                <div className="flex items-center gap-2 text-xs text-secondary-500">
                  <Calendar className="w-4 h-4" />
                  <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div className="pt-4 border-t border-white/5">
              <select
                value={user.role}
                onChange={(e) => onRoleChange?.(user.id, e.target.value as UserRole)}
                className="w-full bg-secondary-900/50 border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500"
              >
                {ROLES.map(role => (
                  <option key={role} value={role}>
                    {getRoleDisplayName(role)}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={isAddModalOpen || editingUser !== null}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingUser(null)
          setFormData({
            name: '',
            email: '',
            phone: '',
            role: 'viewer',
            department: '',
          })
        }}
        title={editingUser ? 'Edit User' : 'Add New User'}
        size="md"
      >
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full name"
              className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="user@example.com"
              className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Department
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g., Site Operations"
              className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Role Selection (only for add) */}
          {!editingUser && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Role <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"
              >
                {ROLES.map(role => (
                  <option key={role} value={role}>
                    {getRoleDisplayName(role)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={editingUser ? handleEditUser : handleAddUser}
              className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
            >
              {editingUser ? 'Update User' : 'Add User'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setIsAddModalOpen(false)
                setEditingUser(null)
              }}
              className="flex-1 px-4 py-2.5 bg-secondary-800 hover:bg-secondary-700 text-white rounded-lg transition-colors font-medium"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="text-center py-16">
          <Users className="w-16 h-16 text-secondary-600 mx-auto mb-4 opacity-50" />
          <p className="text-secondary-400">No users yet</p>
          <p className="text-secondary-500 text-sm">Add your first user to get started</p>
        </div>
      )}
    </div>
  )
}
