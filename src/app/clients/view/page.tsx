'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  FileText,
  Calendar,
  Award,
  CreditCard,
  Menu,
  X,
  Edit2,
  Trash2,
} from 'lucide-react'

const clientData = {
  id: 1,
  name: 'Skyline Developers',
  email: 'contact@skyline.com',
  phone: '+1 (555) 123-4567',
  company: 'Skyline Developers Pvt Ltd',
  address: '123 Business Ave, Downtown',
  city: 'New York',
  state: 'NY',
  country: 'USA',
  postalCode: '10001',
  gstNumber: 'GST123456789ABC',
  panNumber: 'ABCDE1234F',
  bankName: 'First National Bank',
  accountNumber: '1234567890',
  ifscCode: 'FNBA0001234',
  contactPerson: 'John Smith',
  contactPersonPhone: '+1 (555) 123-4500',
  registeredDate: '2024-01-15',
  totalProjects: 4,
  completedProjects: 2,
  ongoingProjects: 2,
  totalInvestment: 1250000,
  totalPaid: 950000,
  pendingPayment: 300000,
  status: 'active',
  creditLimit: 500000,
}

const projects = [
  { id: 1, name: 'Downtown Complex', status: 'completed', amount: 450000, date: '2024-06-30' },
  { id: 2, name: 'Sky Tower', status: 'completed', amount: 380000, date: '2024-05-15' },
  { id: 3, name: 'Central Park Development', status: 'ongoing', amount: 280000, date: '2024-08-31' },
  { id: 4, name: 'Business Hub', status: 'ongoing', amount: 140000, date: '2024-10-30' },
]

const invoices = [
  { id: 'INV-001', date: '2024-07-01', amount: 150000, status: 'paid' },
  { id: 'INV-002', date: '2024-07-15', amount: 200000, status: 'paid' },
  { id: 'INV-003', date: '2024-08-01', amount: 100000, status: 'pending' },
]

export default function ClientProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'invoices', label: 'Invoices', icon: CreditCard },
    { id: 'documents', label: 'Documents', icon: FileText },
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-screen p-4 lg:p-6">
      {/* Mobile Toggle */}
      {isMobile && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-6 right-6 z-40 btn-primary p-4 rounded-full shadow-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      )}

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={isMobile ? { x: -320 } : { x: 0 }}
        animate={isMobile ? (sidebarOpen ? { x: 0 } : { x: -320 }) : { x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`w-80 lg:w-72 flex-shrink-0 glass rounded-2xl border border-white/10 p-6 fixed left-0 top-0 z-40 lg:z-auto lg:fixed lg:top-0 lg:sticky lg:h-fit max-h-[85vh] overflow-y-auto`}
      >
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{clientData.name}</h2>
          <p className="text-secondary-400 text-sm">{clientData.company}</p>
          <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
            clientData.status === 'active'
              ? 'bg-green-500/20 text-green-300'
              : 'bg-yellow-500/20 text-yellow-300'
          }`}>
            {clientData.status.toUpperCase()}
          </span>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-secondary-300">
            <Mail className="w-4 h-4 text-primary-400" />
            <div className="min-w-0">
              <p className="text-xs text-secondary-400">Email</p>
              <p className="text-sm truncate">{clientData.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-secondary-300">
            <Phone className="w-4 h-4 text-accent-400" />
            <div className="min-w-0">
              <p className="text-xs text-secondary-400">Phone</p>
              <p className="text-sm">{clientData.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-secondary-300">
            <MapPin className="w-4 h-4 text-green-400" />
            <div className="min-w-0">
              <p className="text-xs text-secondary-400">Address</p>
              <p className="text-sm truncate">{clientData.city}, {clientData.state}</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <h3 className="text-sm font-bold text-white mb-4">Tabs</h3>
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    setActiveTab(tab.id)
                    if (isMobile) setSidebarOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 text-sm ${
                    activeTab === tab.id
                      ? 'bg-primary-600/30 border border-primary-500/50 text-white'
                      : 'text-secondary-300 hover:text-white hover:bg-secondary-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {tab.label}
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Customer Profile</h1>
          <p className="text-secondary-400">Manage customer details and transactions</p>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div className="card bg-gradient-to-br from-blue-600 bg-opacity-10">
                <p className="text-secondary-400 text-sm mb-2">Total Projects</p>
                <p className="text-3xl font-bold text-white">{clientData.totalProjects}</p>
              </motion.div>
              <motion.div className="card bg-gradient-to-br from-green-600 bg-opacity-10">
                <p className="text-secondary-400 text-sm mb-2">Completed</p>
                <p className="text-3xl font-bold text-green-400">{clientData.completedProjects}</p>
              </motion.div>
              <motion.div className="card bg-gradient-to-br from-yellow-600 bg-opacity-10">
                <p className="text-secondary-400 text-sm mb-2">Ongoing</p>
                <p className="text-3xl font-bold text-yellow-400">{clientData.ongoingProjects}</p>
              </motion.div>
              <motion.div className="card bg-gradient-to-br from-purple-600 bg-opacity-10">
                <p className="text-secondary-400 text-sm mb-2">Total Investment</p>
                <p className="text-3xl font-bold text-purple-400">₹{(clientData.totalInvestment / 100000).toFixed(1)}L</p>
              </motion.div>
            </div>

            {/* Client Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <motion.div className="card">
                <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Full Name</p>
                    <p className="text-white font-semibold">{clientData.name}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Company</p>
                    <p className="text-white font-semibold">{clientData.company}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Contact Person</p>
                    <p className="text-white font-semibold">{clientData.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Contact Person Phone</p>
                    <p className="text-white font-semibold">{clientData.contactPersonPhone}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Registered Date</p>
                    <p className="text-white font-semibold">{clientData.registeredDate}</p>
                  </div>
                </div>
              </motion.div>

              {/* Address Information */}
              <motion.div className="card">
                <h3 className="text-xl font-bold text-white mb-6">Address</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Street Address</p>
                    <p className="text-white font-semibold">{clientData.address}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">City</p>
                    <p className="text-white font-semibold">{clientData.city}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-secondary-400 text-sm mb-1">State</p>
                      <p className="text-white font-semibold">{clientData.state}</p>
                    </div>
                    <div>
                      <p className="text-secondary-400 text-sm mb-1">Postal Code</p>
                      <p className="text-white font-semibold">{clientData.postalCode}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Country</p>
                    <p className="text-white font-semibold">{clientData.country}</p>
                  </div>
                </div>
              </motion.div>

              {/* Tax Information */}
              <motion.div className="card">
                <h3 className="text-xl font-bold text-white mb-6">Tax Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">GST Number</p>
                    <p className="text-white font-semibold">{clientData.gstNumber}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">PAN Number</p>
                    <p className="text-white font-semibold">{clientData.panNumber}</p>
                  </div>
                </div>
              </motion.div>

              {/* Bank Information */}
              <motion.div className="card">
                <h3 className="text-xl font-bold text-white mb-6">Bank Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Bank Name</p>
                    <p className="text-white font-semibold">{clientData.bankName}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Account Number</p>
                    <p className="text-white font-semibold">****{clientData.accountNumber.slice(-4)}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">IFSC Code</p>
                    <p className="text-white font-semibold">{clientData.ifscCode}</p>
                  </div>
                </div>
              </motion.div>

              {/* Payment Information */}
              <motion.div className="card">
                <h3 className="text-xl font-bold text-white mb-6">Payment Status</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Total Amount</p>
                    <p className="text-white font-semibold text-lg">₹{clientData.totalInvestment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Total Paid</p>
                    <p className="text-green-400 font-semibold text-lg">₹{clientData.totalPaid.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Pending Payment</p>
                    <p className="text-yellow-400 font-semibold text-lg">₹{clientData.pendingPayment.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>

              {/* Credit Limit */}
              <motion.div className="card">
                <h3 className="text-xl font-bold text-white mb-6">Credit Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Credit Limit</p>
                    <p className="text-white font-semibold text-lg">₹{clientData.creditLimit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Available Credit</p>
                    <p className="text-primary-400 font-semibold text-lg">₹{(clientData.creditLimit - clientData.pendingPayment).toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
            <h3 className="text-xl font-bold text-white mb-6">Projects</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 font-semibold text-secondary-300">Project Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-secondary-300">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-secondary-300">Amount</th>
                    <th className="text-left py-4 px-6 font-semibold text-secondary-300">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-white/5 hover:bg-secondary-800/30">
                      <td className="py-4 px-6 font-semibold text-white">{project.name}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'completed'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-primary-400 font-semibold">₹{project.amount.toLocaleString()}</td>
                      <td className="py-4 px-6 text-secondary-400">{project.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
            <h3 className="text-xl font-bold text-white mb-6">Invoices</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 font-semibold text-secondary-300">Invoice Number</th>
                    <th className="text-left py-4 px-6 font-semibold text-secondary-300">Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-secondary-300">Amount</th>
                    <th className="text-left py-4 px-6 font-semibold text-secondary-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-white/5 hover:bg-secondary-800/30">
                      <td className="py-4 px-6 font-semibold text-white">{invoice.id}</td>
                      <td className="py-4 px-6 text-secondary-400">{invoice.date}</td>
                      <td className="py-4 px-6 text-primary-400 font-semibold">₹{invoice.amount.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          invoice.status === 'paid'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
            <h3 className="text-xl font-bold text-white mb-6">Documents</h3>
            <p className="text-secondary-400">No documents uploaded yet.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
