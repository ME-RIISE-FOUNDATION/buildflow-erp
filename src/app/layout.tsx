import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BuildFlow ERP - Construction Management System',
  description: 'Premium enterprise construction ERP and project estimation system',
  viewport: 'width=device-width, initial-scale=1',
  authors: [{ name: 'BuildFlow' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-secondary-950 text-secondary-50 overflow-x-hidden`}>
        {children}
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  )
}
