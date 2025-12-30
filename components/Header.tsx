'use client'

import React from 'react'
import { Menu, Search } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  onSearch?: (query: string) => void
  showSearch?: boolean
}

const Header: React.FC<HeaderProps> = ({ onSearch, showSearch = true }) => {
  return (
    <header className="sticky top-0 z-50 bg-neutral-50/80 backdrop-blur-md border-b border-neutral-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-neutral-900 rounded-none flex items-center justify-center shadow-card transition-transform group-hover:scale-105">
            <span className="text-white font-serif font-bold text-2xl italic">a</span>
          </div>
          <span className="text-2xl font-serif font-bold text-neutral-900 tracking-tight">aigpt.id</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Beranda</Link>
          <a href="#tools" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Tools</a>
          <a href="#tentang" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Tentang</a>
        </nav>

        {/* Search & Mobile Menu */}
        <div className="flex items-center gap-4">
          {showSearch && onSearch && (
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Cari tools..."
                onChange={(e) => onSearch(e.target.value)}
                className="pl-4 pr-10 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-400 focus:ring-0 transition-all w-48 shadow-sm placeholder:text-neutral-400"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          )}
          <button className="md:hidden p-2 text-neutral-900">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
