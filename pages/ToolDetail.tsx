import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOOLS_DATA } from '../data';
import { ArrowLeft, Check, ArrowUpRight, Share2, ShieldCheck, Zap } from 'lucide-react';

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tool = TOOLS_DATA.find(t => t.id === id);

  if (!tool) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Alat tidak ditemukan</h1>
            <Link to="/" className="text-primary-600 hover:underline">Kembali ke Beranda</Link>
        </div>
    );
  }

  const relatedTools = TOOLS_DATA
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
        {/* Breadcrumb & Header */}
        <div className="border-b border-neutral-200 bg-neutral-50">
            <div className="container mx-auto px-4 py-8">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Direktori
                </Link>
                
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-block px-3 py-1 bg-white border border-neutral-200 text-xs font-bold uppercase tracking-wider text-neutral-600">
                                {tool.category}
                            </span>
                             <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider border ${
                                tool.priceModel === 'Gratis' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                tool.priceModel === 'Berbayar' ? 'bg-neutral-100 text-neutral-700 border-neutral-200' :
                                'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                                {tool.priceModel}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 mb-6 leading-tight">
                            {tool.name}
                        </h1>
                        <p className="text-xl text-neutral-600 leading-relaxed mb-8 font-light">
                            {tool.shortDescription}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-all hover:-translate-y-0.5 shadow-lg shadow-neutral-900/20 flex items-center justify-center gap-2">
                                Coba Alat Sekarang
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                            <button className="px-8 py-4 bg-white border border-neutral-200 text-neutral-700 font-medium hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
                                <Share2 className="w-4 h-4" />
                                Bagikan
                            </button>
                        </div>
                    </div>
                    
                    <div className="relative aspect-video md:aspect-square bg-neutral-200 overflow-hidden shadow-2xl border border-neutral-200/50">
                        <img 
                            src={tool.imageUrl} 
                            alt={tool.name} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/10 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-8">
                    <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Tentang Generator Ini</h2>
                    <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 mb-12">
                        <p>{tool.fullDescription}</p>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary-600" />
                        Fitur & Kapabilitas
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4 mb-12">
                        {tool.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-white border border-neutral-100 shadow-sm hover:border-neutral-200 transition-colors">
                                <div className="mt-1 w-5 h-5 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3" />
                                </div>
                                <span className="text-neutral-700 font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-neutral-900 text-white p-8 md:p-12 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-serif font-bold mb-4">Mulai Gunakan {tool.name}</h3>
                            <p className="text-neutral-400 mb-8 max-w-lg">
                                Hemat waktu hingga 90% dalam pengerjaan tugas {tool.category.toLowerCase()} Anda hari ini.
                            </p>
                            <button className="px-6 py-3 bg-white text-neutral-900 font-bold hover:bg-primary-50 transition-colors">
                                Akses Generator
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                </div>

                <div className="md:col-span-4">
                    <div className="sticky top-24 space-y-8">
                        <div className="bg-white border border-neutral-200 p-6 shadow-card">
                            <h4 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                Jaminan Kualitas
                            </h4>
                            <ul className="space-y-3 text-sm text-neutral-600">
                                <li className="flex gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></span>
                                    Terverifikasi fungsional
                                </li>
                                <li className="flex gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></span>
                                    Disesuaikan pasar Indonesia
                                </li>
                                <li className="flex gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></span>
                                    Update berkala
                                </li>
                            </ul>
                        </div>

                        {relatedTools.length > 0 && (
                            <div>
                                <h4 className="font-serif font-bold text-neutral-900 mb-4">Alat Serupa</h4>
                                <div className="space-y-4">
                                    {relatedTools.map(rt => (
                                        <Link key={rt.id} to={`/tool/${rt.id}`} className="block group">
                                            <div className="bg-white border border-neutral-200 p-4 hover:border-neutral-300 transition-colors flex gap-4">
                                                <div className="w-16 h-16 bg-neutral-100 flex-shrink-0 overflow-hidden">
                                                    <img src={rt.imageUrl} alt={rt.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">{rt.name}</h5>
                                                    <p className="text-xs text-neutral-500 line-clamp-2 mt-1">{rt.shortDescription}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ToolDetail;