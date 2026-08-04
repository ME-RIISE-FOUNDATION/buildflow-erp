'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { formatDate } from '@/utils/construction'
import type { Activity } from '@/types/construction'

interface ActivityTimelineProps {
  activities: Activity[]
  limit?: number
}

export default function ActivityTimeline({ activities, limit = 10 }: ActivityTimelineProps) {
  const displayActivities = activities.slice(0, limit)

  // Group activities by date
  const groupedActivities = displayActivities.reduce((acc, activity) => {
    const date = formatDate(activity.timestamp)
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(activity)
    return acc
  }, {} as Record<string, Activity[]>)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {Object.entries(groupedActivities).map(([date, dateActivities]) => (
        <div key={date}>
          <p className="text-xs font-semibold text-secondary-400 mb-3 uppercase tracking-wide">{date}</p>
          <div className="space-y-3">
            {dateActivities.map((activity, idx) => (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                className="flex gap-3"
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center pt-1">
                  <div className={`${activity.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {activity.icon}
                  </div>
                  {idx !== dateActivities.length - 1 && (
                    <div className="w-0.5 h-8 bg-gradient-to-b from-white/20 to-transparent mt-2" />
                  )}
                </div>

                {/* Activity content */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex-1 bg-secondary-800/30 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-white text-sm">{activity.title}</p>
                      <p className="text-xs text-secondary-400 mt-1">{activity.description}</p>
                    </div>
                    <span className="text-xs text-secondary-400 whitespace-nowrap ml-2">
                      {new Date(activity.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  {activity.amount && (
                    <div className="text-sm font-bold text-primary-400">
                      ₹{activity.amount.toLocaleString('en-IN')}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {displayActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary-400">No activities yet</p>
        </div>
      )}
    </motion.div>
  )
}
