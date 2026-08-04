'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, ChevronDown } from 'lucide-react'

interface FilterOption {
  label: string
  value: string
}

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilter?: (filters: Record<string, string>) => void
  filters?: {
    name: string
    label: string
    options: FilterOption[]
  }[]
  placeholder?: string
}

export default function SearchFilter({
  onSearch,
  onFilter,
  filters = [],
  placeholder = 'Search...',
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = {
      ...activeFilters,
      [filterName]: value === 'all' ? '' : value,
    }
    setActiveFilters(newFilters)
    onFilter?.(newFilters)
  }

  const hasActiveFilters = Object.values(activeFilters).some(v => v !== '')

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-secondary-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearch}
          className="w-full bg-secondary-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500 transition-colors"
        />
        {searchQuery && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              setSearchQuery('')
              onSearch('')
            }}
            className="absolute right-3 top-3"
          >
            <X className="w-5 h-5 text-secondary-400 hover:text-white" />
          </motion.button>
        )}
      </div>

      {/* Filter Toggle */}
      {filters.length > 0 && (
        <div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${
              showFilters || hasActiveFilters
                ? 'bg-primary-600/20 border border-primary-500/30'
                : 'bg-secondary-800/50 border border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-semibold text-white">Filters</span>
              {hasActiveFilters && (
                <span className="text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full">
                  {Object.values(activeFilters).filter(v => v !== '').length}
                </span>
              )}
            </div>
            <ChevronDown
              className={`w-4 h-4 text-secondary-400 transition-transform ${
                showFilters ? 'rotate-180' : ''
              }`}
            />
          </motion.button>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3"
              >
                {filters.map(filter => (
                  <div key={filter.name}>
                    <label className="text-xs font-semibold text-secondary-400 mb-1 block">
                      {filter.label}
                    </label>
                    <select
                      value={activeFilters[filter.name] || 'all'}
                      onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                      className="w-full bg-secondary-800/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                    >
                      <option value="all">All</option>
                      {filter.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
