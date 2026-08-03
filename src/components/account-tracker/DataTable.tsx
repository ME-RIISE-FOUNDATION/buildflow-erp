'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown, Search } from 'lucide-react'

interface Column {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onRowClick?: (row: any) => void
  pageSize?: number
  searchable?: boolean
}

export default function DataTable({
  columns,
  data,
  onRowClick,
  pageSize = 10,
  searchable = true,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter data
  let filteredData = data
  if (searchQuery) {
    filteredData = data.filter(row =>
      columns.some(col =>
        String(row[col.key]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }

  // Sort data
  if (sortConfig) {
    filteredData = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key]
      const bVal = b[sortConfig.key]
      const comparison = aVal > bVal ? 1 : -1
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
  }

  // Paginate
  const totalPages = Math.ceil(filteredData.length / pageSize)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleSort = (key: string) => {
    setSortConfig(prev =>
      prev?.key === key && prev.direction === 'asc'
        ? { key, direction: 'desc' }
        : { key, direction: 'asc' }
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full bg-secondary-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map(column => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={`px-4 py-3 text-left text-sm font-semibold text-secondary-400 ${
                    column.sortable ? 'cursor-pointer hover:text-white transition-colors' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortConfig?.key === column.key && (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <motion.tr
                key={idx}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-white/5 transition-all ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map(column => (
                  <td key={column.key} className="px-4 py-3 text-sm text-secondary-300">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-secondary-400">
            Showing {paginatedData.length} of {filteredData.length} entries
          </p>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-3 py-2 bg-secondary-800/50 hover:bg-secondary-800 border border-white/10 rounded-lg text-sm font-semibold text-white disabled:opacity-50 transition-all"
            >
              Previous
            </motion.button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.05 }}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-800/50 text-secondary-400 hover:bg-secondary-800'
                }`}
              >
                {page}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-3 py-2 bg-secondary-800/50 hover:bg-secondary-800 border border-white/10 rounded-lg text-sm font-semibold text-white disabled:opacity-50 transition-all"
            >
              Next
            </motion.button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {paginatedData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary-400 mb-2">No data found</p>
          <p className="text-xs text-secondary-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}
