'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, X } from 'lucide-react'
import { useState } from 'react'

interface Phase {
  id: number
  name: string
  progress: number
}

export default function ConstructionProgress({ projectId }: { projectId: number }) {
  const [phases, setPhases] = useState<Phase[]>([
    { id: 1, name: 'Foundation', progress: 100 },
    { id: 2, name: 'Structural Work', progress: 85 },
    { id: 3, name: 'Brick Work', progress: 65 },
    { id: 4, name: 'Electrical', progress: 40 },
    { id: 5, name: 'Plumbing', progress: 35 },
    { id: 6, name: 'Finishing', progress: 10 },
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    progress: '',
  })

  const handleAddUpdate = () => {
    if (formData.name && formData.progress) {
      const progress = Math.min(100, Math.max(0, parseInt(formData.progress)))
      const newPhase: Phase = {
        id: editingId || Date.now(),
        name: formData.name,
        progress,
      }

      if (editingId) {
        setPhases(phases.map(p => p.id === editingId ? newPhase : p))
        setEditingId(null)
      } else {
        setPhases([...phases, newPhase])
      }

      setFormData({ name: '', progress: '' })
      setShowModal(false)
      alert('✅ Progress updated successfully!')
    }
  }

  const handleEdit = (phase: Phase) => {
    setFormData({
      name: phase.name,
      progress: phase.progress.toString(),
    })
    setEditingId(phase.id)
    setShowModal(true)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Construction Progress</h2>
          <p className="text-secondary-400">Track construction phases and progress</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setEditingId(null)
            setFormData({ name: '', progress: '' })
            setShowModal(true)
          }}
          className="btn-primary flex items-center gap-2 rounded-lg px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          Add Update
        </motion.button>
      </div>

      {/* Add/Edit Modal */}
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

              <h3 className="text-2xl font-bold text-white mb-6">{editingId ? 'Edit' : 'Add'} Construction Phase</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Phase Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Foundation, Structural Work"
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Progress (0-100%) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                    placeholder="50"
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
                  onClick={handleAddUpdate}
                  className="flex-1 btn-primary rounded-lg"
                >
                  {editingId ? 'Update' : 'Add'} Phase
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {phases.map((phase) => (
          <motion.div key={phase.id} className="card">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-white">{phase.name}</p>
              <div className="flex items-center gap-3">
                <p className="text-primary-400 font-bold">{phase.progress}%</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleEdit(phase)}
                  className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-400"
                >
                  <Edit2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <div className="w-full h-3 bg-secondary-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${phase.progress}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
