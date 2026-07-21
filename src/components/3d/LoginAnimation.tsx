'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function LoginAnimation() {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-primary-600/10 to-accent-600/10 flex flex-col items-center justify-center p-8 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary-500/20 blur-3xl"
          animate={{ y: [0, 30, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-accent-500/20 blur-3xl"
          animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="mx-auto mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center"
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-3"
        >
          BuildFlow ERP
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-secondary-300 text-sm mb-6"
        >
          Enterprise Construction Management
        </motion.p>

        {/* Animated bars */}
        <div className="flex gap-2 justify-center">
          {[0.2, 0.4, 0.6, 0.8, 1].map((delay) => (
            <motion.div
              key={delay}
              className="w-1 bg-gradient-to-t from-primary-600 to-accent-600 rounded-full"
              animate={{ height: ['8px', '32px', '8px'] }}
              transition={{ duration: 0.8, delay, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
