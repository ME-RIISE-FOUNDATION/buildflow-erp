'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, FileText, Download, Trash2, X } from 'lucide-react'
import { useState, useRef } from 'react'

interface Document {
  id: number
  name: string
  size: string
  date: string
  type: string
}

export default function Documents({ projectId }: { projectId: number }) {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: 'Project Blueprint', size: '2.4 MB', date: '2026-07-01', type: 'PDF' },
    { id: 2, name: 'Site Photos', size: '18.5 MB', date: '2026-07-15', type: 'ZIP' },
    { id: 3, name: 'Cost Estimate', size: '0.8 MB', date: '2026-06-20', type: 'PDF' },
  ])
  const [showModal, setShowModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadName, setUploadName] = useState('')

  const handleUpload = () => {
    if (uploadName && fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0]
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1)

      const newDoc: Document = {
        id: Date.now(),
        name: uploadName,
        size: `${sizeInMB} MB`,
        date: new Date().toISOString().split('T')[0],
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      }

      setDocuments([...documents, newDoc])
      setUploadName('')
      setShowModal(false)
      alert('✅ Document uploaded successfully!')
    } else {
      alert('⚠️ Please select a file and enter a name')
    }
  }

  const handleDownload = (doc: Document, format: 'pdf' | 'excel') => {
    alert(`📥 Downloading: ${doc.name}.${format.toUpperCase()}`)
    // In production, this would trigger an actual download
    // Example: window.location.href = `/api/download/document/${doc.id}?format=${format}`
  }

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(d => d.id !== id))
    alert('✅ Document deleted successfully!')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Documents</h2>
          <p className="text-secondary-400">Project blueprints, invoices, and certificates</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2 rounded-lg px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          Upload Document
        </motion.button>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card max-w-md w-full relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-secondary-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-white mb-6">Upload Document</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Document Name *</label>
                  <input
                    type="text"
                    value={uploadName}
                    onChange={(e) => setUploadName(e.target.value)}
                    placeholder="e.g., Project Blueprint"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Select File *</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-secondary-700 text-secondary-300 hover:text-white transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleUpload}
                  className="flex-1 btn-primary rounded-lg"
                >
                  Upload
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <motion.div key={doc.id} whileHover={{ scale: 1.02 }} className="card">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-8 h-8 text-primary-400" />
              <div className="flex-1">
                <p className="font-semibold text-white">{doc.name}</p>
                <p className="text-xs text-secondary-400">{doc.size}</p>
              </div>
            </div>
            <p className="text-xs text-secondary-400 mb-4">Uploaded: {doc.date}</p>
            <div className="space-y-2">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleDownload(doc, 'pdf')}
                  className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleDownload(doc, 'excel')}
                  className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Excel
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => handleDelete(doc.id)}
                className="w-full px-3 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
