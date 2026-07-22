'use client'

import { motion } from 'framer-motion'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { useState } from 'react'

export default function Notes({ projectId }: { projectId: number }) {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Site Visit Notes', content: 'Foundation work going well, concrete quality is good', date: '2026-07-20' },
    { id: 2, title: 'Material Order', content: 'Ordered 500 bags of cement from BuildCo', date: '2026-07-19' },
  ])
  const [newNote, setNewNote] = useState('')

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        title: newNote.split('\n')[0].substring(0, 50),
        content: newNote,
        date: new Date().toISOString().split('T')[0],
      }
      setNotes([note, ...notes])
      setNewNote('')
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Project Notes</h2>
        <p className="text-secondary-400">Keep track of important project information and updates</p>
      </div>

      {/* Add Note */}
      <motion.div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Add New Note</h3>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
          className="w-full glass-sm rounded-lg px-4 py-3 text-white placeholder-secondary-500 resize-none h-32 mb-4"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={handleAddNote}
          className="btn-primary flex items-center gap-2 rounded-lg px-6 py-2"
        >
          <Plus className="w-5 h-5" />
          Add Note
        </motion.button>
      </motion.div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note) => (
          <motion.div key={note.id} whileHover={{ scale: 1.02 }} className="card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-white mb-1">{note.title}</h4>
                <p className="text-xs text-secondary-400">{note.date}</p>
              </div>
              <div className="flex gap-2">
                <motion.button whileHover={{ scale: 1.1 }} className="text-blue-400 hover:text-blue-300">
                  <Edit2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <p className="text-secondary-300 text-sm">{note.content}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
