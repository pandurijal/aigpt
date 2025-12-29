import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'aigpt.id - Direktori Tools AI Bisnis',
  description: 'Temukan generator itinerary, analisa keuangan, dan alat bantu HR berbasis AI. Solusi produktivitas cerdas untuk kebutuhan profesional.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-neutral-50 text-neutral-900 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
