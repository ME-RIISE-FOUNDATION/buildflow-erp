'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react'
import { useState } from 'react'

interface Event {
  id: number
  date: string
  title: string
  type: 'task' | 'deadline' | 'meeting'
  time: string
}

export default function Calendar({ projectId }: { projectId: number }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 21))
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'excel'>('pdf')

  const [events] = useState<Event[]>([
    { id: 1, date: '2026-07-05', title: 'Foundation Inspection', type: 'task', time: '10:00 AM' },
    { id: 2, date: '2026-07-10', title: 'Material Delivery', type: 'deadline', time: '2:00 PM' },
    { id: 3, date: '2026-07-15', title: 'Team Meeting', type: 'meeting', time: '11:00 AM' },
    { id: 4, date: '2026-07-20', title: 'Progress Report', type: 'task', time: '3:00 PM' },
    { id: 5, date: '2026-07-25', title: 'Site Inspection', type: 'deadline', time: '9:00 AM' },
  ])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const handleDateClick = (day: number) => {
    const dateStr = formatDateString(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
    setSelectedDate(dateStr)
  }

  const handleDownload = () => {
    if (!startDate || !endDate) {
      alert('⚠️ Please select both start and end dates')
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start > end) {
      alert('⚠️ Start date must be before end date')
      return
    }

    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= start && eventDate <= end
    })

    alert(`📥 Downloading calendar data from ${startDate} to ${endDate} as ${downloadFormat.toUpperCase()}\n\nTotal Events: ${filteredEvents.length}`)
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  const getEventsForDate = (day: number) => {
    const dateStr = formatDateString(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
    return events.filter(e => e.date === dateStr)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'task':
        return 'bg-blue-500/20 text-blue-400'
      case 'deadline':
        return 'bg-red-500/20 text-red-400'
      case 'meeting':
        return 'bg-green-500/20 text-green-400'
      default:
        return 'bg-secondary-700/20 text-secondary-400'
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Calendar</h2>
          <p className="text-secondary-400">Tasks, deadlines, and meetings</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowDatePicker(true)}
          className="btn-primary flex items-center gap-2 rounded-lg px-6 py-3"
        >
          <Download className="w-5 h-5" />
          Download Data
        </motion.button>
      </div>

      {/* Date Range Picker Modal */}
      <AnimatePresence>
        {showDatePicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDatePicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card max-w-2xl w-full relative"
            >
              <button
                onClick={() => setShowDatePicker(false)}
                className="absolute top-4 right-4 text-secondary-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-white mb-6">Download Calendar Data</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-secondary-300 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-300 mb-2">End Date *</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full glass-sm rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-secondary-300 mb-3">Download Format</label>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setDownloadFormat('pdf')}
                    className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                      downloadFormat === 'pdf'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                    }`}
                  >
                    📕 PDF
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setDownloadFormat('excel')}
                    className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                      downloadFormat === 'excel'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                    }`}
                  >
                    📗 Excel
                  </motion.button>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowDatePicker(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-secondary-700 text-secondary-300 hover:text-white transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleDownload}
                  className="flex-1 btn-primary rounded-lg"
                >
                  Download
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 card">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{monthName}</h3>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={previousMonth}
                  className="p-2 hover:bg-secondary-700 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-secondary-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={nextMonth}
                  className="p-2 hover:bg-secondary-700 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-secondary-400" />
                </motion.button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-secondary-400 font-semibold py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dateStr = formatDateString(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                const dayEvents = getEventsForDate(day)
                const isSelected = selectedDate === dateStr
                const today = new Date().toISOString().split('T')[0]
                const isToday = dateStr === today

                return (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square rounded-lg p-1 transition-colors text-sm font-medium flex flex-col items-center justify-center relative ${
                      isSelected
                        ? 'bg-primary-600 text-white'
                        : isToday
                        ? 'bg-accent-500/30 text-white'
                        : dayEvents.length > 0
                        ? 'bg-secondary-700/50 text-white'
                        : 'text-secondary-400 hover:bg-secondary-700/30'
                    }`}
                  >
                    <span>{day}</span>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayEvents.slice(0, 3).map((_, idx) => (
                          <div key={idx} className="w-1 h-1 rounded-full bg-accent-400" />
                        ))}
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="card max-h-96 overflow-y-auto">
          <h3 className="text-xl font-bold text-white mb-4">Events</h3>
          <div className="space-y-3">
            {selectedDate ? (
              getEventsForDate(parseInt(selectedDate.split('-')[2])).length > 0 ? (
                getEventsForDate(parseInt(selectedDate.split('-')[2])).map((event) => (
                  <motion.div key={event.id} className={`p-3 rounded-lg ${getTypeColor(event.type)}`}>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-xs opacity-75">{event.time}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-secondary-400 text-sm">No events on this date</p>
              )
            ) : (
              <>
                <p className="text-secondary-400 text-sm mb-4">Click a date to view events</p>
                {events.slice(0, 5).map((event) => (
                  <motion.div key={event.id} className={`p-3 rounded-lg ${getTypeColor(event.type)}`}>
                    <p className="font-semibold text-sm">{event.title}</p>
                    <p className="text-xs opacity-75">{event.date} • {event.time}</p>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Event Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-secondary-300">Task</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-secondary-300">Deadline</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-secondary-300">Meeting</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
