'use client'

import React from 'react'

const SeoContent: React.FC = () => {
  return (
    <section id="tentang" className="py-24 bg-white border-t border-neutral-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
          <div className="md:w-1/3">
             <h2 className="text-4xl font-serif font-bold text-neutral-900 leading-tight sticky top-24">
               Hidup Lebih Mudah dengan AI
             </h2>
          </div>
          <div className="md:w-2/3 prose prose-neutral prose-lg">
             <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                <em>aigpt.id</em> adalah platform kumpulan AI tools yang dirancang untuk memudahkan berbagai aspek kehidupan Anda —
                dari perencanaan wisata, produktivitas kerja, kreativitas, pembelajaran, hingga kesehatan dan keuangan.
             </p>
             <p className="text-neutral-600 text-lg leading-relaxed">
                Semua tools didukung oleh teknologi AI terkini untuk memberikan hasil yang akurat, cepat, dan personal.
                Cukup pilih tools yang Anda butuhkan, masukkan informasi, dan biarkan AI bekerja untuk Anda.
             </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
                { title: "Multi-Kategori", desc: "16+ AI tools untuk berbagai kebutuhan hidup Anda." },
                { title: "Mudah Digunakan", desc: "Interface sederhana, hasil maksimal dalam hitungan detik." },
                { title: "Gratis & Freemium", desc: "Sebagian besar tools gratis, upgrade untuk fitur premium." }
            ].map((item, idx) => (
                <div key={idx} className="border-t border-neutral-900 pt-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                    <p className="text-neutral-500 text-sm">{item.desc}</p>
                </div>
            ))}
        </div>

        {/* Detailed SEO Text Block */}
        <div className="bg-neutral-50 p-8 md:p-12 border border-neutral-200">
          <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Kumpulan AI Tools untuk Memudahkan Hidup</h3>
          <div className="columns-1 md:columns-2 gap-12 space-y-6 text-sm text-neutral-600 leading-relaxed text-justify">
            <p>
              <strong>aigpt.id</strong> adalah platform yang menyediakan berbagai AI tools untuk membantu Anda dalam berbagai aspek kehidupan.
              Dari <strong>Wisata</strong> dengan Destination Finder dan Trip Planner, hingga <strong>Produktivitas</strong> dengan Email Writer dan Meeting Summarizer.
            </p>
            <p>
              Tools <strong>Kreativitas</strong> seperti Caption Generator dan Story Writer membantu Anda menciptakan konten menarik.
              Untuk <strong>Pembelajaran</strong>, ada Explain Like I'm 5 dan Study Planner yang membuat belajar lebih efektif.
            </p>
            <p>
              Kategori <strong>Kesehatan</strong> menawarkan AI Meal Planner dan Workout Generator untuk gaya hidup sehat.
              Tools <strong>Keuangan</strong> seperti Budget Analyzer dan Investment Advisor membantu pengelolaan uang lebih baik.
            </p>
            <p>
              Misi kami: Membuat teknologi AI mudah diakses oleh semua orang di Indonesia. Setiap tools dirancang dengan antarmuka sederhana
              namun memberikan hasil yang powerful dan akurat. Mulai gunakan sekarang — gratis!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoContent