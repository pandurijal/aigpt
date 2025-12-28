import React from 'react';
import { ArrowDownRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-neutral-50 pt-16 pb-20 lg:pt-32 lg:pb-32 border-b border-neutral-200">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 border border-neutral-200 rounded-full bg-white text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-8">
            Direktori Indonesia Terkurasi
          </span>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-neutral-900 tracking-tight mb-8 leading-[1.1]">
            Alat Bantu AI & <br/>
            <span className="text-primary-700 italic">Generator Otomatis.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Kumpulan software cerdas untuk setiap divisi. Masukkan data, preferensi, atau parameter bisnis Anda, 
            dan biarkan AI mengerjakan sisanya dalam hitungan detik.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#kategori" className="group min-w-[200px] px-8 py-4 bg-neutral-900 text-white text-center font-medium transition-all hover:bg-neutral-800 hover:-translate-y-1 shadow-lg shadow-neutral-900/20">
              Cari Alat
            </a>
            <a href="#tentang" className="group flex items-center gap-2 text-neutral-600 font-medium hover:text-neutral-900 transition-colors">
              <span className="border-b border-neutral-300 group-hover:border-neutral-900 pb-0.5">Cara Kerja</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Abstract Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#44403c 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      ></div>
    </section>
  );
};

export default Hero;