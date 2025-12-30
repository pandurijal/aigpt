import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'aigpt.id - AI Travel Planning Tools',
  description: 'Temukan destinasi wisata impian dengan AI. Dapatkan rekomendasi destinasi, breakdown biaya detail, itinerary harian, dan tips perjalanan berdasarkan budget dan preferensi Anda.',
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
