'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import {
  Menu,
  X,
  LogOut,
  Home,
  Briefcase,
  Users,
  Calculator,
  Package,
  ShoppingCart,
  TrendingUp,
  FileText,
  Calendar,
  Bell,
  Settings,
  Building2,
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Briefcase, label: 'Projects', href: '/projects' },
  { icon: Users, label: 'Clients', href: '/clients' },
  { icon: Calculator, label: 'Estimation', href: '/estimation' },
  { icon: Package, label: 'Materials', href: '/materials' },
  { icon: ShoppingCart, label: 'Purchase', href: '/purchase' },
  { icon: TrendingUp, label: 'Finance', href: '/finance' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const router = useRouter()

  useEffect(() => {
    // Auto-login if no user
    if (!user) {
      const defaultUser = { id: 1, name: 'Super Admin', email: 'admin@buildflow.com' }
      useAuthStore.setState({ user: defaultUser })
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f1f5f9',
          fontSize: '18px',
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)' }}>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed md:static left-0 top-0 h-screen w-80 z-40 md:z-10 flex flex-col"
        style={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-lg flex items-center justify-center text-white font-bold"
              style={{
                background: 'linear-gradient(to right, #2563eb, #06b6d4)',
              }}
            >
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BuildFlow</h1>
              <p className="text-xs text-secondary-400">ERP System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-300 hover:bg-secondary-800/50 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 font-medium">{item.label}</span>
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          {user ? (
            <>
              <div
                className="rounded-lg p-4 mb-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{
                      background: 'linear-gradient(to right, #2563eb, #06b6d4)',
                    }}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-secondary-400 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-secondary-300 hover:text-white hover:bg-secondary-800/50 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </>
          ) : (
            <div className="text-center py-4 text-secondary-400 text-sm">Loading...</div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:w-auto">
        {/* Top Navigation */}
        <div
          className="sticky top-0 z-20 border-b flex items-center justify-between p-4 md:p-6"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-secondary-800/50 rounded-lg text-secondary-300 hover:text-white transition-all md:hidden"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="relative p-2 hover:bg-secondary-800/50 rounded-lg text-secondary-300 hover:text-white transition-all"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleLogout}
              className="p-2 hover:bg-secondary-800/50 rounded-lg text-secondary-300 hover:text-white transition-all"
            >
              <LogOut className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
