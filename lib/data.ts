import { Tool, Category } from './types';

export const TOOLS_DATA: Tool[] = [
  {
    id: '1',
    name: 'TripPlanner.id',
    category: Category.TRAVEL,
    shortDescription: 'Generator itinerary liburan otomatis berdasarkan budget.',
    fullDescription: 'Cukup masukkan destinasi, total anggaran, dan preferensi gaya liburan Anda (santai, petualangan, atau kuliner). TripPlanner.id akan menyusun jadwal harian lengkap, rekomendasi hotel yang sesuai budget, dan estimasi biaya transportasi dalam hitungan detik.',
    features: ['Input Budget & Preferensi', 'Jadwal Hari-per-Hari', 'Estimasi Biaya Total', 'Integrasi Tiket Wisata'],
    imageUrl: 'https://picsum.photos/seed/travel_gen/400/300',
    priceModel: 'Gratis'
  },
  {
    id: '2',
    name: 'FinForecast',
    category: Category.ACCOUNTING,
    shortDescription: 'Prediksi arus kas bisnis dari data historis.',
    fullDescription: 'Alat bantu prediksi keuangan untuk UMKM. Unggah data transaksi bulan lalu (Excel/CSV), dan AI akan menganalisa tren musiman untuk memproyeksikan arus kas 3 bulan ke depan, membantu Anda mengambil keputusan stok barang lebih akurat.',
    features: ['Upload Excel/CSV', 'Proyeksi Cashflow 90 Hari', 'Deteksi Tren Musiman', 'Analisa Margin Profit'],
    imageUrl: 'https://picsum.photos/seed/finance_ai/400/300',
    priceModel: 'Freemium'
  },
  {
    id: '3',
    name: 'RekrutOtomatis',
    category: Category.HR,
    shortDescription: 'Pembuat Job Description & screening CV instan.',
    fullDescription: 'Masukan judul posisi dan level pengalaman yang dicari, RekrutOtomatis akan menuliskan Job Description yang menarik dan profesional. Selain itu, alat ini dapat membandingkan puluhan CV pelamar dengan kriteria Anda secara otomatis.',
    features: ['Generator Job Desc', 'Ranking Kecocokan CV', 'Template Surat Offer', 'Pertanyaan Wawancara'],
    imageUrl: 'https://picsum.photos/seed/hr_tools/400/300',
    priceModel: 'Berbayar'
  },
  {
    id: '4',
    name: 'LegalDraft',
    category: Category.LEGAL,
    shortDescription: 'Generator draft kontrak kerjasama bisnis.',
    fullDescription: 'Hemat biaya konsultan hukum untuk dokumen standar. Pilih jenis perjanjian (NDA, MoU, atau Kontrak Kerja), isi parameter pihak yang terlibat, nilai kontrak, dan durasi. AI akan menyusun draft pasal-pasal perlindungan hukum yang sesuai dengan KUH Perdata Indonesia.',
    features: ['Template NDA & MoU', 'Kustomisasi Klausul', 'Format Bahasa Hukum Baku', 'Export Docx/PDF'],
    imageUrl: 'https://picsum.photos/seed/legal_ai/400/300',
    priceModel: 'Berbayar'
  },
  {
    id: '5',
    name: 'BrandVoice',
    category: Category.MARKETING,
    shortDescription: 'Generator konten sosmed sesuai persona brand.',
    fullDescription: 'Bukan sekadar caption generator biasa. BrandVoice mempelajari gaya bahasa brand Anda dari postingan sebelumnya. Input topik promo, dan dapatkan variasi konten untuk Instagram, LinkedIn, dan TikTok dengan "suara" yang konsisten.',
    features: ['Analisa Persona Brand', 'Multi-platform Content', 'Kalender Editorial', 'Saran Visual AI'],
    imageUrl: 'https://picsum.photos/seed/marketing_gen/400/300',
    priceModel: 'Freemium'
  },
  {
    id: '6',
    name: 'ResumePolis',
    category: Category.PRODUCTIVITY,
    shortDescription: 'Perubah dokumen panjang menjadi slide presentasi.',
    fullDescription: 'Punya laporan tahunan 50 halaman? Upload ke ResumePolis. Alat ini akan mengekstrak poin-poin kunci, data statistik penting, dan mengubahnya menjadi kerangka slide presentasi yang siap dipoles.',
    features: ['Doc to Slides', 'Ekstraksi Grafik Data', 'Ringkasan Eksekutif', 'Multi-format Export'],
    imageUrl: 'https://picsum.photos/seed/productivity_ai/400/300',
    priceModel: 'Freemium'
  }
];