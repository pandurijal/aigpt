'use client'

import { useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DestinationFinder from '../../components/DestinationFinder'
import AiAdvisor from '../../components/AiAdvisor'
import { TOOLS_DATA } from '../../lib/data'

export default function DestinationFinderPage() {
  // Create context string for AI Advisor based on all tools
  const toolsContext = useMemo(() => {
    return TOOLS_DATA.map(t => `- ${t.name}: ${t.shortDescription}. Fitur: ${t.features.join(', ')}`).join('\n')
  }, [])

  return (
    <div className="min-h-screen flex flex-col font-sans text-neutral-900 bg-white">
      <Header showSearch={false} />

      <main className="flex-grow">
        <DestinationFinder />
      </main>

      <Footer />
      <AiAdvisor toolsContext={toolsContext} />
    </div>
  )
}
