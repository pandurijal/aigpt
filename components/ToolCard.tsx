'use client'

import React from 'react'
import { Tool } from '../lib/types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  // Map tool IDs to actual routes
  const getToolRoute = (id: string) => {
    switch (id) {
      case 'destination-finder':
        return '/destination-finder'
      case 'trip-planner':
      case 'budget-calculator':
      default:
        return '#' // Coming soon tools
    }
  }

  const route = getToolRoute(tool.id)
  const isComingSoon = route === '#'

  return (
    <Link
      href={route}
      className={`group relative bg-white border border-neutral-200 hover:border-neutral-300 transition-all duration-300 flex flex-col cursor-pointer hover:shadow-card-hover ${isComingSoon ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <div className="p-6 pb-0">
        <div className="flex justify-between items-start mb-4">
          <div className="inline-flex px-2.5 py-1 bg-neutral-100 text-neutral-600 text-[10px] font-bold uppercase tracking-wider">
            {tool.category}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 ${
             tool.priceModel === 'Gratis' ? 'text-emerald-700 bg-emerald-50' :
             tool.priceModel === 'Berbayar' ? 'text-neutral-700 bg-neutral-100' :
             'text-amber-700 bg-amber-50'
          }`}>
            {tool.priceModel}
          </span>
        </div>
        
        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors">
          {tool.name}
        </h3>
        
        <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 mb-6">
          {tool.shortDescription}
        </p>
      </div>

      <div className="mt-auto p-6 pt-0 flex items-center justify-between border-t border-transparent group-hover:border-neutral-100 transition-colors">
        <div className="flex gap-2">
            {tool.features.slice(0, 3).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-primary-400 transition-colors"></div>
            ))}
        </div>
        <span className="text-neutral-400 group-hover:text-primary-700 transition-colors">
          <ArrowUpRight className="w-5 h-5" />
        </span>
      </div>
      
      {/* Decorative bottom bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </Link>
  );
};

export default ToolCard