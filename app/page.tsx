'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ToolCard from '../components/ToolCard'
import SeoContent from '../components/SeoContent'
import AiAdvisor from '../components/AiAdvisor'
import { TOOLS_DATA } from '../lib/data'
import { Sparkles, Plane, Map, Calculator, Zap, Grid3x3, Lightbulb, Heart, Wallet, Palette, BookOpen, Smile } from 'lucide-react'
import { Category } from '../lib/types'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL')

  // Create context string for AI Advisor based on all tools
  const toolsContext = useMemo(() => {
    return TOOLS_DATA.map(t => `- ${t.name}: ${t.shortDescription}. Fitur: ${t.features.join(', ')}`).join('\n')
  }, [])

  // Filter tools based on search query and category
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      // Category filter
      if (selectedCategory !== 'ALL' && tool.category !== selectedCategory) {
        return false
      }

      // Search filter
      if (!searchQuery) return true
      const q = searchQuery.toLowerCase()
      return tool.name.toLowerCase().includes(q) ||
             tool.shortDescription.toLowerCase().includes(q)
    })
  }, [searchQuery, selectedCategory])

  // Get category icon
  const getCategoryIcon = (category: Category | 'ALL') => {
    switch (category) {
      case 'ALL': return <Grid3x3 className="w-4 h-4" />
      case Category.TRAVEL: return <Plane className="w-4 h-4" />
      case Category.PRODUCTIVITY: return <Zap className="w-4 h-4" />
      case Category.CREATIVE: return <Palette className="w-4 h-4" />
      case Category.LEARNING: return <BookOpen className="w-4 h-4" />
      case Category.HEALTH: return <Heart className="w-4 h-4" />
      case Category.FINANCE: return <Wallet className="w-4 h-4" />
      case Category.LIFESTYLE: return <Smile className="w-4 h-4" />
      case Category.ENTERTAINMENT: return <Lightbulb className="w-4 h-4" />
      default: return <Grid3x3 className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-neutral-900 bg-white">
      <Header onSearch={setSearchQuery} showSearch={true} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-primary-50 to-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-primary-600" />
              <span className="text-sm font-bold uppercase tracking-wider text-primary-600">
                Kumpulan AI Tools
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 mb-6">
              AI Tools untuk Memudahkan Hidup Anda
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
              Koleksi lengkap AI tools untuk produktivitas, kreativitas, pembelajaran, kesehatan, keuangan, dan gaya hidup - semua dalam satu tempat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/destination-finder"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                Coba AI Tools
              </Link>

              <a
                href="#tools"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-neutral-900 text-neutral-900 font-bold uppercase tracking-wider hover:bg-neutral-50 transition-colors"
              >
                Lihat Semua Tools
              </a>
            </div>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">
                Kategori AI Tools
              </h2>
              <p className="text-lg text-neutral-600">
                Temukan tools yang sesuai dengan kebutuhan Anda
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Wisata */}
              <Link
                href="/destination-finder"
                className="group border-2 border-neutral-200 hover:border-primary-600 transition-all p-6 hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Plane className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors">
                  Wisata
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Rencanakan perjalanan impian Anda
                </p>
                <span className="text-xs font-bold text-primary-600">
                  2 tools tersedia →
                </span>
              </Link>

              {/* Produktivitas */}
              <div className="border-2 border-neutral-200 p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Produktivitas
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Tingkatkan efisiensi kerja
                </p>
                <span className="text-xs font-bold text-neutral-400">
                  3 tools (Segera Hadir)
                </span>
              </div>

              {/* Kreativitas */}
              <div className="border-2 border-neutral-200 p-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Kreativitas
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Wujudkan ide kreatif Anda
                </p>
                <span className="text-xs font-bold text-neutral-400">
                  2 tools (Segera Hadir)
                </span>
              </div>

              {/* Pembelajaran */}
              <div className="border-2 border-neutral-200 p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Pembelajaran
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Belajar lebih efektif
                </p>
                <span className="text-xs font-bold text-neutral-400">
                  2 tools (Segera Hadir)
                </span>
              </div>

              {/* Kesehatan */}
              <div className="border-2 border-neutral-200 p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Kesehatan
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Jaga kesehatan tubuh Anda
                </p>
                <span className="text-xs font-bold text-neutral-400">
                  2 tools (Segera Hadir)
                </span>
              </div>

              {/* Keuangan */}
              <div className="border-2 border-neutral-200 p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Keuangan
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Kelola keuangan lebih baik
                </p>
                <span className="text-xs font-bold text-neutral-400">
                  2 tools (Segera Hadir)
                </span>
              </div>

              {/* Gaya Hidup */}
              <div className="border-2 border-neutral-200 p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Smile className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Gaya Hidup
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Gaya hidup lebih modern
                </p>
                <span className="text-xs font-bold text-neutral-400">
                  2 tools (Segera Hadir)
                </span>
              </div>

              {/* Hiburan */}
              <div className="border-2 border-neutral-200 p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Hiburan
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Nikmati waktu luang Anda
                </p>
                <span className="text-xs font-bold text-neutral-400">
                  Segera Hadir
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* All Tools Grid */}
        <section id="tools" className="py-20 bg-neutral-50 border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-3">
                Semua AI Tools
              </h2>
              <p className="text-neutral-600">
                {filteredTools.length} tools tersedia
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === 'ALL'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white border-2 border-neutral-200 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                {getCategoryIcon('ALL')}
                <span>Semua</span>
              </button>

              {Object.values(Category).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-neutral-900 text-white'
                      : 'bg-white border-2 border-neutral-200 text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                </button>
              ))}
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white border border-neutral-200">
                <p className="text-neutral-500 font-serif text-lg italic mb-2">
                  Tidak ada hasil yang ditemukan.
                </p>
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
