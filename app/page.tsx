'use client'

import { useState, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import CategoryFilter from '../components/CategoryFilter'
import ToolCard from '../components/ToolCard'
import SeoContent from '../components/SeoContent'
import AiAdvisor from '../components/AiAdvisor'
import { TOOLS_DATA } from '../lib/data'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  // Create context string for AI Advisor based on all tools
  const toolsContext = useMemo(() => {
    return TOOLS_DATA.map(t => `- ${t.name} (Kategori: ${t.category}): ${t.shortDescription}. Fitur: ${t.features.join(', ')}`).join('\n')
  }, [])

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      if (!searchQuery) return true
      const q = searchQuery.toLowerCase()
      return tool.name.toLowerCase().includes(q) ||
             tool.shortDescription.toLowerCase().includes(q) ||
             tool.category.toLowerCase().includes(q)
    })
  }, [searchQuery])

  return (
    <div className="min-h-screen flex flex-col font-sans text-neutral-900 bg-white">
      <Header onSearch={setSearchQuery} showSearch={true} />

      <main className="flex-grow">
        <Hero />
        <section id="kategori" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-neutral-100 pb-4">
              <div>
                <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-2">Semua Alat</h2>
                <p className="text-neutral-500 text-sm">Menampilkan {filteredTools.length} alat produktivitas.</p>
              </div>
              <div className="w-full md:w-auto overflow-hidden">
                <CategoryFilter currentCategory="Semua" />
              </div>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-neutral-50 border border-neutral-100">
                <p className="text-neutral-500 font-serif text-lg italic mb-2">Tidak ada hasil yang ditemukan.</p>
              </div>
            )}
          </div>
        </section>
        <SeoContent />
      </main>

      <Footer />
      <AiAdvisor toolsContext={toolsContext} />
    </div>
  )
}
