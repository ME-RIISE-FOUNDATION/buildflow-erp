'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import { motion } from 'framer-motion'
import { Plus, Search, Mail, Phone, MapPin, MoreVertical } from 'lucide-react'

const clients = [
  {
    id: 1,
    name: 'Skyline Developers',
    email: 'contact@skyline.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Downtown',
    projects: 4,
    totalSpent: 1250000,
    status: 'active',
  },
  {
    id: 2,
    name: 'Urban Living Inc',
    email: 'info@urbanliving.com',
    phone: '+1 (555) 234-5678',
    address: '456 Residential St, Midtown',
    projects: 2,
    totalSpent: 680000,
    status: 'active',
  },
  {
    id: 3,
    name: 'Corporate Spaces Ltd',
    email: 'office@corporatespaces.com',
    phone: '+1 (555) 345-6789',
    address: '789 Business Park, Uptown',
    projects: 3,
    totalSpent: 920000,
    status: 'active',
  },
  {
    id: 4,
    name: 'Retail Plus',
    email: 'sales@retailplus.com',
    phone: '+1 (555) 456-7890',
    address: '321 Commerce Blvd, Harbor',
    projects: 1,
    totalSpent: 320000,
    status: 'pending',
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Clients</h1>
              <p className="text-secondary-400">Manage client information and projects</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Client
            </motion.button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-500" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-sm rounded-xl"
            />
          </div>
        </motion.div>

        {/* Clients Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card group hover:shadow-glow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{client.name}</h3>
                  <p className="text-secondary-400 text-sm">{client.projects} active projects</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 hover:bg-secondary-700 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-secondary-400" />
                </motion.button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-secondary-300">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <a href={`mailto:${client.email}`} className="hover:text-white transition-colors">
                    {client.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-secondary-300">
                  <Phone className="w-4 h-4 text-accent-400" />
                  <a href={`tel:${client.phone}`} className="hover:text-white transition-colors">
                    {client.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-secondary-300">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span>{client.address}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-secondary-400 text-xs mb-1">Total Investment</p>
                    <p className="text-xl font-bold text-white">
                      ${(client.totalSpent / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    client.status === 'active'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
