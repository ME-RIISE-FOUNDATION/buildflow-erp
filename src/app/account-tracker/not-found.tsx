'use client'

import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-950 via-secondary-900 to-secondary-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-secondary-800/30 border border-white/5 rounded-lg p-8 text-center">
        <FileQuestion className="w-16 h-16 text-secondary-600 mx-auto mb-4 opacity-50" />
        <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-secondary-400 mb-6">The page you're looking for doesn't exist.</p>
        <Link
          href="/account-tracker"
          className="inline-block px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
        >
          Go back
        </Link>
      </div>
    </div>
  )
}
