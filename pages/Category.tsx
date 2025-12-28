import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';
import ToolCard from '../components/ToolCard';
import { TOOLS_DATA } from '../data';
import { Category as CategoryEnum } from '../types';
import { ArrowLeft } from 'lucide-react';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const decodedSlug = slug ? decodeURIComponent(slug) : '';
  
  // Find category enum from slug
  const categoryEnum = Object.values(CategoryEnum).find(
    c => c.toLowerCase().replace(/\s+/g, '-') === decodedSlug
  );

  const filteredTools = TOOLS_DATA.filter(tool => 
    slug && tool.category.toLowerCase().replace(/\s+/g, '-') === decodedSlug
  );

  if (!categoryEnum) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Kategori tidak ditemukan</h1>
            <Link to="/" className="text-primary-600 hover:underline">Kembali ke Beranda</Link>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-neutral-50 border-b border-neutral-200 py-16">
        <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Beranda
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">{categoryEnum}</h1>
            <p className="text-lg text-neutral-600 max-w-2xl">
                Koleksi alat bantu cerdas terbaik untuk kebutuhan {categoryEnum} Anda. 
                Tingkatkan produktivitas dengan automasi.
            </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <CategoryFilter currentCategory={decodedSlug} />
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-neutral-50 border border-neutral-100 rounded-lg">
              <p className="text-neutral-500">Belum ada alat di kategori ini.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Category;