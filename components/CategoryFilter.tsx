'use client'

import React from 'react'
import { Category } from '../lib/types'
import Link from 'next/link'

interface CategoryFilterProps {
  currentCategory: string
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ currentCategory }) => {
  return (
    <div className="w-full overflow-x-auto pb-6 no-scrollbar">
      <div className="flex items-center gap-3 min-w-max">
        <Link
          href="/"
          className={`px-6 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 ${
            currentCategory === 'wisata'
              ? 'border-neutral-900 text-neutral-900 bg-transparent'
              : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/50 rounded-t-lg'
          }`}
        >
          {Category.TRAVEL}
        </Link>
      </div>
    </div>
  )
}

export default CategoryFilter