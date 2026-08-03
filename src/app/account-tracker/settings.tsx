'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Settings as SettingsIcon,
  Users,
  Shield,
  FileText,
  Lock,
  Palette,
  ChevronRight,
  Moon,
  Sun,
} from 'lucide-react'
import DashboardLayout from '@/layouts/DashboardLayout'
import FileManager from '@/components/account-tracker/FileManager'
import AuditLogsViewer from '@/components/account-tracker/AuditLogsViewer'
import UserManagement from '@/components/account-tracker/UserManagement'
import RoleManagement from '@/components/account-tracker/RoleManagement'
import type { FileMetadata } from '@/utils/fileManager'
import type { User, UserRole } from '@/utils/auth'

type SettingsTab = 'general' | 'users' | 'roles' | 'files' | 'audit' | 'appearance'

interface MockUser extends User {
  lastLogin?: string
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general')
  const [darkMode, setDarkMode] = useState(true)
  const [files, setFiles] = useState<FileMetadata[]>([])
  const [users, setUsers] = useState<MockUser[]>([
    {
      id: 'USER-001',
      name: 'Admin User',
      email: 'admin@buildflow.com',
      phone: '+91 9876543210',
      role: 'super_admin',
      department: 'Administration',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      lastLogin: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'USER-002',
      name: 'Project Manager',
      email: 'pm@buildflow.com',
      phone: '+91 9876543211',
      role: 'project_manager',
      department: 'Projects',
      isActive: true,
      createdAt: '2024-01-02T00:00:00Z',
      lastLogin: new Date(Date.now() - 86400000).toISOString(),
    },
  ])
  const [companySettings, setCompanySettings] = useState({
    companyName: 'BuildFlow Constructions',
    companyEmail: 'contact@buildflow.com',
    companyPhone: '+91 1800-123-4567',
    address: 'Mumbai, India',
    taxId: 'GSTIN: 27AABBF1234H1Z5',
  })

  const tabs: Array<{ id: SettingsTab; label: string; icon: any; badge?: string }> = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'users', label: 'Users', icon: Users, badge: users.length.toString() },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield },
    { id: 'files', label: 'File Management', icon: FileText, badge: files.length.toString() },
    { id: 'audit', label: 'Audit Logs', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ]

  const handleUserAdd = (newUser: User) => {
    setUsers([...users, newUser as MockUser])
  }

  const handleUserUpdate = (userId: string, updatedUser: Partial<User>) => {
    setUsers(users.map(u => (u.id === userId ? { ...u, ...updatedUser } : u)))
  }

  const handleUserDelete = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId))
  }

  const handleRoleChange = (userId: string, role: UserRole) => {
    setUsers(users.map(u => (u.id === userId ? { ...u, role } : u)))
  }

  const handleFileUpload = (uploadedFiles: FileMetadata[]) => {
    setFiles([...files, ...uploadedFiles])
  }

  const handleFileDelete = (fileId: string) => {
    setFiles(files.filter(f => f.id !== fileId))
  }

  const handleFileDownload = (file: FileMetadata) => {
    console.log('Download file:', file.fileName)
  }

  const handleFileShare = (file: FileMetadata) => {
    console.log('Share file:', file.fileName)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary-600 to-primary-500">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-secondary-400">Manage your BuildFlow ERP application</p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-secondary-800/30 border border-white/5 rounded-lg overflow-hidden"
        >
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-all border-b-2 ${
                    isActive
                      ? 'border-primary-600 bg-primary-600/10 text-primary-400'
                      : 'border-transparent text-secondary-400 hover:text-white hover:bg-secondary-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-600 text-white">
                      {tab.badge}
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-secondary-800/30 border border-white/5 rounded-lg p-6 md:p-8"
          >
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">General Settings</h2>
                  <p className="text-secondary-400">Configure your company information</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companySettings.companyName}
                      onChange={e =>
                        setCompanySettings({ ...companySettings, companyName: e.target.value })
                      }
                      className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <input
                      type="email"
                      value={companySettings.companyEmail}
                      onChange={e =>
                        setCompanySettings({ ...companySettings, companyEmail: e.target.value })
                      }
                      className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Phone</label>
                    <input
                      type="tel"
                      value={companySettings.companyPhone}
                      onChange={e =>
                        setCompanySettings({ ...companySettings, companyPhone: e.target.value })
                      }
                      className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Address</label>
                    <input
                      type="text"
                      value={companySettings.address}
                      onChange={e =>
                        setCompanySettings({ ...companySettings, address: e.target.value })
                      }
                      className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Tax ID / GSTIN
                    </label>
                    <input
                      type="text"
                      value={companySettings.taxId}
                      onChange={e =>
                        setCompanySettings({ ...companySettings, taxId: e.target.value })
                      }
                      className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                >
                  Save Changes
                </motion.button>
              </div>
            )}

            {/* Users */}
            {activeTab === 'users' && (
              <UserManagement
                users={users}
                onUserAdd={handleUserAdd}
                onUserUpdate={handleUserUpdate}
                onUserDelete={handleUserDelete}
                onRoleChange={handleRoleChange}
              />
            )}

            {/* Roles */}
            {activeTab === 'roles' && <RoleManagement />}

            {/* Files */}
            {activeTab === 'files' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">File Management</h2>
                  <p className="text-secondary-400">Manage project documents and files</p>
                </div>
                <FileManager
                  files={files}
                  onUpload={handleFileUpload}
                  onDelete={handleFileDelete}
                  onDownload={handleFileDownload}
                  onShare={handleFileShare}
                />
              </div>
            )}

            {/* Audit Logs */}
            {activeTab === 'audit' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Audit Logs</h2>
                  <p className="text-secondary-400">View system activity and compliance logs</p>
                </div>
                <AuditLogsViewer />
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Appearance</h2>
                  <p className="text-secondary-400">Customize the look and feel</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Theme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setDarkMode(true)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        darkMode
                          ? 'border-primary-600 bg-primary-600/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <Moon className="w-8 h-8 mb-2 mx-auto text-primary-400" />
                      <p className="font-medium text-white">Dark Mode</p>
                      <p className="text-xs text-secondary-400 mt-1">Professional dark theme</p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setDarkMode(false)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        !darkMode
                          ? 'border-primary-600 bg-primary-600/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <Sun className="w-8 h-8 mb-2 mx-auto text-yellow-400" />
                      <p className="font-medium text-white">Light Mode</p>
                      <p className="text-xs text-secondary-400 mt-1">Bright light theme</p>
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}
