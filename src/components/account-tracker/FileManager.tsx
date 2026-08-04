'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, Download, Trash2, Search, Filter, Eye, Share2, Folder } from 'lucide-react'
import { formatFileSize, getFileIcon, createFileMetadata } from '@/utils/fileManager'
import type { FileMetadata } from '@/utils/fileManager'

interface FileManagerProps {
  files: FileMetadata[]
  onUpload?: (files: FileMetadata[]) => void
  onDelete?: (fileId: string) => void
  onDownload?: (file: FileMetadata) => void
  onShare?: (file: FileMetadata) => void
  maxFileSize?: number
}

export default function FileManager({
  files,
  onUpload,
  onDelete,
  onDownload,
  onShare,
  maxFileSize = 100,
}: FileManagerProps) {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredFiles = files.filter(
    file =>
      file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFileList = e.target.files
    if (!selectedFileList) return

    setUploading(true)

    const uploadedFiles: FileMetadata[] = []
    let processedCount = 0

    Array.from(selectedFileList).forEach(file => {
      const metadata = createFileMetadata(file, 'current-user', 'general', {
        isPublic: false,
      })
      uploadedFiles.push(metadata)

      processedCount++
      if (processedCount === selectedFileList.length) {
        setUploading(false)
        onUpload?.(uploadedFiles)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    })
  }

  const toggleFileSelection = (fileId: string) => {
    const newSelected = new Set(selectedFiles)
    if (newSelected.has(fileId)) {
      newSelected.delete(fileId)
    } else {
      newSelected.add(fileId)
    }
    setSelectedFiles(newSelected)
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
    <div className="space-y-4">
      {/* Upload Area */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative border-2 border-dashed border-white/20 rounded-2xl p-8 backdrop-blur-sm hover:border-white/40 transition-all cursor-pointer group"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />

        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-lg bg-primary-600/20 group-hover:bg-primary-600/30 transition-colors">
            <Upload className="w-8 h-8 text-primary-400" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-white mb-1">
              {uploading ? 'Uploading...' : 'Click to upload files'}
            </p>
            <p className="text-xs text-secondary-400">or drag and drop</p>
            <p className="text-xs text-secondary-500 mt-2">Max file size: {maxFileSize}MB</p>
          </div>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary-800/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2.5 bg-secondary-800/50 hover:bg-secondary-800 border border-white/10 rounded-lg text-secondary-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filter
        </motion.button>
      </div>

      {/* Files List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-secondary-600 mx-auto mb-4 opacity-50" />
            <p className="text-secondary-400">No files yet</p>
            <p className="text-secondary-500 text-sm">Upload files to get started</p>
          </div>
        ) : (
          filteredFiles.map(file => (
            <motion.div
              key={file.id}
              variants={itemVariants}
              className="flex items-center gap-4 p-4 bg-secondary-800/30 hover:bg-secondary-800/50 border border-white/5 hover:border-white/10 rounded-lg transition-all group"
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedFiles.has(file.id)}
                onChange={() => toggleFileSelection(file.id)}
                className="w-5 h-5 rounded border-white/20 text-primary-600 focus:ring-primary-600"
              />

              {/* File Icon & Info */}
              <div className="flex-1 flex items-center gap-3 min-w-0">
                <span className="text-2xl flex-shrink-0">{getFileIcon(file.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{file.fileName}</p>
                  <div className="flex items-center gap-2 text-xs text-secondary-400">
                    <span>{formatFileSize(file.size)}</span>
                    <span>•</span>
                    <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  title="Preview"
                  className="p-2 hover:bg-secondary-700 rounded-lg text-secondary-400 hover:text-white transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => onDownload?.(file)}
                  title="Download"
                  className="p-2 hover:bg-secondary-700 rounded-lg text-secondary-400 hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => onShare?.(file)}
                  title="Share"
                  className="p-2 hover:bg-secondary-700 rounded-lg text-secondary-400 hover:text-white transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => onDelete?.(file.id)}
                  title="Delete"
                  className="p-2 hover:bg-red-600/20 rounded-lg text-secondary-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* File Statistics */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 p-4 bg-secondary-800/20 border border-white/5 rounded-lg"
        >
          <div>
            <p className="text-xs text-secondary-400">Total Files</p>
            <p className="text-lg font-bold text-white">{files.length}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-400">Total Size</p>
            <p className="text-lg font-bold text-white">
              {formatFileSize(files.reduce((sum, f) => sum + f.size, 0))}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
