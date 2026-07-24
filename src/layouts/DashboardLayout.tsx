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
  ChevronDown,
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
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Auto-login user if not logged in (for development)
  useEffect(() => {
    if (!user) {
      const defaultUser = { id: 1, name: 'Super Admin', email: 'admin@buildflow.com' }
      useAuthStore.setState({ user: defaultUser })
    }
    setIsLoading(false)
  }, [])

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -320, opacity: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-950 via-secondary-900 to-primary-950 flex">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={sidebarOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-80 glass border-r border-white/10 z-50 md:static md:w-80 md:translate-x-0 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600">
              <Building2 className="w-6 h-6 text-white" />
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
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-300 hover:bg-secondary-800/50 hover:text-white transition-all duration-300 group cursor-pointer"
                >
                  <Icon className="w-5 h-5 group-hover:text-primary-400 transition-colors" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          {user ? (
            <>
              <div className="glass rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-secondary-400">{user.email}</p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full btn-ghost flex items-center justify-center gap-2 py-2 text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-secondary-400 text-sm">Loading...</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0 w-full md:w-auto">
        {/* Top Navigation */}
        <div className="glass border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl">
          <div className="flex items-center justify-between p-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-secondary-800/50 rounded-lg text-secondary-300 hover:text-white transition-all md:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>

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
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
