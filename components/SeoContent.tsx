import React from 'react';

const SeoContent: React.FC = () => {
  return (
    <section id="tentang" className="py-24 bg-white border-t border-neutral-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
          <div className="md:w-1/3">
             <h2 className="text-4xl font-serif font-bold text-neutral-900 leading-tight sticky top-24">
               Lebih Dari Sekadar Chatbot
             </h2>
          </div>
          <div className="md:w-2/3 prose prose-neutral prose-lg">
             <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                Gelombang kedua revolusi AI bukan lagi tentang "bertanya", melainkan <strong>"membangun"</strong>. 
                Platform <em>aigpt.id</em> mengkurasi alat-alat generatif yang menerima input spesifik dan menghasilkan output kerja nyata.
             </p>
             <p className="text-neutral-600 text-lg leading-relaxed">
                Bayangkan memasukkan anggaran perusahaan dan mendapatkan prediksi cashflow, atau memasukkan kriteria karyawan dan mendapatkan draft kontrak kerja siap pakai. Ini adalah efisiensi tingkat lanjut.
             </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
                { title: "Input Terstruktur", desc: "Parameter jelas: Budget, Durasi, Kriteria." },
                { title: "Output Instan", desc: "Dokumen, rencana, atau analisa dalam detik." },
                { title: "Tanpa Coding", desc: "Antarmuka visual yang mudah digunakan." }
            ].map((item, idx) => (
                <div key={idx} className="border-t border-neutral-900 pt-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                    <p className="text-neutral-500 text-sm">{item.desc}</p>
                </div>
            ))}
        </div>

        {/* Detailed SEO Text Block */}
        <div className="bg-neutral-50 p-8 md:p-12 border border-neutral-200">
          <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Automasi Cerdas untuk Bisnis Modern</h3>
          <div className="columns-1 md:columns-2 gap-12 space-y-6 text-sm text-neutral-600 leading-relaxed text-justify">
            <p>
              Di <strong>aigpt.id</strong>, kami membedah ribuan alat AI untuk menemukan mana yang benar-benar memberikan nilai tambah operasional. 
              Fokus kami adalah pada "Task-Specific AI" — alat yang dirancang untuk menyelesaikan satu tugas dengan sangat baik.
            </p>
            <p>
              Di divisi <strong>HR (Sumber Daya Manusia)</strong>, alat seperti <em>RekrutOtomatis</em> mengubah cara perusahaan menyaring talenta. 
              Alih-alih membaca ratusan CV manual, sistem mencocokkan kriteria kunci dan menghasilkan rangkuman kandidat terbaik.
            </p>
            <p>
              Untuk kebutuhan <strong>Legal</strong>, generator dokumen cerdas memastikan UMKM memiliki perlindungan hukum standar tanpa 
              biaya retainer pengacara yang mahal. Anda cukup memasukkan parameter kerjasama, dan AI menyusun klausul yang relevan.
            </p>
            <p>
              Misi kami sederhana: Mendemokratisasi akses ke teknologi perusahaan besar untuk bisnis skala menengah dan kecil di Indonesia.
              Efisiensi bukan lagi barang mewah.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoContent;